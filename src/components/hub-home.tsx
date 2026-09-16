import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { GuidesFooter } from "@/components/guides-footer";
import { LIVE_ENGINE, UPCOMING_ENGINES } from "@/lib/engines";
import { PUBLISHED_GUIDES } from "@/lib/guides";

export function HubHome() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 pb-10">
        <section className="pt-6 pb-10 sm:pt-10 sm:pb-14">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Smarter Baking Tools
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight tracking-tight text-fg sm:text-5xl">
            Baking science, minus the guesswork.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Dial in your water absorption, hit your proofing windows, and stop
            ending up with flat, sticky dough. Real flour data and fermentation
            math—built for home and micro-bakers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/engines/sourdough"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 text-base font-medium text-inverse shadow-[0_0_0_1px_rgb(229_169_98_/_0.4)] hover:bg-accent-hover"
            >
              Open Sourdough Calculator
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/flours"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-card px-5 text-base font-medium text-fg shadow-[0_0_0_1px_var(--color-border)] hover:shadow-[0_0_0_1px_var(--color-border-strong)]"
            >
              Browse Flour Index
            </Link>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Engine matrix
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            One live bench engine now. Three more verticals on the same math.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            <li>
              <Link
                to={LIVE_ENGINE.to}
                className="flex h-full flex-col rounded-lg bg-card p-5 shadow-[0_0_0_1px_var(--color-border)] hover:shadow-[0_0_0_1px_var(--color-border-strong)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl tracking-tight text-fg">
                    {LIVE_ENGINE.name}
                  </h3>
                  <span className="shrink-0 rounded-sm bg-accent-dim px-2 py-1 text-[11px] tracking-wide text-accent uppercase">
                    {LIVE_ENGINE.badge}
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {LIVE_ENGINE.blurb}
                </p>
                <p className="mt-5 inline-flex items-center gap-1 text-sm text-accent">
                  Open Calculator
                  <ArrowRight className="size-4" />
                </p>
              </Link>
            </li>
            {UPCOMING_ENGINES.map((engine) => (
              <li key={engine.id}>
                <div className="flex h-full flex-col rounded-lg bg-card/70 p-5 shadow-[0_0_0_1px_var(--color-border)]">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl tracking-tight text-fg">
                      {engine.name}
                    </h3>
                    <span className="shrink-0 rounded-sm bg-inset px-2 py-1 text-[11px] tracking-wide text-faint uppercase shadow-[0_0_0_1px_var(--color-border)]">
                      {engine.badge}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {engine.blurb}
                  </p>
                  <p className="mt-5 text-sm text-faint">Coming soon</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Flour Index
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg sm:text-3xl">
            Know what your flour can actually handle.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Every flour has a limit before turning into soup. Check verified
            protein, ash, and absorption ceilings for 16 popular artisan flours.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Protein %", "Ash %", "Hydration ceiling"].map((label) => (
              <span
                key={label}
                className="rounded-sm bg-card px-3 py-1.5 text-xs tracking-wide text-fg uppercase shadow-[0_0_0_1px_var(--color-border)]"
              >
                {label}
              </span>
            ))}
          </div>
          <Link
            to="/flours"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 text-base font-medium text-inverse shadow-[0_0_0_1px_rgb(229_169_98_/_0.4)] hover:bg-accent-hover"
          >
            Search Flour Directory
            <ArrowRight className="size-4" />
          </Link>
        </aside>

        <section className="mt-14">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Field Guides & Kitchen Troubleshooting
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Clear explanations for sticky dough, gummy crumb, and tricky
            fermentation timing.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {PUBLISHED_GUIDES.map((g) => (
              <li key={g.to}>
                <Link
                  to={g.to}
                  className="flex h-full flex-col rounded-lg bg-card p-5 shadow-[0_0_0_1px_var(--color-border)] hover:shadow-[0_0_0_1px_var(--color-border-strong)]"
                >
                  <p className="text-xs font-medium tracking-wide text-accent uppercase">
                    {g.kicker}
                  </p>
                  <p className="mt-2 font-display text-xl tracking-tight text-fg">
                    {g.title}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {g.blurb}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1 text-sm text-accent">
                    Read
                    <ArrowRight className="size-4" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <GuidesFooter />
      </div>
    </div>
  );
}

