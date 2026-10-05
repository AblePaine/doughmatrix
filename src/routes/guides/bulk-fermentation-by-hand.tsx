import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const TITLE = "How to Tell When Bulk Fermentation Is Done: The Aliquot Jar Method";

const DESCRIPTION =
  "The clock is a window. The dough is the decision. Jiggle, dome, edge bubbles, the poke — and the aliquot jar as witness.";

export const Route = createFileRoute("/guides/bulk-fermentation-by-hand")({
  component: BulkByHandGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/bulk-fermentation-by-hand",
      image: OG_IMAGES.temp,
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function BulkByHandGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          How to Tell When Bulk Fermentation Is Done: The Aliquot Jar Method
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          The clock is a window. The dough is the decision. Temperature and
          starter amount tell you when to start paying attention. They do not
          tell you the minute bulk ends.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            A fast starter, a young one, a dough that mixed warmer than you
            measured — all of them move the end. Your hands do not lie about
            it. The timer does.
          </p>
          <p>
            This is the senses check. The temperature table already owns the
            hour. Use the hour to set an alarm. Use the dough to call it.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            What finished bulk feels like
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Tip the bowl. The mass should come away from the side in one piece
            and slump slowly, not pour. Pouring is early, or the dough was
            never developed. A brick that holds every angle is early.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Jiggle the bowl. You want a slow wobble, like set custard, not a
            splash. The whole dome moves. The surface shakes and settles.
            Batter-jiggle means the gluten never took the gas. No jiggle
            means the gas is not there yet.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            The top should be domed, not flat, not collapsed. A dome means
            the dough is still holding what it produced. A crater in the
            middle means it produced it an hour ago.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Bubbles at the edge, against the bowl, are the easy visual. Small
            ones early. Larger, irregular ones near the end. A few bubbles on
            top are normal. A surface covered in large blisters is late.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            The finger poke: flour a wet finger, press to the first knuckle.
            The dent should fill most of the way, slowly. Instant fill is
            early. A dent that stays is the end of the window, or past it.
            Shape at the slow fill. Do not wait for the dent that gives up.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The aliquot jar
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            A clear straight-sided jar. A small piece of the same dough,
            packed level, no big air pocket. Mark the start line. Anything
            from a shot glass to a small jam jar works if the sides are
            straight. A tapered bowl lies about volume.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            The jar sits next to the bowl, same room, same temperature. It is
            the dough with the guessing removed. You can see the rise. You
            cannot see it as cleanly in a wide mixing bowl.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Check the sample when you check the bowl. Rising, domed, bubbles
            on the glass: still in bulk. Level with a mark you set for this
            dough, and the bowl passing the jiggle test: shape. Fallen sample:
            you are late. The jar fell because the dough fell.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Do not refrigerate the jar and leave the bowl out, or the reverse.
            Different temperatures make the sample a different dough. Same
            bench. Same clock.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            The aliquot is a witness. It is not a second formula. If the jar
            says risen and the bowl is still a dense lump, the sample was
            loose or warm. Trust the bowl. Find out why the jar diverged.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Why the clock loses
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            The timing table assumes a dough temperature and a starter
            maturity. Both drift. Flour from the pantry cools the mix. A mixer
            warms it. A starter an hour past peak runs faster than a starter
            that just doubled. The formula cannot see any of that after you
            close the bowl.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            An alarm at the early edge of the window is the right use of the
            clock. An alarm as a hard stop is how you shape early and bake a
            tight crumb, or miss the dome and bake a flat one.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Warm kitchen, fast bulk. The signs arrive compressed. Check more
            often. Cold kitchen, slow bulk. The same signs, spread out. Still
            the same signs. Jiggle does not care what time you started.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Calling it
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Shape when three of these agree: dome, edge bubbles, slow poke,
            aliquot at the rise you marked, bowl releasing in one sluggish
            mass. One sign alone is not a verdict. A bubbly surface on a dense
            interior is a weak mix, not the end of bulk.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Past the dome, get it into a basket. More time will not add
            strength. It will spend it.
          </p>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            The clock starts the watch. The dough ends it.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Set the bulk window on the sourdough engine from your dough
            temperature and starter amount. That is the alarm. The jar and
            the poke are the call.
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
