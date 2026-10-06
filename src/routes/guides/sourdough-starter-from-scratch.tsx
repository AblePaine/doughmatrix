import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const TITLE = "How to Make a Sourdough Starter from Scratch, Day by Day";

const DESCRIPTION =
  "How to make a sourdough starter from scratch, day by day — including the day-3 false rise and the stall.";

export const Route = createFileRoute("/guides/sourdough-starter-from-scratch")({
  component: SourdoughStarterFromScratchGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/sourdough-starter-from-scratch",
      image: OG_IMAGES.starter,
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function SourdoughStarterFromScratchGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          How to Make a Sourdough Starter from Scratch, Day by Day
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          A starter is flour, water, and time. No commercial yeast. No
          pineapple juice required. The microbes are already on the flour.
          Your job is to feed the ones that can leaven bread and wait out the
          ones that cannot.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          The first bubbles are not readiness. Readiness is a jar that rises
          on a schedule you can repeat.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Day 1: mix
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Equal weights of flour and water. Whole-grain rye or whole wheat
            wakes faster than white. Bread flour still works. Stir to a thick
            paste. Scrape the sides. Cover loosely. A sealed jar under
            pressure is how you make a mess, not a culture.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Leave it at room temperature. A cold kitchen is a slower kitchen.
            You are not on a clock yet.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Mark the level. You will want that mark tomorrow, and you will
            want it again on the day nothing happens.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Day 2: usually quiet
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            A few bubbles. A smell like wet flour. Or nothing. Nothing on day
            2 is normal. Do not dump it. Do not add yeast. Stir, discard about
            half if it has separated, and feed equal flour and water again.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            You are diluting what is there and giving it fresh food. That is
            the whole method.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Day 3: the false rise
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            This is the day nobody warns about. The jar can double, or more,
            and then collapse. It smells off. Nail polish, old fruit,
            something sharp. That rise is usually bacteria, not the yeast
            that will leaven a loaf. It is a false start.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Bakers throw the jar out here. Don&apos;t. The rise falls. The
            smell fades if you keep feeding. Dumping a day-3 explosion and
            starting over is how a two-week project becomes a month.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Discard down to a small amount. Feed again. The false rise does
            not mean it is ready to bake.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Day 4 and day 5: the stall
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            After the false rise, the jar often goes quiet. Fewer bubbles.
            Little or no growth. This is the stall. It looks like failure. It
            is the handoff. The early bacteria have been diluted. The yeast
            and the lactic acid bacteria have not taken over yet.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Keep the same move. Discard. Feed. Cover. Room temperature. A
            stalled jar on day 5 is still in the arc. A stalled jar you
            &ldquo;help&rdquo; with commercial yeast is no longer a sourdough
            starter.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            If the top dries out, the cover is too loose or the room is very
            dry. Scrape the dry cap off. Feed the paste underneath. Mold is
            the exception: fuzzy spots in color, and the jar goes out. Bubbles
            and a gray liquid are not mold. Gray liquid is hooch. Stir it in
            or pour it off, then feed.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Day 6 to day 14: it starts to repeat
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Growth comes back. Slower than the day-3 spike, and cleaner. The
            smell moves from sharp to yogurt, flour, a little alcohol. The
            rise starts to happen on a rhythm you can see against the mark.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Feed on that rhythm. Once it is rising reliably, move to the house
            ratio. A 1:5:5 feeding is 1 part starter, 5 parts flour, 5 parts
            water. That is the build the rest of the method assumes. A 1:10:10
            at 18&deg;C is a 32-hour culture, not a levain you mix the same
            evening. Do not use a huge ratio as the test for a young jar. The
            young jar cannot eat that much food on time.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Peak looks the same as it will for the life of the jar. Doubled
            or a little more. Domed on top. Webbed inside. Just before it
            falls.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            When it can actually leaven bread
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Ready is not the first day it bubbles. Ready is two or three feeds
            in a row where a 1:5:5 doubles in a predictable window and smells
            clean. Then it can raise a loaf.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Before that, any bread you mix is a guess. The inoculation is
            weak. Bulk runs long. The crumb comes out dense and you blame the
            formula.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Use it at peak, not after it has fallen. Mix before the peak and
            bulk stretches. Mix after the collapse and bulk compresses. Acid
            already spent part of the window in the jar.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            True hydration on the loaf counts the flour and water inside that
            starter. A new baker&apos;s first dense loaf is often a hydration
            error, not a dead jar.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Keep a small jar. Feed what you will bake with. Daily feeding is
            for a culture you are using. A starter in the fridge, fed when
            you bake, is enough after it is established. The from-scratch
            phase is the only stretch that wants a feed every day.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Key numbers
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-fg/90">
            <li>Start: equal flour and water, by weight.</li>
            <li>Day 3: false rise. Not yeast. Do not bake it. Do not dump it.</li>
            <li>Day 5: stall is normal.</li>
            <li>House feeding once it is alive: 1:5:5.</li>
            <li>A 1:10:10 at 18&deg;C is a 32-hour culture, not a same-day levain.</li>
            <li>Ready: doubles on a repeated 1:5:5, clean smell, used at peak.</li>
          </ul>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Once the jar is repeating, the loaf math is the calculator&apos;s job.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The sourdough engine folds the starter&apos;s flour and water into
            true hydration and reads the bulk window from dough temperature
            and inoculation. Get the jar reliable first. Then let the engine
            do the arithmetic.
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
