import { useState, type FormEvent } from "react";
import { BellRing, Check, Loader2 } from "lucide-react";
import { newsletterActionUrl } from "@/lib/newsletter";

type Status = "idle" | "submitting" | "done" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NotifyForm({ engineId }: { engineId: string }) {
  const actionUrl = newsletterActionUrl(engineId);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  // No form ID configured yet -> keep the plain "Coming soon" line.
  if (!actionUrl) {
    return <p className="mt-5 text-sm text-faint">Coming soon</p>;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const address = email.trim();
    if (!EMAIL_RE.test(address)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      // Kit's public form endpoint; no-cors because it doesn't send CORS
      // headers for cross-origin POSTs. The signup goes through; we just
      // can't read the response body.
      await fetch(actionUrl as string, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email_address: address }).toString(),
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="mt-5 inline-flex items-center gap-2 text-sm text-accent">
        <Check className="size-4" />
        You&apos;re on the list — we&apos;ll email you the day it launches.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-5">
      <p className="text-sm text-muted">
        Want a heads-up when this launches?
      </p>
      <div className="mt-2 flex gap-2">
        <label className="sr-only" htmlFor={`notify-${engineId}`}>
          Email address
        </label>
        <input
          id={`notify-${engineId}`}
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
            <BellRing className="size-4" />
          )}
          Notify me
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-faint">
          Hmm, that didn&apos;t go through — check the address and try again.
        </p>
      )}
    </form>
  );
}
