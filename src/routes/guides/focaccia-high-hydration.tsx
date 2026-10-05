import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const TITLE = "Focaccia Hydration Percentage: How to Dimple a Wet Dough";

const DESCRIPTION =
  "Focaccia lives at 75–85% hydration because the pan forgives the slack. Coil folds in the tin, dimpling without degassing, and heat from below.";

export const Route = createFileRoute("/guides/focaccia-high-hydration")({
  component: FocacciaGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/focaccia-high-hydration",
      image: OG_IMAGES.hydration,
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function FocacciaGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Focaccia Hydration Percentage: How to Dimple a Wet Dough
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Focaccia dough feels impossible on purpose. At 80% hydration it
          sticks, slumps, and refuses to be a ball. The pan is why that is
          allowed. A loaf has to hold a shape in the air. Focaccia has to fill
          a rectangle. The tin does the structural job the gluten is too wet
          to do alone.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            Sixty percent is sheet-pan pizza. Seventy is a steel pie. Focaccia
            lives higher, usually 75–85%, because the crumb you want is open
            and the bake is long enough to set it. The pan forgives the slack.
            Your hands do not have to.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Why it feels wrong
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            High hydration means the gluten network is diluted. The dough
            tears if you treat it like bread. It also flows. Flow is the
            feature. You are not building a freestanding boule. You are
            building a sheet that will be fried on the bottom by oil and set
            by an oven that has time.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Strength still matters. A weak 80% dough makes a dense, oily
            cushion. A developed 80% dough makes holes you can see.
            Development comes from folds, not from kneading it into a smooth
            ball it will never be.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Oil is not a garnish here. Oil in the pan is a structural
            ingredient. It fries the underside, stops the dough welding to the
            metal, and sits in the dimples so the top crisps instead of
            drying. A dry pan bakes a flatbread. An oiled pan bakes focaccia.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Coil folds, in the pan
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Do the strength work where the dough already lives. Oil the pan.
            Tip the dough in. Wet or oiled hands.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            A coil fold in the pan: lift one side, stretch it up until it
            resists, and fold it over the middle. Turn the pan. Repeat. Three
            or four turns is a set. The dough will not look tidy. It will
            look thicker than it did.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Rest. Repeat the set two or three times across the first hour or
            two. You are building layers and elasticity without ever picking
            the mass up onto a bare bench, where an 80% dough becomes a
            cleanup project.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Stop folding when the dough holds a lobe for a moment before it
            relaxes. That is enough gluten. More folds just degas it.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Yeast still follows the clock, not the pan. An 8-hour room ferment
            wants about 0.30% instant yeast. A 24-hour cold ferment wants about
            0.10%. The pizza engine doses from the schedule you actually have.
            Set the hydration you mean. Let it return the grams.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            How to dimple
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Dimple late. The dough should be relaxed, jiggly, and already
            filling most of the pan. If it snaps back and leaves the corners
            empty, it is early. Wait.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Oil your fingers. Not flour. Flour fights the hydration you paid
            for.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Drive straight down, to the pan, and pull out. Do not drag.
            Dragging rips the sheet and smears the gas out of it. Spacing is a
            finger-width or two. Cover the surface. You are parking oil in
            pockets, not painting a pattern.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            The dough should fill back slowly around the finger marks, not
            seal them shut and not collapse to the metal. Seals shut:
            under-proofed, or you were too gentle to reach the pan. Collapses
            and will not refill the corners: over-proofed. Bake that one. Do
            not dimple it again.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            A second, lighter dimple after a short rest is enough if the first
            set swelled shut. A third pass is how you knock the crumb out.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Bake it like a pan, not a pie
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Heat from below is the point. A loaded pan on a hot stone or
            steel, or a thorough preheat if the pan goes in alone. The oil
            does the browning on the bottom. The dimples do it on top.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Salt goes on at the dimple, not only in the dough. Flake salt in
            the oil pockets stays put. Herbs go on then too, so they fry
            instead of burn.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            If the underside is pale, the pan was cold or the rack was too
            high. If the crumb is gummy under a dark top, the hydration was
            fine and the bake was short. Give it longer at a slightly lower
            rack. Do not &ldquo;fix&rdquo; gummy focaccia by lowering the
            water next time. Fix the bake.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Size the batch from the pan, not from a loaf formula.
          </p>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Set the water high. Let the schedule dose the yeast.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The pizza engine takes hydration, pan or ball weight, and the
            ferment you have time for — and returns the grams, yeast included.
          </p>
          <Link
            to="/engines/pizza"
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 text-base font-medium text-inverse shadow-[0_0_0_1px_rgb(229_169_98_/_0.4)] hover:bg-accent-hover"
          >
            Open the pizza calculator
            <ArrowRight className="size-4" />
          </Link>
        </aside>
      </article>
    </GuideShell>
  );
}
