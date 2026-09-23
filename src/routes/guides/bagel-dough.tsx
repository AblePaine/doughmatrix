import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { socialHead } from "@/lib/og/meta";

const TITLE = "Bagel Dough: Mixing, Shaping, and Boiling a Stiff Low-Hydration Dough";

const DESCRIPTION =
  "How to mix, shape, boil, and bake bagel dough at 55–58% hydration so the crumb stays dense and the crust shines.";

export const Route = createFileRoute("/guides/bagel-dough")({
  component: BagelDoughGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/bagel-dough",
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function BagelDoughGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Bagel Dough: Mixing, Shaping, and Boiling a Stiff Low-Hydration Dough
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Bagel dough is stiff on purpose. Typical hydration is 55–58% of flour
          weight. That is closer to pasta than to sandwich bread. The low water
          is what gives you a tight crumb, a stand-up ring, and a crust that
          can take a 30–60 second boil without collapsing.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            If the dough feels like pizza dough, it is too wet. Add flour in 5 g
            increments until it is barely tacky and you can knead it without it
            draping off the bench.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The formula that behaves
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            For eight 100 g bagels (about 800 g finished dough):
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-fg/90">
            <li>High-gluten or bread flour (13–14.5% protein): 500 g</li>
            <li>Water: 280 g (56%)</li>
            <li>Fine salt: 10 g (2%)</li>
            <li>Barley malt syrup or honey: 15 g (3%)</li>
            <li>
              Instant yeast: 4 g for a same-day batch, or 1.5 g for an overnight
              cold proof
            </li>
            <li>
              Optional diastatic malt powder: 2.5 g (0.5%) for extra browning
            </li>
          </ul>
          <p className="mt-4 leading-relaxed text-fg/90">
            Malt syrup is traditional. Honey works. Sugar at 3% also works but
            gives a slightly duller crust. Do not skip the sweetener — it feeds
            the boil reaction and browns the crust.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Standard hydration here is water ÷ flour. Malt syrup is about 20%
            water; at 15 g that is 3 g of water, which moves the true hydration
            from 56% to about 56.6%. Ignore it unless you are chasing a number
            to the tenth.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Mixing a dough that fights back
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Low hydration means the gluten takes longer to develop because there
            is less water for the proteins to move in.
          </p>
          <div className="mt-4 space-y-4 leading-relaxed text-fg/90">
            <p>
              <strong className="font-medium text-fg">Stand mixer.</strong> 3
              minutes on low to combine, then 8–10 minutes on speed 2. The dough
              should pull into a single mass and slap the bowl. If it rides the
              hook and never comes together, add 5–10 g water — the flour was
              thirstier than the bag said.
            </p>
            <p>
              <strong className="font-medium text-fg">By hand.</strong> 12–15
              minutes of kneading. Rest 5 minutes halfway if your wrists
              complain. Windowpane will be small and stubborn. That is correct.
            </p>
          </div>
          <p className="mt-4 leading-relaxed text-fg/90">
            Dough temperature after mixing should land at 75–78°F. Use water at
            65–70°F if the kitchen is 75°F. Warmer water if the room is cold.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Bulk ferment 60–90 minutes at 75°F, until the dough is about 30–40%
            larger, not doubled. Bagel dough should not be gassy going into
            shape.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Shaping without collapsing the ring
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Divide into 100–110 g pieces. Preshape into tight balls. Rest 10–15
            minutes covered so the gluten relaxes.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">Two methods:</p>
          <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed text-fg/90">
            <li>
              <strong className="font-medium text-fg">Rope:</strong> roll a 8–9
              inch snake, wrap it around your hand, overlap the ends by 1 inch,
              and roll the seam under your palm on the bench until it welds.
            </li>
            <li>
              <strong className="font-medium text-fg">Poke:</strong> poke a hole
              through the center of the ball with a floured finger and spin it
              into a 2-inch opening. The hole should look too big. It shrinks in
              the proof and the boil.
            </li>
          </ol>
          <p className="mt-4 leading-relaxed text-fg/90">
            Place shaped bagels on a parchment-lined sheet dusted with semolina
            or fine cornmeal. Cover.
          </p>
          <div className="mt-4 space-y-4 leading-relaxed text-fg/90">
            <p>
              <strong className="font-medium text-fg">Same-day.</strong> Proof
              30–45 minutes at 75°F until a finger dent springs back slowly.
            </p>
            <p>
              <strong className="font-medium text-fg">Overnight.</strong>{" "}
              Refrigerate 12–24 hours immediately after shaping. Boil from cold.
              Cold dough holds its shape better in the pot.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The boil is not optional
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Bring 4–5 quarts of water to a rolling boil. Add 30 g barley malt
            syrup or 20 g baking soda per 4 quarts. Malt gives shine and a faint
            sweetness. Baking soda gives a duller, pretzel-leaning crust. Do not
            use both at full strength.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Boil 30 seconds per side for a chewy New York-style crust, 45–60
            seconds per side for a thicker skin. Over-boiling (90+ seconds)
            makes a tough, leathery ring and can deflate a weak proof.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Scoop out with a spider. Drain 10 seconds. Seed immediately —
            everything sticks now and almost nothing sticks after the oven.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">Bake</h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Oven at 425–450°F, rack in the middle. Bake 16–20 minutes until the
            crust is deep mahogany, not blond. Rotate the pan at 10 minutes.
            Internal temperature 205–210°F.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            If the bottoms burn, stack two sheet pans or move up one rack. If
            the bagels are pale at 20 minutes, the boil was weak or the malt
            was skipped.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Troubleshooting
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-fg/90">
            <li>
              <strong className="font-medium text-fg">
                Dense as a bagel chip:
              </strong>{" "}
              over-proofed, or baked too long at too low a temp.
            </li>
            <li>
              <strong className="font-medium text-fg">
                Blows out on one side:
              </strong>{" "}
              seam not welded, or hole too small.
            </li>
            <li>
              <strong className="font-medium text-fg">
                Wrinkled after the boil:
              </strong>{" "}
              under-proofed. Give the next batch 15 more minutes.
            </li>
            <li>
              <strong className="font-medium text-fg">Flat rings:</strong>{" "}
              hydration crept to 62%+, or the boil water was not actually
              boiling.
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            A Saturday batch from fridge to bag
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Pull eight 105 g cold-proofed bagels at 8:00 a.m. Start the malt
            water at 8:05. When it boils, drop three bagels at a time, 40 seconds
            per side. Seed on a rack over a sheet pan. Oven already at 440°F
            from a 20-minute preheat. First tray in at 8:20, out at 8:38. Second
            tray follows. Cool 30 minutes before they go in a bag. Eat the first
            one at 9:15 so you know the bake is right before anyone else does.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            If the kitchen is 68°F and the overnight proof looks timid at 8:00,
            give the sheet 25 minutes at room temp before the pot. Cold dough
            that has not moved at all will wrinkle in the boil.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Key numbers
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-fg/90">
            <li>Hydration 55–58%; flour protein 13%+.</li>
            <li>Dough temp after mix: 75–78°F.</li>
            <li>Shape at 100–110 g; hole starts at ~2 inches.</li>
            <li>Boil 30–60 seconds per side in water with 30 g malt syrup per 4 qt.</li>
            <li>Bake 425–450°F for 16–20 min, internal 205–210°F.</li>
          </ul>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Land the dough temp. Bagel dough forgives nothing.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The sourdough calculator hits your target dough temperature with the
            right water temp — the same math works for any dough when the room
            will not cooperate.
          </p>
          <Link
            to="/engines/sourdough"
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 text-base font-medium text-inverse shadow-[0_0_0_1px_rgb(229_169_98_/_0.4)] hover:bg-accent-hover"
          >
            Open the dough-temp calculator
            <ArrowRight className="size-4" />
          </Link>
        </aside>
      </article>
    </GuideShell>
  );
}
