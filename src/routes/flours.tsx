import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { GuidesFooter } from "@/components/guides-footer";
import { HydrationGauge } from "@/components/hydration-gauge";
import {
  ARTISAN_FLOURS,
  FLOUR_CATEGORIES,
  filterArtisanFlours,
  type ArtisanFlour,
  type FlourCategory,
} from "@/lib/flour-catalog";
import { cn } from "@/lib/utils";
import { socialHead } from "@/lib/og/meta";

export const Route = createFileRoute("/flours")({
  component: FlourIndex,
  head: () =>
    socialHead({
      title: "Artisan Flour Absorption Index & Specs — DoughMatrix",
      description:
        "Protein, ash, malt, and true-hydration ceilings for 16 baseline artisan flours — King Arthur, Central Milling, Bob’s Red Mill, Caputo, General Mills, and Giusto’s. Load any bag into the sourdough engine.",
      path: "/flours",
      cardTitle: "Artisan Flour Absorption Index",
      category: "FLOUR INDEX",
      detail: "16+ Verified Commercial & Artisan Flours",
    }),
});

function FlourIndex() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FlourCategory | "all">("all");
  const rows = useMemo(
    () => filterArtisanFlours(query, category),
    [query, category],
  );

  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Reference
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Artisan Flour Absorption Index & Specs
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
          Sixteen mill bags. Protein and ash from typical sheets; safe and max
          hydration are DoughMatrix true-hydration — starter included. Open a
          spec sheet or load the bag into the engine.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search by brand or flour name</span>
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search brand or flour…"
              className="h-11 w-full rounded-md bg-card pr-3 pl-10 text-sm text-fg shadow-[0_0_0_1px_var(--color-border)] outline-none placeholder:text-faint focus:shadow-[0_0_0_2px_var(--color-accent)]"
            />
          </label>
          <div
            role="tablist"
            aria-label="Flour category"
            className="flex flex-wrap gap-1"
          >
            {FLOUR_CATEGORIES.map((c) => {
              const active = category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(c.id)}
                  className={cn(
                    "h-9 rounded-sm px-3 text-sm",
                    active
                      ? "bg-accent-dim text-accent shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)]"
                      : "text-muted hover:bg-card hover:text-fg",
                  )}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-4 text-xs text-faint">
          {rows.length} of {ARTISAN_FLOURS.length} flours
        </p>

        {rows.length === 0 ? (
          <p className="mt-10 text-muted">
            No bags match. Clear the search or pick All.
          </p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {rows.map((f) => (
              <li key={f.id}>
                <FlourCard flour={f} />
              </li>
            ))}
          </ul>
        )}
      </main>
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <GuidesFooter />
      </div>
    </div>
  );
}

function FlourCard({ flour: f }: { flour: ArtisanFlour }) {
  return (
    <article className="flex h-full flex-col rounded-lg bg-card p-5 shadow-[0_0_0_1px_var(--color-border)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            {f.brand}
          </p>
          <h2 className="mt-1 font-display text-xl leading-tight tracking-tight text-fg">
            <Link
              to="/flours/$slug"
              params={{ slug: f.id }}
              className="hover:text-accent"
            >
              {f.name}
            </Link>
          </h2>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-sm px-2 py-1 text-[11px] tracking-wide uppercase",
            f.malted
              ? "bg-accent-dim text-accent"
              : "bg-inset text-faint shadow-[0_0_0_1px_var(--color-border)]",
          )}
        >
          {f.malted ? "Malted" : "Unmalted"}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Spec label="Protein" value={`${f.protein.toFixed(1)}%`} />
        <Spec label="Ash" value={`${f.ash.toFixed(2)}%`} />
      </dl>

      <HydrationGauge safe={f.safeHydration} max={f.maxHydration} />

      <p className="mt-4 text-sm leading-relaxed text-muted">{f.description}</p>
      <p className="mt-2 text-xs text-faint">Use: {f.recommendedUse}</p>

      <div className="mt-5 grid gap-2">
        <Link
          to="/engines/sourdough"
          search={{ flour: f.id }}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-medium text-inverse shadow-[0_0_0_1px_rgb(229_169_98_/_0.4)] hover:bg-accent-hover"
        >
          Load into Sourdough Engine
          <ArrowRight className="size-4" />
        </Link>
        <Link
          to="/flours/$slug"
          params={{ slug: f.id }}
          className="inline-flex h-11 items-center justify-center rounded-md bg-inset px-4 text-sm font-medium text-fg shadow-[0_0_0_1px_var(--color-border)] hover:shadow-[0_0_0_1px_var(--color-border-strong)]"
        >
          View Full Specs
        </Link>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-inset px-3 py-2.5 shadow-[0_0_0_1px_var(--color-border)]">
      <dt className="text-[11px] tracking-wide text-faint uppercase">{label}</dt>
      <dd className="mt-0.5 font-display text-xl tabular-nums text-fg">{value}</dd>
    </div>
  );
}
