import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { GuidesFooter } from "@/components/guides-footer";
import { FLOURS } from "@/lib/sourdough/flours";
import type { FlourFamily } from "@/lib/sourdough/types";

const FAMILY_LABEL: Record<FlourFamily, string> = {
  white: "White",
  whole: "Whole grain",
  rye: "Rye",
  ancient: "Ancient",
  specialty: "Specialty",
};

const FAMILY_ORDER: FlourFamily[] = [
  "white",
  "whole",
  "rye",
  "ancient",
  "specialty",
];

const INDEX = FLOURS.filter((f) => f.id !== "custom");

export const Route = createFileRoute("/flours")({
  component: FlourIndex,
  head: () => ({
    meta: [
      { title: "Flour Index — DoughMatrix" },
      {
        name: "description",
        content:
          "Protein, sweet-spot hydration, and ceiling index for bread, whole wheat, rye, ancient, and specialty flours — the DoughMatrix absorption table.",
      },
    ],
    links: [{ rel: "canonical", href: "https://doughmatrix.com/flours" }],
  }),
});

function FlourIndex() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Reference
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Flour Index
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Sweet spot is where the loaf usually wants to live. Ceiling is where
          the mix stops being a loaf. Both are true-hydration numbers, starter
          included.
        </p>

        {FAMILY_ORDER.map((family) => {
          const rows = INDEX.filter((f) => f.family === family);
          if (rows.length === 0) return null;
          return (
            <section key={family} className="mt-10">
              <h2 className="font-display text-2xl tracking-tight text-fg">
                {FAMILY_LABEL[family]}
              </h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border text-xs tracking-wide text-faint uppercase">
                      <th className="py-3 pr-3 font-medium">Flour</th>
                      <th className="py-3 pr-3 text-right font-medium">
                        Protein
                      </th>
                      <th className="py-3 pr-3 text-right font-medium">
                        Sweet spot
                      </th>
                      <th className="py-3 text-right font-medium">Ceiling</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((f) => (
                      <tr
                        key={f.id}
                        className="border-b border-border/70 align-top last:border-0"
                      >
                        <td className="py-3 pr-3">
                          <div className="font-medium text-fg">{f.name}</div>
                          <div className="mt-0.5 text-xs text-faint">
                            {f.notes}
                          </div>
                        </td>
                        <td className="py-3 pr-3 text-right tabular-nums text-muted">
                          {f.protein.toFixed(1)}%
                        </td>
                        <td className="py-3 pr-3 text-right tabular-nums text-fg">
                          {f.sweetSpot}%
                        </td>
                        <td className="py-3 text-right tabular-nums text-accent">
                          {f.ceiling}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the engine
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Pick the flour. Watch the ceiling as you mix.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 text-base font-medium text-inverse shadow-[0_0_0_1px_rgb(229_169_98_/_0.4)] hover:bg-accent-hover"
          >
            Open the sourdough calculator
            <ArrowRight className="size-4" />
          </Link>
        </aside>
      </main>
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <GuidesFooter />
      </div>
    </div>
  );
}
