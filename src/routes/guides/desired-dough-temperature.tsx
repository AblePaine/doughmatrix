import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const TITLE =
  "Desired Dough Temperature Calculator: What Water Temperature for Sourdough";

const DESCRIPTION =
  "Room temperature is not dough temperature. The water-temp formula — from flour, room, starter, and friction — and how the calculator solves for the tap.";

export const Route = createFileRoute("/guides/desired-dough-temperature")({
  component: DdtGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/desired-dough-temperature",
      image: OG_IMAGES.temp,
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function DdtGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Desired Dough Temperature Calculator: What Water Temperature for
          Sourdough
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Room temperature is not dough temperature. Cold flour, a warm
          starter, and the heat of mixing all land in the bowl. Desired dough
          temperature is the number you meant. Water is how you get it.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            Miss the target and the bulk clock you planned is fiction. Warm
            dough races. Cold dough stalls. The formula is short. The
            calculator runs it so you are not doing arithmetic at the tap.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The number the table runs on
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Desired dough temperature is the temperature of the dough right
            after the mix. Not the kitchen. Not the bag of flour. The dough.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            A probe in the center of the mass, after the salt is in. That
            reading is what fermentation actually sees.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            The site&apos;s bulk window is built on dough temperature, not
            air. A 24°C dough is the reference row. A dough that mixed at 21°C
            is a different row, even if the room reads 24°C. Ambient air does
            not get a vote.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The formula
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Four temperatures. One friction term.
          </p>
          <div className="mt-6 rounded-lg bg-card p-4 shadow-[0_0_0_1px_var(--color-border)] sm:p-5">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              The water-temp formula
            </p>
            <p className="mt-3 font-display text-xl text-fg">
              Water = (4 × DDT) − flour − room − starter − friction
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Flour, room, starter, and the dough itself are the four. Water is
              the unknown. Friction is the heat the mix adds. You subtract it
              so the dough does not overshoot the target.
            </p>
          </div>
          <p className="mt-4 leading-relaxed text-fg/90">
            The published walk-through uses a 24°C target. Flour at 21°C. Room
            at 22°C. Starter at 23°C. Friction at 1°C for a light hand mix.
            Water lands at 29°C. That is 4 × 24, minus 21, minus 22, minus 23,
            minus 1.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Move one input and the water moves the other way by the same
            amount. Flour two degrees colder. Water two degrees warmer. A
            starter straight from the fridge is not the same input as a jar
            that peaked on the counter. Measure it.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Friction is a measured number
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Hand mix, light, is the 1°C case — the calculator&apos;s default.
            A stand mixer adds more. Mixer friction often sits in the 4–8°C
            band. Set the factor for the mix you actually do.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Guessing zero on a machine is how a &ldquo;24°C dough&rdquo;
            finishes warmer than the row you picked. If you do not know your
            mixer, mix once and measure. Dough temperature minus the
            no-friction prediction is your friction. Write it down. Reuse it.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Slap-and-fold adds less heat than ten minutes on speed 2. The
            factor follows the method. It is not a personality trait of the
            recipe.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            When the tap cannot do it
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Water below fridge temperature means the target is out of reach
            from this kitchen. Ice is the fix. Or a lower DDT. The formula is
            reporting the room. It is not being difficult.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Water past about 38°C will shock the culture — the
            calculator&apos;s own range tops out there. Lower the target. Or
            mix gentler so friction drops and the water can come down with
            it. Do not &ldquo;correct&rdquo; a hot result by using hot water
            anyway.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Stone counters steal heat after the mix. The formula predicts the
            dough at the end of mixing. The probe confirms it. If they
            disagree, fix the friction factor. Do not edit the formula.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            What the calculator is doing
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            You set the dough temperature you want. You enter flour temp, room
            temp, starter temp, and friction. The engine returns the water
            temperature that satisfies the formula.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            It does not average the kitchen. It solves for the tap.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            True hydration is a separate output. Water temperature does not
            change the percentage. It changes whether that percentage ferments
            on the clock you chose. A 72% dough at 20°C and the same dough at
            26°C are different bakes.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Weigh the water after you know the temperature, not before. A
            kettle that overshoots is easier to cool than a dough that already
            has the salt in.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Then check the dough with a probe. If the probe misses, your
            friction factor is wrong. The formula already did its job.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Warm kitchen, fast bulk. Cold dough in that kitchen is still a
            cold dough. Water temperature is how you stop the room from
            choosing for you.
          </p>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Set the DDT. Read the water temp. Mix the number you meant.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The sourdough calculator runs the four-temperature formula live —
            flour, room, starter, friction in, water temperature out.
          </p>
          <Link
            to="/engines/sourdough"
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 text-base font-medium text-inverse shadow-[0_0_0_1px_rgb(229_169_98_/_0.4)] hover:bg-accent-hover"
          >
            Open the DDT calculator
            <ArrowRight className="size-4" />
          </Link>
        </aside>
      </article>
    </GuideShell>
  );
}
