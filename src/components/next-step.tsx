import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/**
 * One honest "next step" link after a tool's results — the workflow's
 * next engine, nothing more. Part of the engine-chain fold-in from
 * Brad's 2026-11-05 ruling.
 */
export function NextStep({
  to,
  label,
  blurb,
}: {
  to: "/engines/pricing";
  label: string;
  blurb: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between gap-4 rounded-lg bg-card p-5 shadow-[0_0_0_1px_var(--color-border)] transition-shadow hover:shadow-[0_0_0_1px_var(--color-border-strong)] sm:p-6"
    >
      <span>
        <span className="text-xs font-medium tracking-wide text-accent uppercase">
          Next step
        </span>
        <span className="mt-1 block font-display text-xl tracking-tight text-fg">
          {label}
        </span>
        <span className="mt-1 block max-w-2xl text-sm leading-relaxed text-muted">
          {blurb}
        </span>
      </span>
      <ArrowRight className="size-5 shrink-0 text-accent transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
