import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const TITLE = "Cold Proof Sourdough How Long: Retard Timing That Holds";

const DESCRIPTION =
  "The fridge is the pause button, not a stop. 12h vs 24h vs 36h — flavor against structure, and when the retard over-proofs.";

export const Route = createFileRoute("/guides/cold-retard-timing")({
  component: ColdRetardGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/cold-retard-timing",
      image: OG_IMAGES.temp,
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function ColdRetardGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Cold Proof Sourdough How Long: Retard Timing That Holds
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          The fridge is the pause button. It is not a stop. Yeast slows.
          Enzymes do not. Acid keeps accumulating. Structure keeps relaxing.
          How long you leave the shaped dough in the cold is a trade between
          flavor and the strength you still need at the peel.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            Cold-proof after shaping. The dough should already be at the end
            of bulk, not halfway through it. The retard finishes a loaf. It
            does not rescue a dough that never fermented.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            What the cold actually does
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Yeast activity drops hard near refrigerator temperature. It does
            not hit zero during the cool-down. The core of a boule stays
            warmer than the air for hours. That lag is still fermentation.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Lactic and acetic acids keep forming after the yeast has quieted.
            That is the flavor people are chasing. Protease keeps snipping
            gluten. That is the spread people blame on the basket.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            A dough that enters the fridge tight and just short of proofed
            comes out flavorful and holdable. A dough that enters fully proofed
            comes out tired. Cold did not cause the collapse. It finished a
            job the bench had already done.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            12 hours
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Twelve hours is schedule insurance. Enough acid to taste like
            sourdough. Not enough time for the gluten to give up.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            The loaf bakes with most of the strength you shaped into it. Ear
            is easier. Spread is less. Flavor is mild, not sharp. Use this
            when you shaped late and need the morning, not a project.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            The site&apos;s work-week note puts fridge proof in a 12–24 hour
            band at 39–42°F, after a short warm start. Twelve hours is the
            short end of that band. It is a pause that still tastes like
            bread.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            24 hours
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Twenty-four hours is the useful default for most home loaves. Acid
            has had a full night. The crumb reads more fermented. The crust
            browns a little faster, because sugars and acids are further
            along.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Structure still holds if the dough went in with gas in reserve.
            Score it cold. Bake it cold. A warm-up on the counter is how a
            24-hour loaf over-proofs in the last hour, after the fridge did
            its job.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            This is the retard that rescues a weekday. Shape when you are
            home. Bake when you are home tomorrow. The formula does not
            change. The clock does.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            36 hours and past it
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Past a day and a half, flavor keeps gaining and structure starts
            spending. The dough smells sharper. It may look fine in the basket
            and then flatten on the peel.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Gluten has been under acid and enzymes for a long time.
            High-hydration doughs show it first. A stiff dough forgives a
            longer retard. A wet one does not.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Thirty-six hours can still bake if the dough went in young and the
            flour is strong. Forty-eight hours is a flavor choice you pay for
            in oven spring. If the surface is fragile, blistered with large
            bubbles, or slack to the touch, it is done waiting. Bake it. Do
            not give it another night.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            When cold saves the day, and when it lies
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Cold-proofing rescues a schedule when bulk finished on time and
            you cannot bake yet. Basket, cover, fridge. The loaf waits.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            It does not rescue a dough that is already over-proofed.
            Refrigeration slows the damage. It does not rewind it. A collapsed
            bulk put into a basket still bakes flat.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            It also lies if the fridge is warm. A refrigerator at 45°F is not
            the same pause as one at 38°F. Know the shelf you use. The door is
            warmer. The back is colder.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Watch the dough, not the badge on the door. Domed and jiggly is
            ready. Soupy and fragrant-sharp is late. Poke: a dent that comes
            back slowly is the window. A dent that stays is past it.
          </p>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Set the bulk window. Put the retard on the timeline.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The sourdough engine puts a cold retard on the timeline after the
            warm proof — the hour you need, next to the bulk window you
            already set.
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
