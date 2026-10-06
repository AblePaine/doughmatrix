import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const TITLE = "Pizza Dough Ball Weight Chart: How Much Dough per Pizza";

const DESCRIPTION =
  "Pizza dough ball weight chart by style and diameter. The gram weight sets crust thickness. Weigh every ball.";

export const Route = createFileRoute("/guides/pizza-dough-ball-weights")({
  component: PizzaDoughBallWeightsGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/pizza-dough-ball-weights",
      image: OG_IMAGES.engine,
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function PizzaDoughBallWeightsGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Pizza Dough Ball Weight Chart: How Much Dough per Pizza
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Ball weight is crust thickness. Diameter is only the target. Two
          12-inch pies from the same dough, one at 230 g and one at 300 g, are
          different pizzas. The light one thins out and crisps. The heavy one
          stays bready in the center.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Weigh the balls. Dividing a batch by eye is how one pie eats the
          extra dough and the others bake dry.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The 12-inch number
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            The pizza engine states the round-pie band in one line: 260&ndash;280 g
            for a 12-inch pie.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            New York defaults to 270 g. Neapolitan defaults to 260 g. Same
            diameter, slightly different rim. Neapolitan spends more of that
            weight on the cornicione. New York spends it on a foldable center.
            Hydration is doing the rest of the work: New York at 68%,
            Neapolitan at 70%, no oil in the Neapolitan dough.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Drop under the band and the center tears on the stretch. Go over
            it and the rim never cooks before the bottom chars.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Weight by diameter
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Area scales with the square of the diameter. A 16-inch pie is not
            a 12-inch pie plus a little. It is nearly double the area. Ball
            weight has to follow, or the crust thins out as the pie gets
            wider.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Read the 12-inch row off the engine. The other rows are the same
            thickness, scaled by area.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Ball weight scaled by area from the 12-inch band
              </caption>
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-faint uppercase">
                  <th className="py-3 pr-3 font-medium">Diameter</th>
                  <th className="py-3 pr-3 font-medium">Ball weight</th>
                  <th className="py-3 font-medium">What it is</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/70">
                  <td className="py-3 pr-3 font-medium text-fg tabular-nums">10 in</td>
                  <td className="py-3 pr-3 tabular-nums text-fg">180&ndash;195 g</td>
                  <td className="py-3 text-muted">Thin round, home steel</td>
                </tr>
                <tr className="border-b border-border/70">
                  <td className="py-3 pr-3 font-medium text-fg tabular-nums">12 in</td>
                  <td className="py-3 pr-3 tabular-nums text-fg">260&ndash;280 g</td>
                  <td className="py-3 text-muted">Engine band for a round pie</td>
                </tr>
                <tr className="border-b border-border/70">
                  <td className="py-3 pr-3 font-medium text-fg tabular-nums">14 in</td>
                  <td className="py-3 pr-3 tabular-nums text-fg">350&ndash;380 g</td>
                  <td className="py-3 text-muted">Scaled from the 12-inch band</td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg tabular-nums">16 in</td>
                  <td className="py-3 pr-3 tabular-nums text-fg">460&ndash;500 g</td>
                  <td className="py-3 text-muted">Scaled from the 12-inch band</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 leading-relaxed text-fg/90">
            Thickness is a choice. Want a puffier rim at the same diameter?
            Move up inside the band, or just past it. Want cracker-thin? Move
            down, and do not expect the rim to stand.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Pans are not balls
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Detroit and sheet-pan doughs are sized by the pan, not by a ball
            chart.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Detroit / Pan on the engine: a 10&times;14 inch pan, 140 square
            inches, 516 g of dough. Hydration is 72%. Oil in the dough is
            2.5%. The pan is oiled on top of that.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Sheet pan / bar pie: an 18&times;13 inch pan, 234 square inches,
            597 g of dough. Hydration is 60%. That is the low-water workhorse.
            It presses. It does not get a ball weight.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Change the pan and change the dough weight with the area. A
            half-size Detroit pan is not &ldquo;one ball.&rdquo; It is half the
            square inches.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Scaling a batch without breaking the ratios
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Pick the ball weight first. Multiply by the number of pies. That
            is the dough weight. Everything else is a percentage of flour,
            not a spoon.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Hydration stays. Salt stays. Oil stays. Yeast stays at the
            percentage the schedule asks for. An 8-hour room-temp dough is
            0.30% instant yeast. A 24-hour cold ferment is 0.10%. Doubling
            the batch doubles the grams. It does not double the percentage.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            The failure mode is scaling the flour and then eyeballing the
            water. A 68% dough that picks up an extra splash is no longer the
            dough you fermented last week. Weigh the water.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Cold ferment happens after the balls are weighed and tightened.
            Seam down. Covered. A batch left as one mass and cut at bake time
            has already fermented as one mass. The cuts are uneven. The proof
            is uneven. Ball first.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Why the scale beats the bench knife
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            A 1,080 g batch divided in four by eye can land at 250, 265, 275,
            and 290 g. All four get called &ldquo;a 12-inch.&rdquo; Three of
            them are a different pizza.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            The heavy ball resists the stretch and bakes thick. The light ball
            stretches too far and has no rim. You will blame the oven. It was
            the portion.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Weigh each ball into a window of about 5 g. Tighten the ball. Do
            not flour it into a new weight. Bench flour stuck to the outside
            is not dough, and it burns.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Same dough, same weight, same diameter. Then change one thing if
            you want a different pie.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Key numbers
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-fg/90">
            <li>12-inch round: 260&ndash;280 g. Engine band.</li>
            <li>New York default ball: 270 g. Hydration 68%.</li>
            <li>Neapolitan default ball: 260 g. Hydration 70%.</li>
            <li>Detroit 10&times;14 pan: 516 g. Hydration 72%.</li>
            <li>Sheet 18&times;13 pan: 597 g. Hydration 60%.</li>
            <li>Instant yeast: 0.30% for 8 hours at room temp.</li>
            <li>Instant yeast: 0.10% for a 24-hour cold ferment.</li>
            <li>Portion tolerance: about 5 g ball to ball.</li>
          </ul>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Set style, ball weight, and hours. Read the formula back.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The pizza engine doses yeast from your schedule and scales the
            whole formula from ball weight and ball count. Pick the weight
            from the chart, set the hours, and read back grams — not guesses.
          </p>
          <Link
            to="/engines/pizza"
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 text-base font-medium text-inverse shadow-[0_0_0_1px_rgb(229_169_98_/_0.4)] hover:bg-accent-hover"
          >
            Open the pizza dough calculator
            <ArrowRight className="size-4" />
          </Link>
        </aside>
      </article>
    </GuideShell>
  );
}
