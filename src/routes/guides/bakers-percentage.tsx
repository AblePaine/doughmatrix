import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const TITLE = "Baker's Percentage Chart: How to Calculate Baker's Percentage";

const DESCRIPTION =
  "Flour is 100%. Everything else hangs off it. True hydration vs. bowl hydration, worked by hand — a 75% loaf and a pizza dough.";

export const Route = createFileRoute("/guides/bakers-percentage")({
  component: BakersPercentageGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/bakers-percentage",
      image: OG_IMAGES.hydration,
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function BakersPercentageGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Baker&apos;s Percentage Chart: How to Calculate Baker&apos;s
          Percentage
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Flour is 100%. Everything else is a percentage of that flour. Salt,
          water, starter, oil — all of them. Grams follow from the
          percentages. Cups never enter the conversation.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            A recipe in cups breaks when you change the flour or the batch. A
            formula in baker&apos;s percentages scales clean. Double the
            flour, double everything that hangs off it. The ratios stay put.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The only rule
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Pick the flour weight. Call it 100%. Divide every other ingredient
            by that flour weight. Multiply by 100.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Water at 375 g on flour at 500 g is 75% hydration. Salt at 11 g on
            the same flour is 2.2%. Starter at 100 g is 20%. The chart is just
            that division, repeated.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Baker&apos;s percentage example on 500 g flour
              </caption>
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-faint uppercase">
                  <th className="py-3 pr-3 font-medium">Ingredient</th>
                  <th className="py-3 pr-3 text-right font-medium tabular-nums">
                    Weight
                  </th>
                  <th className="py-3 text-right font-medium tabular-nums">
                    Baker&apos;s %
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/70">
                  <td className="py-3 pr-3 font-medium text-fg">Flour</td>
                  <td className="py-3 pr-3 text-right tabular-nums text-muted">
                    500 g
                  </td>
                  <td className="py-3 text-right tabular-nums text-fg">
                    100%
                  </td>
                </tr>
                <tr className="border-b border-border/70">
                  <td className="py-3 pr-3 font-medium text-fg">Water</td>
                  <td className="py-3 pr-3 text-right tabular-nums text-muted">
                    375 g
                  </td>
                  <td className="py-3 text-right tabular-nums text-fg">75%</td>
                </tr>
                <tr className="border-b border-border/70">
                  <td className="py-3 pr-3 font-medium text-fg">Salt</td>
                  <td className="py-3 pr-3 text-right tabular-nums text-muted">
                    11 g
                  </td>
                  <td className="py-3 text-right tabular-nums text-fg">
                    2.2%
                  </td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">Starter</td>
                  <td className="py-3 pr-3 text-right tabular-nums text-muted">
                    100 g
                  </td>
                  <td className="py-3 text-right tabular-nums text-fg">20%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 leading-relaxed text-fg/90">
            That table is bowl flour only. It is not done. The starter is
            flour and water too.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            True hydration is the number that ferments
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            A 100% hydration starter is half flour, half water. A 100 g
            starter carries 50 g flour and 50 g water.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Add those to the bowl. Total flour is 550 g. Total water is 425 g.
            True hydration is 425 ÷ 550, which is 77.3%. The bowl said 75%.
            The dough is wetter than the bowl said.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            The sourdough engine folds starter flour and starter water into
            the percentage. That is true hydration. Bowl water over bowl
            flour is the other number. Use one and name it. Mixing them is how
            a &ldquo;75% loaf&rdquo; bakes like an 80% loaf.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            A 75% loaf, worked so the percentage is true
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Target: 75% true hydration. Bowl flour: 500 g. Starter: 100 g at
            100% hydration. Salt: 2% of total flour.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Starter contributes 50 g flour and 50 g water. Total flour is 550
            g. Water at 75% of 550 g is 412.5 g. The starter already supplied
            50 g of that. Bowl water is 362.5 g.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Salt at 2% of 550 g is 11 g. Starter is 100 ÷ 500, or 20% of bowl
            flour. Inoculation on this site is starter weight over bowl
            flour. Same 20%.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Bowl water over bowl flour is 362.5 ÷ 500, or 72.5%. That is
            baker&apos;s hydration. True hydration is still 75%. Both numbers
            are right. They are not the same number.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Scale it. Want 1,000 g bowl flour? Double every weight.
            Percentages do not move.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            A pizza dough, same arithmetic
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Flour is still 100%. A home-steel dough at 70% hydration, on 400 g
            flour:
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Water is 70% of 400 g, which is 280 g. Salt at 2.5% is 10 g. Oil
            at 2% is 8 g. Instant yeast at 0.30% is 1.2 g for an 8-hour room
            ferment. The same flour at 0.10% yeast is 0.4 g for a 24-hour
            cold ferment. The pizza engine doses yeast from the schedule.
            Those two rates are the anchors.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            No starter in that mix, so bowl hydration and true hydration
            match. Add a 100% hydration levain and you are back to the loaf
            problem. Subtract the starter&apos;s flour and water from the
            bowl, or the headline 70% is a lie.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            A 60% sheet-pan dough on the same 400 g flour is 240 g water. An
            80% dough is 320 g water. Same flour. Same salt percentage.
            Different water. That is the whole chart.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            What to stop doing
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Stop converting a cup recipe one ingredient at a time and hoping.
            Weigh the flour. Set the percentages. Let the grams fall out.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Stop calling bowl hydration the dough&apos;s hydration once a
            starter is in the bowl. The water in the jar counts. So does the
            flour.
          </p>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Set flour, starter, and the percentage. Read the water.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The sourdough engine already does the true-hydration fold. Set
            flour, starter, and the percentage you want. Read the water it
            asks for. Then scale the batch by changing the flour, not by
            rewriting the formula.
          </p>
          <Link
            to="/engines/sourdough"
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 text-base font-medium text-inverse shadow-[0_0_0_1px_rgb(229_169_98_/_0.4)] hover:bg-accent-hover"
          >
            Open the hydration calculator
            <ArrowRight className="size-4" />
          </Link>
        </aside>
      </article>
    </GuideShell>
  );
}
