import { useState, type FormEvent } from "react";
import { Check, Loader2, Mail } from "lucide-react";
import { track } from "@/lib/analytics";

type Status = "idle" | "submitting" | "done" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * "Email me these results" — stores a results-email request via
 * /api/results-email (first-party storage, migration 0001); the drain
 * job (send leg, live 2026-11-06) emails the results via Resend
 * within a few minutes. The copy says exactly that.
 */
export function EmailResults({
  surface,
  snapshot,
}: {
  surface: string;
  snapshot: Record<string, unknown>;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const address = email.trim();
    if (!EMAIL_RE.test(address)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/results-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: address, surface, snapshot }),
      });
      if (!res.ok) throw new Error(`results-email ${res.status}`);
      track("results_email_requested", { surface });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="rounded-lg bg-card p-5 shadow-[0_0_0_1px_var(--color-border)] sm:p-6">
      <p className="text-xs font-medium tracking-wide text-accent uppercase">
        Keep these numbers
      </p>
      <h2 className="mt-2 font-display text-2xl tracking-tight text-fg">
        Email me these results
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        We&apos;ll email this pricing to you — it goes out within a few
        minutes.
      </p>
      {status === "done" ? (
        <p className="mt-5 inline-flex items-center gap-2 text-sm text-accent">
          <Check className="size-4" />
          Request saved — this pricing is on its way to your inbox.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-5">
          <div className="flex max-w-xl gap-2">
            <label className="sr-only" htmlFor={`email-results-${surface}`}>
              Email address
            </label>
            <input
              id={`email-results-${surface}`}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="you@example.com"
              disabled={status === "submitting"}
              className="h-10 w-full min-w-0 rounded-md bg-inset px-3 text-sm text-fg shadow-[0_0_0_1px_var(--color-border)] outline-none placeholder:text-faint focus:shadow-[0_0_0_2px_var(--color-accent)] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-md bg-accent px-4 text-sm font-medium text-inverse hover:bg-accent-hover disabled:opacity-60"
            >
              {status === "submitting" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Mail className="size-4" />
              )}
              Save request
            </button>
          </div>
          {status === "error" && (
            <p className="mt-2 text-sm text-faint">
              Hmm, that didn&apos;t go through — check the address and try
              again.
            </p>
          )}
        </form>
      )}
    </section>
  );
}
