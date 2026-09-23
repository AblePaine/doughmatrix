import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuidesFooter } from "@/components/guides-footer";
import { HydrationGauge } from "@/components/hydration-gauge";
import { SiteHeader } from "@/components/site-header";
import {
  CATEGORY_LABEL,
  resolveArtisanFlour,
} from "@/lib/flour-catalog";
import { cn } from "@/lib/utils";
import { socialHead } from "@/lib/og/meta";

export const Route = createFileRoute("/flours_/$slug")({
  loader: ({ params }) => {
    const flour = resolveArtisanFlour(params.slug);
    if (!flour) throw notFound();
    if (flour.id !== params.slug) {
      throw redirect({
        to: "/flours/$slug",
        params: { slug: flour.id },
        statusCode: 301,
        replace: true,
      });
    }
    return flour;
  },
  head: ({ loaderData }) => {
    const flour = loaderData;
    if (!flour) return {};
    return socialHead({
      title: `${flour.name} Hydration Ceiling & Flour Specs | DoughMatrix`,
      description: `Protein, ash, and how much water ${flour.brand} ${flour.name} can actually take. Look up the numbers, then load the bag straight into the sourdough calculator.`,
      path: `/flours/${flour.id}`,
      cardTitle: `${flour.brand} ${flour.name}`,
      category: "FLOUR SPECIFICATION",
      detail: `Protein: ${flour.protein}% | Max Ceiling: ${flour.maxHydration}%`,
    });
  },
  component: FlourProfile,
  notFoundComponent: FlourNotFound,
});

function FlourProfile() {
  const flour = Route.useLoaderData();

  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <nav aria-label="Breadcrumb" className="text-sm text-faint">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link to="/flours" className="text-muted hover:text-accent">
                Flour Index
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="text-muted">{flour.brand}</li>
            <li aria-hidden="true">›</li>
            <li className="text-fg">{flour.name}</li>
          </ol>
        </nav>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="rounded-sm bg-accent-dim px-2 py-1 text-[11px] tracking-wide text-accent uppercase">
            {CATEGORY_LABEL[flour.category]}
          </span>
          <span
            className={cn(
              "rounded-sm px-2 py-1 text-[11px] tracking-wide uppercase",
              flour.malted
                ? "bg-accent-dim text-accent"
                : "bg-inset text-faint shadow-[0_0_0_1px_var(--color-border)]",
            )}
          >
            {flour.malted ? "Malted" : "Unmalted"}
          </span>
        </div>

        <p className="mt-4 text-xs font-medium tracking-wide text-accent uppercase">
          {flour.brand}
        </p>
        <h1 className="mt-2 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          {flour.name}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {flour.description}
        </p>

        <Link
          to="/engines/sourdough"
          search={{ flour: flour.id }}
          className="mt-6 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 text-base font-medium text-inverse shadow-[0_0_0_1px_rgb(229_169_98_/_0.4)] hover:bg-accent-hover"
        >
          Load into Sourdough Calculator
          <ArrowRight className="size-4" />
        </Link>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The numbers
          </h2>
          <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Metric label="Protein" value={`${flour.protein.toFixed(1)}%`} />
            <Metric label="Ash" value={`${flour.ash.toFixed(2)}%`} />
            <Metric
              label="Safe hydration"
              value={`${flour.safeHydration}%`}
              tone="safe"
            />
            <Metric
              label="Max ceiling"
              value={`${flour.maxHydration}%`}
              tone="caution"
            />
          </dl>
          <div className="mt-6 rounded-lg bg-card p-5 shadow-[0_0_0_1px_var(--color-border)]">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              How much water it takes
            </p>
            <HydrationGauge
              safe={flour.safeHydration}
              max={flour.maxHydration}
              size="lg"
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            About this flour
          </h2>
          <dl className="mt-5 grid gap-3 sm:grid-cols-3">
            <Fact label="Wheat type" value={flour.wheatType} />
            <Fact label="Extraction" value={flour.extraction} />
            <Fact label="Enzymatic profile" value={flour.enzymaticActivity} />
          </dl>
          <h3 className="mt-8 font-display text-xl tracking-tight text-fg">
            How it handles
          </h3>
          <p className="mt-3 leading-relaxed text-fg/90">{flour.handlingNotes}</p>
          <h3 className="mt-8 font-display text-xl tracking-tight text-fg">
            Good for
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {flour.bestStyles.map((style) => (
              <li
                key={style}
                className="rounded-sm bg-card px-3 py-1.5 text-sm text-fg shadow-[0_0_0_1px_var(--color-border)]"
              >
                {style}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Related guides
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            <GuideCard
              to="/guides/flour-hydration-ceiling"
              kicker="Hydration"
              title="The Flour Hydration Ceiling"
            />
            <GuideCard
              to="/guides/sourdough-crumb-troubleshooting"
              kicker="Diagnosis"
              title="Reading Your Sourdough Crumb"
            />
          </ul>
          <Link
            to="/flours"
            className="mt-6 inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover"
          >
            Back to the Flour Index
            <ArrowRight className="size-4" />
          </Link>
        </section>
      </article>
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <GuidesFooter />
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "safe" | "caution";
}) {
  return (
    <div className="rounded-md bg-card px-3 py-3 shadow-[0_0_0_1px_var(--color-border)]">
      <dt className="text-[11px] tracking-wide text-faint uppercase">{label}</dt>
      <dd
        className={cn(
          "mt-1 font-display text-2xl tabular-nums",
          tone === "safe" && "text-safe",
          tone === "caution" && "text-caution",
          !tone && "text-fg",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-card px-3 py-3 shadow-[0_0_0_1px_var(--color-border)]">
      <dt className="text-[11px] tracking-wide text-faint uppercase">{label}</dt>
      <dd className="mt-1 text-sm leading-snug text-fg">{value}</dd>
    </div>
  );
}

function GuideCard({
  to,
  kicker,
  title,
}: {
  to: "/guides/flour-hydration-ceiling" | "/guides/sourdough-crumb-troubleshooting";
  kicker: string;
  title: string;
}) {
  return (
    <li>
      <Link
        to={to}
        className="block rounded-lg bg-card p-4 shadow-[0_0_0_1px_var(--color-border)] hover:shadow-[0_0_0_1px_var(--color-border-strong)]"
      >
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          {kicker}
        </p>
        <p className="mt-1 font-display text-lg tracking-tight text-fg">{title}</p>
      </Link>
    </li>
  );
}

function FlourNotFound() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-3xl tracking-tight text-fg">
          Flour not in the index
        </h1>
        <p className="mt-3 text-muted">
          That bag isn't in the index. Head back to the Flour Index and pick
          one of the 16.
        </p>
        <Link
          to="/flours"
          className="mt-6 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 text-base font-medium text-inverse"
        >
          Back to the Flour Index
          <ArrowRight className="size-4" />
        </Link>
      </main>
    </div>
  );
}

