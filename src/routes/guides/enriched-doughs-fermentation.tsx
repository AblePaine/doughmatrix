import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { socialHead } from "@/lib/og/meta";

const TITLE = "Enriched Doughs: How Butter, Eggs, and Sugar Change Fermentation";

const DESCRIPTION =
  "What butter, eggs, and sugar do to rise time and gluten — plus exact adjustments so brioche and milk bread still ferment on schedule.";

export const Route = createFileRoute("/guides/enriched-doughs-fermentation")({
  component: EnrichedDoughsGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/enriched-doughs-fermentation",
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function EnrichedDoughsGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Enriched Doughs: How Butter, Eggs, and Sugar Change Fermentation
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          An enriched dough is a lean dough plus fat, sugar, dairy, and often
          eggs. Those ingredients taste like luxury. They also slow yeast,
          weaken gluten, and change how you read a proof. If you run a
          lean-bread schedule on a brioche, you will cut it under-proofed and
          wonder why it is tight.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            The fix is not more yeast by default. It is warmer dough, longer
            bulk, and a mix method that builds gluten before the butter goes
            in.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            What each enrichment does
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                How butter, eggs, sugar, and milk affect gluten and yeast
              </caption>
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-faint uppercase">
                  <th className="py-3 pr-3 font-medium">Ingredient</th>
                  <th className="py-3 pr-3 font-medium">Typical range</th>
                  <th className="py-3 pr-3 font-medium">Effect on gluten</th>
                  <th className="py-3 pr-3 font-medium">Effect on yeast</th>
                  <th className="py-3 font-medium">Bench note</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">Butter or oil</td>
                  <td className="py-3 pr-3 text-muted tabular-nums">
                    5–20% (sandwich) / 20–50% (brioche)
                  </td>
                  <td className="py-3 pr-3 text-muted">
                    Lubricates; high fat coats protein and delays a windowpane
                  </td>
                  <td className="py-3 pr-3 text-muted">Mild slowdown</td>
                  <td className="py-3 text-muted">
                    Add after gluten is developed
                  </td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">Whole eggs</td>
                  <td className="py-3 pr-3 text-muted tabular-nums">
                    10–30% (egg is ~75% water)
                  </td>
                  <td className="py-3 pr-3 text-muted">
                    Extra protein helps, extra water hydrates
                  </td>
                  <td className="py-3 pr-3 text-muted">
                    Slight slowdown from fat in the yolk
                  </td>
                  <td className="py-3 text-muted">
                    Count egg water in hydration
                  </td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">
                    Sugar or honey
                  </td>
                  <td className="py-3 pr-3 text-muted tabular-nums">5–15%</td>
                  <td className="py-3 pr-3 text-muted">
                    Competes for water; dough feels drier
                  </td>
                  <td className="py-3 pr-3 text-muted">
                    Slows yeast above ~8%; feeds it below ~5%
                  </td>
                  <td className="py-3 text-muted">
                    Above 15%, treat as a high-sugar dough
                  </td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">Milk</td>
                  <td className="py-3 pr-3 text-muted tabular-nums">
                    10–60% as the water
                  </td>
                  <td className="py-3 pr-3 text-muted">
                    Soft crumb, more browning
                  </td>
                  <td className="py-3 pr-3 text-muted">
                    Neutral to slight slowdown
                  </td>
                  <td className="py-3 text-muted">Milk is ~87% water</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 leading-relaxed text-fg/90">
            A “lean” dough is flour, water, salt, yeast. Sandwich bread at 4%
            butter and 5% sugar is lightly enriched. Brioche at 40% butter and
            15% sugar is heavily enriched. They are not the same schedule.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Hydration when eggs and milk are in the bowl
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Count the water in the liquids.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-fg/90">
            <li>Whole egg: 75% water. One large egg ~50 g is ~38 g water.</li>
            <li>Egg yolk: 50% water. Egg white: 90% water.</li>
            <li>Whole milk: 87% water.</li>
            <li>Butter: ~16% water; ignore it for hydration unless you are being fussy.</li>
          </ul>
          <p className="mt-4 leading-relaxed text-fg/90">
            Example: 500 g flour, 180 g milk, 100 g whole egg, 20 g extra
            water.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Water from milk = 180 × 0.87 = 157 g. Water from egg = 100 × 0.75 =
            75 g. Plus 20 g water. Total water = 252 g → 50.4% hydration on
            paper.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            That dough will feel stiffer than a 50% lean dough because the fat
            is in the way. It will still need a full mix.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Standard baker’s math counts all formula water against all formula
            flour. Preferment flour and water are included unless your
            calculator isolates them. Use one convention.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Mix order that keeps the gluten intact
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed text-fg/90">
            <li>Flour, water/milk, eggs, sugar, yeast. Mix until a shaggy dough forms.</li>
            <li>Mix 5–8 minutes until medium gluten (a short windowpane).</li>
            <li>Add salt if you held it back.</li>
            <li>Add soft butter in 3–4 additions, waiting until each is absorbed.</li>
            <li>
              Mix until the dough is smooth and slaps the bowl, 8–15 minutes
              depending on fat level.
            </li>
          </ol>
          <p className="mt-4 leading-relaxed text-fg/90">
            Dough temperature target: 78–80°F for enriched doughs, two to four
            degrees warmer than lean bread. Fat and sugar already slow the
            yeast. A 72°F enriched dough can sit for hours looking dead.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            How much to stretch the schedule
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Relative to a lean dough at the same yeast level:
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-fg/90">
            <li>
              5–8% sugar + 5–8% butter: add 20–30% more bulk time.
            </li>
            <li>
              10–15% sugar + 15–25% butter: add 40–60% more bulk time, or raise
              dough temp 3°F, or increase instant yeast from 1.2% to 1.6–1.8%
              for a same-day loaf.
            </li>
            <li>
              30–50% butter (brioche): plan a cold overnight bulk. Same-day
              brioche needs 2% instant yeast and a 78–80°F room, and it still
              takes 3–4 hours to get a 50–60% rise.
            </li>
          </ul>
          <p className="mt-4 leading-relaxed text-fg/90">
            Do not wait for a doubling on high-fat dough. Look for a 50–70%
            rise, a jiggly mass, and a fingerprint that springs back halfway.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Tangzhong and yudane
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            A tangzhong is a 1:5 flour-to-liquid paste cooked to 149°F / 65°C.
            Using 5–7% of the formula flour this way lets you run a milk bread
            at 70–75% total hydration without it turning to soup. The
            pregelatinized starch holds water through the bake.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Yudane is a 1:1 flour-to-boiling-water scald. Same idea, stiffer
            paste. Both slow the clock a little because some flour is already
            cooked; compensate with the warmer dough temp above.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            A same-day sandwich loaf that works
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-fg/90">
            <li>Bread flour: 500 g</li>
            <li>Whole milk: 250 g</li>
            <li>Water: 50 g</li>
            <li>Whole egg: 50 g</li>
            <li>Sugar: 40 g (8%)</li>
            <li>Salt: 10 g (2%)</li>
            <li>Instant yeast: 8 g (1.6%)</li>
            <li>Soft butter: 40 g (8%)</li>
          </ul>
          <p className="mt-4 leading-relaxed text-fg/90">
            Mix as above. Bulk 75–90 minutes at 78°F. Shape, pan, proof 60–90
            minutes until the dough crowns 1 inch above a 9×4 pan. Bake 350°F for
            30–35 minutes to 190–195°F internal.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Overnight fridge brioche, 35% butter
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            500 g flour, 150 g milk, 150 g egg, 50 g sugar (10%), 10 g salt, 6 g
            instant yeast, 175 g butter (35%). Mix to gluten, then butter, dough
            temp 79°F. Bulk 90 minutes at 78°F — it will not double. Degas, bag,
            fridge 12–18 hours. In the morning the dough is firm enough to
            braid. Proof in the pan 2–2.5 hours at 78°F until a finger dent
            stays. Bake 350°F to 190°F internal, 30–40 minutes depending on pan.
            If the top browns at 20 minutes, tent foil.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Key numbers
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-fg/90">
            <li>Count egg water at 75% and milk at 87% when you compute hydration.</li>
            <li>Mix gluten first; add butter in additions.</li>
            <li>Enriched dough temp: 78–80°F.</li>
            <li>Proof to 50–70% rise, not a clean double, once fat is above ~15%.</li>
            <li>
              Light enrichment: +20–30% bulk time. Heavy brioche: overnight
              cold bulk or 1.6–2% instant yeast same day.
            </li>
          </ul>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Warm the dough, stretch the bulk, land it on time.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The sourdough calculator gives you the water temperature for your
            target dough temp and a bulk window for your kitchen — the two
            levers that make enriched doughs behave.
          </p>
          <Link
            to="/engines/sourdough"
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 text-base font-medium text-inverse shadow-[0_0_0_1px_rgb(229_169_98_/_0.4)] hover:bg-accent-hover"
          >
            Open the fermentation calculator
            <ArrowRight className="size-4" />
          </Link>
        </aside>
      </article>
    </GuideShell>
  );
}
