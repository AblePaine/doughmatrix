import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { socialHead } from "@/lib/og/meta";

const TITLE =
  "Pizza Dough Hydration: 60% vs 70% vs 80% for Home Ovens and Steels";

const DESCRIPTION =
  "What 60%, 70%, and 80% hydration actually do to pizza dough — and which range works in a home oven versus on a steel or stone.";

export const Route = createFileRoute("/guides/pizza-dough-hydration")({
  component: PizzaHydrationGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/pizza-dough-hydration",
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function PizzaHydrationGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Pizza Dough Hydration: 60% vs 70% vs 80% for Home Ovens and Steels
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Hydration is the water in a dough as a percentage of the flour
          weight. A dough with 1000 g flour and 700 g water is 70% hydration.
          That single number changes how the dough mixes, how it stretches, how
          it browns, and whether it survives a 550°F home oven or only a 900°F
          deck.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            Different calculators treat starter water differently. The standard
            baker’s method below counts all water against all flour, including
            the flour and water inside a preferment. If your tool isolates the
            starter, the printed hydration will read a few points lower. Use one
            method and stay with it.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            What the percentage is doing
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Water does three jobs. It hydrates starch so the crumb sets. It lets
            gluten form and then slide. It turns into steam in the first minute
            of the bake and inflates the rim.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Below about 58%, pizza dough is bread-stick dough: tight, easy to
            roll, pale and dense in a home oven. Above about 82%, it is soup
            unless the flour is strong and the baker is fast. The useful home
            range is 60–78%.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Hydration ranges, bench feel, and best heat for pizza dough
              </caption>
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-faint uppercase">
                  <th className="py-3 pr-3 font-medium">Hydration</th>
                  <th className="py-3 pr-3 font-medium">Feel on the bench</th>
                  <th className="py-3 pr-3 font-medium">Stretch</th>
                  <th className="py-3 pr-3 font-medium">Best heat</th>
                  <th className="py-3 font-medium">Typical flour</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg tabular-nums">
                    58–62%
                  </td>
                  <td className="py-3 pr-3 text-muted">Firm, barely tacky</td>
                  <td className="py-3 pr-3 text-muted">
                    Rolls or presses; tears if forced thin
                  </td>
                  <td className="py-3 pr-3 text-muted">
                    450–500°F sheet pan or stone
                  </td>
                  <td className="py-3 text-muted">All-purpose or 11–12% protein</td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg tabular-nums">
                    65–72%
                  </td>
                  <td className="py-3 pr-3 text-muted">Soft, slightly sticky</td>
                  <td className="py-3 pr-3 text-muted">
                    Hand-stretch to 12 in without ripping
                  </td>
                  <td className="py-3 pr-3 text-muted">
                    500–550°F stone or steel
                  </td>
                  <td className="py-3 text-muted">
                    Bread flour, 12–13% protein
                  </td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg tabular-nums">
                    75–80%
                  </td>
                  <td className="py-3 pr-3 text-muted">
                    Slack, wet, needs oil on hands
                  </td>
                  <td className="py-3 pr-3 text-muted">
                    Windowpane stretch; high rim if fermented cold
                  </td>
                  <td className="py-3 pr-3 text-muted">
                    550°F+ steel, or outdoor oven
                  </td>
                  <td className="py-3 text-muted">
                    Strong bread or 00 with 12.5%+ protein
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            60%: the sheet-pan and weeknight dough
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            At 60% the dough mixes in 6–8 minutes in a stand mixer on speed 2,
            or 8–10 minutes by hand. It balls up cleanly. You can portion 250 g
            balls, bag them, and refrigerate 24–72 hours.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            This is the dough for a 12-inch pie on a dark sheet pan at 475°F for
            10–12 minutes, or on a preheated stone at 500°F for 7–9 minutes. The
            crust is thin and crisp, closer to a bar pie than a Neapolitan. It
            will not give you a leopard-spotted cornicione. It also will not
            glue itself to the peel.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Salt at 2.5–3% of flour weight. Oil at 2–3% is optional and makes
            the crumb a little tighter, which is useful at this hydration.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            70%: the home-steel default
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Seventy percent is the number most home bakers should start with if
            they own a 3/8-inch steel. Mix 8–12 minutes until the dough pulls
            from the bowl but still slumps. Bulk 4–6 hours at 74–76°F, or 2
            hours at room temp then 24–48 hours in the fridge.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            A 260–280 g ball stretches to 12 inches with a 3/4-inch rim. Launch
            onto a steel that has sat on the top rack at 550°F for 45–60
            minutes. Bake 5–7 minutes. If the bottom burns before the top sets,
            drop the steel one rack and finish 60–90 seconds under the broiler.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            At 70% you can use bread flour or a 50/50 mix of bread and 00.
            All-purpose works if you add 2–3 extra minutes of mix and accept a
            slightly smaller rise.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            80%: only if the heat and the flour agree
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Eighty percent dough is sticky on purpose. Mix until it is smooth,
            not until it clears the bowl — it will not. Use wet hands or a
            slap-and-fold every 20 minutes for the first hour, then cold
            ferment 24–72 hours.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            This dough wants 550°F on a steel at minimum, and it is happier at
            700–900°F in a dedicated oven. In a 500°F home oven it spreads,
            weeps, and gives you a cracker with a gummy center.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Flour protein needs to be 12.5% or higher. Caputo 00 Pizzeria or a
            strong bread flour. If the dough tears when you stretch it after a
            cold ferment, it was under-mixed or the gluten was never developed
            in the folds.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Do not chase 80% because a video did. Match hydration to the hottest
            surface you actually own.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            A working formula at 70%
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            For two 12-inch pies:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-fg/90">
            <li>Bread flour: 400 g</li>
            <li>Water: 280 g (70%)</li>
            <li>Fine salt: 10 g (2.5%)</li>
            <li>
              Instant yeast: 1.2 g for a same-day dough, or 0.4 g for a 24–48
              hour cold ferment
            </li>
            <li>Optional extra-virgin olive oil: 8 g (2%)</li>
          </ul>
          <p className="mt-4 leading-relaxed text-fg/90">
            If you use a ripe sourdough starter at 100% hydration, a common
            inoculation is 20% of flour weight (80 g starter on 400 g flour).
            Subtract the starter’s 40 g water and 40 g flour from the formula if
            you want the <em>total</em> dough hydration to stay at 70%. That is
            the standard method. Some tools leave starter water outside the
            headline number — check which one you are looking at.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Choosing in one sentence
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Sheet pan or 475°F oven: 60–65%. Steel or stone at 525–550°F:
            68–72%. Outdoor oven above 700°F: 70–78%, and only then if the flour
            can hold it.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Key numbers
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-fg/90">
            <li>
              Hydration = water ÷ flour × 100, counting preferment water and
              flour unless your tool says otherwise.
            </li>
            <li>
              Home-steel sweet spot: 68–72%, 550°F steel, 45–60 min preheat,
              5–7 min bake.
            </li>
            <li>60% dough: mix 6–8 min, bake 7–12 min depending on pan.</li>
            <li>
              80% dough: needs 12.5%+ protein flour and 550°F+; skip it in a
              500°F oven.
            </li>
            <li>Salt 2.5–3%; ball weight 250–280 g for a 12-inch pie.</li>
          </ul>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Count the starter water. Hit the hydration your oven can handle.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The sourdough calculator runs true hydration with the starter water
            counted, so the number on screen is the number in the bowl — pick
            the flour, set the target, and mix with confidence.
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
