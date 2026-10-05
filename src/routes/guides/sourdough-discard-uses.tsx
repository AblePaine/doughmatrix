import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const TITLE = "What to Do with Sourdough Discard: What It Actually Is";

const DESCRIPTION =
  "Discard is your starter, unfed — flavor and tenderness, not a workforce. Three good uses, and the one thing to stop doing.";

export const Route = createFileRoute("/guides/sourdough-discard-uses")({
  component: DiscardGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/sourdough-discard-uses",
      image: OG_IMAGES.starter,
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function DiscardGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          What to Do with Sourdough Discard: What It Actually Is
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Discard is not a separate ingredient. It is your starter, unfed.
          Same flour. Same water. Same culture. You scooped it out so the
          feed would have room, or so the jar would not climb the lid. The
          scoop did not change what it is.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            Ripe starter is that culture at peak: domed, yeasty, just starting
            to fall. Discard is the same culture later, or earlier, or colder
            — hungry, more acidic, with less active yeast than the jar you
            meant to bake with. Treat it as flavor and tenderness. Do not
            treat it as the leaven.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            What it can and cannot lift
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            A peaked starter is a workforce. Discard is the night shift going
            home. Some yeast is still alive. Not enough, and not fresh
            enough, to raise a lean loaf on a normal clock.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Swap discard 1:1 for ripe starter in a country loaf and the bulk
            stretches. Sometimes it never really starts. The crumb bakes
            dense. The score does not open. That is not a flour problem. The
            inoculum was tired.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Young discard — scooped from a starter that has risen and not yet
            collapsed — can still move a dough, slowly. Cold discard from a
            week in the fridge is mostly acid and starch. It seasons. It does
            not leaven on a schedule you can plan.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Chemical leaveners do not care. Baking soda and baking powder lift
            batters whether the starter is peaked or not. That is why discard
            belongs in pancakes and crackers, and ripe starter belongs in the
            bread.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Crackers
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            The best use. Roll discard thin, or thin it with a spoon of oil
            and a pinch of salt until it spreads on a sheet. Bake until
            brittle. No rise required. Acid is the point: it tastes like a
            long ferment without the wait.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Too wet to roll? Add flour a spoon at a time until it is a paste
            you can press. Too stiff? A few drops of water. You are making a
            sheet, not a dough with a hydration target.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Salt the top. Bake darker than you think. Pale crackers are
            chewy. Dark ones snap.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Pancakes
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Stir discard into the batter the way you would stir in yogurt.
            Acid tenderizes. It also wakes baking soda, so the cakes brown
            and lift without a peaked jar.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Keep a leavener in the batter. Discard alone makes a crepe, and a
            slow one. A spoon of starter flavor plus powder is the pancake. A
            bowl of discard and a hope is not.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Cold discard works here. You are not asking it to ferment the
            breakfast.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Pizza dough
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Discard belongs in pizza dough as a preferment flavor, not as the
            only yeast. Put it in the mix for acid and extensibility. Dose
            instant yeast from the schedule, or build a ripe levain beside it
            if you want a sourdough pie.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            An 8-hour room ferment still wants about 0.30% instant yeast. A
            24-hour cold ferment wants about 0.10%. Discard does not replace
            those rates. It changes the taste of the dough that uses them.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Count the discard&apos;s flour and water if you care about the
            hydration landing where you set it. An uncounted scoop of discard
            is a wetter dough than you think. True hydration includes that
            water. A mystery scoop will not.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The thing to stop
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Stop keeping a second jar called &ldquo;discard&rdquo; and feeding
            it like a starter. That is just another starter you are
            neglecting. One jar. Feed what you will bake with. The surplus is
            the ingredient.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            And stop sending that surplus into a bread formula as if it were
            peaked. Crackers, pancakes, pizza dough with a real leaven. Those
            three use what discard actually is. A loaf that needed a workforce
            will tell you, in a flat crumb, that you sent the night shift.
          </p>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Build the leaven the loaf actually needs.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Peaked, weighed, folded into the percentage — the sourdough engine
            sizes the build so the starter is the workforce. Discard can ride
            along for flavor.
          </p>
          <Link
            to="/engines/sourdough"
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 text-base font-medium text-inverse shadow-[0_0_0_1px_rgb(229_169_98_/_0.4)] hover:bg-accent-hover"
          >
            Open the sourdough calculator
            <ArrowRight className="size-4" />
          </Link>
        </aside>
      </article>
    </GuideShell>
  );
}
