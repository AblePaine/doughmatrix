import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const TITLE = "Detroit-Style Pizza Dough Recipe: Hydration, Pan, and Sauce on Top";

const DESCRIPTION =
  "Detroit-style pizza dough runs wetter than NY. The pan and the cheese wall forgive it — plus when to par-bake.";

export const Route = createFileRoute("/guides/detroit-pizza-dough")({
  component: DetroitPizzaDoughGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/detroit-pizza-dough",
      image: OG_IMAGES.engine,
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function DetroitPizzaDoughGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Detroit-Style Pizza Dough Recipe: Hydration, Pan, and Sauce on Top
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Detroit dough is a pan dough. It does not have to survive a peel.
          The steel pan holds it. The cheese fries a wall around it. That is
          why it can run wetter than a New York round and still come out
          square, tall, and crisp on the edge.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          The pizza engine sets Detroit / Pan at 72% hydration. New York on
          the same engine sits at 68%. Sheet-pan sits at 60%. The gap is the
          pan.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Why 72% works here
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            At 72% the dough is soft. It slumps. It will not clear the bowl
            the way a 60% sheet-pan dough does. Mix until it is smooth, not
            until it balls up. Bread flour. The pan does the work.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Oil is not optional in this style. The engine puts olive oil at
            2.5% of flour weight. Salt is 2.5%. The oil in the dough keeps the
            crumb tender. The oil in the pan is what fries the underside.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            A New York dough at 68% has to be launchable and foldable. Push
            that dough to 72% on a peel and it sticks, spreads, and tears. In
            a pan those failures do not exist. You press. You wait. You press
            again.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Do not chase 80% because a video did. Eighty percent is a
            steel-and-heat problem. Detroit&apos;s problem is a pale center
            and a dry edge. 72% is the number that matches the pan.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Pan weight, not ball weight
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Round pies are portioned as balls. Detroit is portioned as a pan.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            The engine&apos;s default is a 10&times;14 inch pan. That is 140
            square inches. Dough weight for that pan is 516 g. Oil the pan
            well. Press the dough toward the corners. If it springs back,
            cover it for 20 minutes and press again. Cold dough will not
            reach the corners. Give it the warm-up.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            A bigger pan wants more dough. A smaller pan wants less. Scale
            with the area of the pan, not with a guess. Thickness is the whole
            style. Too little dough and you get a cracker with a cheese rim.
            Too much and the center stays pale under the sauce.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Yeast from the schedule
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Long cold ferments need little yeast. An 8-hour room-temp dough
            takes 0.30% instant yeast. A 24-hour cold ferment takes 0.10%.
            Weigh it. A pinch is not a dose.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Room time before the fridge still counts. A 24-hour cold ferment
            with a couple of hours on the counter is not the same dough as 24
            hours cold from the minute you mix.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The par-bake question
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Classic Detroit bakes in one shot. Cheese goes on before the oven.
            The rim fries into the frico wall while the dough finishes
            underneath.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Par-bake when the center stays pale. The engine&apos;s note is
            specific: par-bake 8 minutes before topping if the center stays
            pale. Then sauce, cheese, and back in to finish. A thick pan, a
            cool oven, or dough that never reached the corners are the usual
            reasons.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Do not par-bake by habit. A par-bake on a dough that was already
            ready dries the crumb and gives you a cracker under the cheese.
            Pale center, then par-bake. Colored center, skip it.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Sauce on top
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Order is the style.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Pepperoni goes down first if you want it to cup. Cheese goes to
            the very edge, past the dough, so it hits the pan and fries. Sauce
            goes on last, in lanes, not as a blanket under the cheese. Sauce
            under the cheese steams the center and kills the wall.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Bake at 500&deg;F. The oven is what you preheat. The pan goes in
            cold, dough already in it. Time is 12&ndash;15 minutes. The wall
            should be dark at the edge and the underside spotted, not blonde.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Pull it. Rest it a few minutes in the pan so the cheese sets. Then
            the first cut. A Detroit slice is a rectangle on purpose. The
            corner piece is the test. Crisp wall, open crumb, sauce on top.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Key numbers
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-fg/90">
            <li>Detroit hydration on the engine: 72%.</li>
            <li>Salt: 2.5% of flour.</li>
            <li>Olive oil in the dough: 2.5% of flour.</li>
            <li>Default pan: 10&times;14 in, 516 g dough.</li>
            <li>Instant yeast: 0.30% for 8 hours at room temp.</li>
            <li>Instant yeast: 0.10% for a 24-hour cold ferment.</li>
            <li>Bake: 500&deg;F, pan in cold, 12&ndash;15 minutes.</li>
            <li>Par-bake: 8 minutes, only if the center stays pale.</li>
          </ul>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Size the pan, set the hours, and let the engine dose the yeast.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The pizza engine carries the Detroit preset: 72% hydration, pan
            weight from pan area, and yeast dosed from your fermentation
            schedule. Set the pan, set the hours, read the formula.
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
