import { useState, type FormEvent } from "react";
import { Check, Loader2, Mail } from "lucide-react";
import { umbrellaActionUrl } from "@/lib/newsletter";

type Status = "idle" | "submitting" | "done" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// General signup section for "Practical Math for Makers", the umbrella
// cross-site maker newsletter. Same Kit form mechanics as NotifyForm;
// while the umbrella form ID is still empty in NEWSLETTER_FORMS the
// section shows the plain "Coming soon" line, exactly like an un-wired
// engine card.
export function NewsletterSignup() {
  const actionUrl = umbrellaActionUrl();
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

  return (
    <section className="mt-14 rounded-lg bg-card p-5 shadow-[0_0_0_1px_var(--color-border)] sm:p-6">
      <p className="text-xs font-medium tracking-wide text-accent uppercase">
        Newsletter
      </p>
      <h2 className="mt-2 font-display text-2xl tracking-tight text-fg">
        Practical Math for Makers
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Practical costing and pricing math for bakers, soapmakers, and small
        farms — no spam, unsubscribe anytime.
      </p>
      {!actionUrl ? (
        <p className="mt-5 text-sm text-faint">Coming soon</p>
      ) : status === "done" ? (
        <p className="mt-5 inline-flex items-center gap-2 text-sm text-accent">
          <Check className="size-4" />
          You&apos;re on the list — welcome aboard.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-5">
          <div className="flex max-w-xl gap-2">
            <label className="sr-only" htmlFor="newsletter-umbrella">
              Email address
            </label>
            <input
              id="newsletter-umbrella"
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
              Subscribe
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
