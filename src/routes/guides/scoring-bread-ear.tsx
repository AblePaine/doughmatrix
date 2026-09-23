import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { socialHead } from "@/lib/og/meta";

const TITLE = "Scoring Bread: Blade Angle, Depth, and Timing for an Open Ear";

const DESCRIPTION =
  "How deep to cut, what angle to hold the lame, and when to score so a boule opens an ear instead of a split.";

export const Route = createFileRoute("/guides/scoring-bread-ear")({
  component: ScoringGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/scoring-bread-ear",
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function ScoringGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Scoring Bread: Blade Angle, Depth, and Timing for an Open Ear
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Scoring is a controlled weak spot. Oven spring will open the loaf
          somewhere. The blade tells it where. A good ear — the thin flap that
          lifts and crisps — is the score opening upward instead of ripping
          sideways.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            Three variables decide it: dough readiness, blade angle, and depth.
            Fancy patterns fail for the same three reasons a single slash fails.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Score when the dough is proofed, not when the timer says so
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            The loaf should be cool if it came from the fridge, slightly puffy,
            and a floured finger should leave a dent that springs back halfway
            in 2–3 seconds. Fully collapsed dough cannot hold an ear.
            Under-proofed dough bursts wherever it wants, usually at the base.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Cold dough scores cleaner. If you proofed at room temperature, move
            the basket to the fridge for 20–30 minutes before turning it out.
            The skin firms and the lame stops dragging.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Turn the loaf onto parchment or a peel. Score within 60–90 seconds.
            Every extra minute on the bench skins the surface and the cut welds
            shut in the oven.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Angle and depth
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Hold a straight or curved lame with a fresh half-razor.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Blade angle, depth, and length for different scoring goals
              </caption>
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-faint uppercase">
                  <th className="py-3 pr-3 font-medium">Goal</th>
                  <th className="py-3 pr-3 font-medium">
                    Blade angle to the skin
                  </th>
                  <th className="py-3 pr-3 font-medium">Depth</th>
                  <th className="py-3 font-medium">Length</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">
                    High ear on a boule
                  </td>
                  <td className="py-3 pr-3 text-muted tabular-nums">
                    25–30° (almost flat to the surface)
                  </td>
                  <td className="py-3 pr-3 text-muted tabular-nums">
                    8–12 mm (about 3/8 in)
                  </td>
                  <td className="py-3 text-muted">
                    4–6 in, slightly off-center
                  </td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">
                    Controlled bloom, less ear
                  </td>
                  <td className="py-3 pr-3 text-muted tabular-nums">45°</td>
                  <td className="py-3 pr-3 text-muted tabular-nums">6–8 mm</td>
                  <td className="py-3 text-muted">
                    Along the long axis of a batard
                  </td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">
                    Decorative slashes that should not open wide
                  </td>
                  <td className="py-3 pr-3 text-muted tabular-nums">
                    90° (straight down)
                  </td>
                  <td className="py-3 pr-3 text-muted tabular-nums">3–5 mm</td>
                  <td className="py-3 text-muted">Short, 1–2 in</td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">
                    High-hydration slack dough
                  </td>
                  <td className="py-3 pr-3 text-muted tabular-nums">
                    20–30°, confident single motion
                  </td>
                  <td className="py-3 pr-3 text-muted tabular-nums">10–15 mm</td>
                  <td className="py-3 text-muted">One decisive cut</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 leading-relaxed text-fg/90">
            A 90° cut makes a ridge, not an ear. The flap needs a shallow ramp
            so steam can lift it.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Depth is measured into the skin, not along the blade. On a 750–900 g
            boule, 10 mm is the default. Shallower than 6 mm and the loaf
            ignores you. Deeper than 20 mm and you deflate a cold-proofed dough.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            One motion. Hesitation makes a chewed edge that never lifts.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Where to put the cut
          </h2>
          <div className="mt-4 space-y-4 leading-relaxed text-fg/90">
            <p>
              <strong className="font-medium text-fg">Boule.</strong> One
              slightly curved slash, off-center toward the far side of the loaf
              as it sits on the peel. The ear opens on the near side of the cut,
              so aim the flap where you want the photo to land.
            </p>
            <p>
              <strong className="font-medium text-fg">Batard.</strong> One long
              cut from 1 inch off the top end to 1 inch off the tail, just right
              of the centerline. Keep it parallel to the long axis. Two parallel
              cuts on a narrow batard fight each other.
            </p>
          </div>
          <p className="mt-4 leading-relaxed text-fg/90">
            Wheat stalks and grids are 90° shallow cuts added after the
            expansion score. They are decoration. They do not create the ear.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Steam and heat so the cut can open
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            The score only works if the crust stays plastic for the first 8–12
            minutes.
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-fg/90">
            <li>
              Dutch oven, preheated 30–45 minutes at 475–500°F. Lid on 18–20
              minutes, lid off 15–20 minutes.
            </li>
            <li>
              Stone plus steam: 500°F stone, 1 cup boiling water into a preheated
              pan at launch, vent after 12 minutes.
            </li>
            <li>
              Loaf internal target when you pull it: 205–210°F for lean bread.
            </li>
          </ul>
          <p className="mt-4 leading-relaxed text-fg/90">
            If the ear fused, you either scored too late, cut at 90°, or lost
            steam. If the loaf split at the base, it was under-proofed or the
            score was too timid.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            A working routine
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed text-fg/90">
            <li>Preheat vessel 45 minutes at 485°F.</li>
            <li>
              Turn out a 12–16 hour cold-proofed 80% hydration-feel boule
              (whatever your calculator calls that hydration — include or
              exclude starter water consistently).
            </li>
            <li>
              Dust the skin lightly. Hold the lame at 30°. Cut 10 mm deep, 5
              inches long, off-center.
            </li>
            <li>Load immediately. Bake 20 minutes covered, 18 uncovered.</li>
          </ol>
          <p className="mt-4 leading-relaxed text-fg/90">
            Do not mist the slash. Do not brush it with oil. Flour on the skin
            is enough contrast.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            When the ear still will not open
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-fg/90">
            <li>
              Raise proof 15–20 minutes next time if the crumb is tight and the
              cut barely moved.
            </li>
            <li>
              Drop proof 15 minutes if the loaf spread in the pot and the cut
              unzipped into a crater.
            </li>
            <li>
              Change blades every 4–6 loaves. A dull razor drags and seals the
              wound.
            </li>
            <li>
              High whole-grain doughs brown fast and set a crust early. Score 2
              mm deeper and keep the lid on 2 extra minutes.
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Reading the crumb after the fact
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            A tall ear with a tight 1-inch band of dense crumb under the flap
            means the score was good and the proof was just shy. Next loaf, add
            15 minutes in the basket.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            An ear that opened then collapsed into a crater is late proof plus a
            deep cut. Pull the next bulk 20 minutes earlier.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            No ear, one side split at the basket ring: the dough stuck, or you
            dropped it into the pot on that seam. Dust the basket, and load so
            the score faces the side you want to show.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Keep a log for five loaves: mix hydration as your calculator prints
            it, bulk hours, fridge hours, angle you think you used, and whether
            an ear formed. The log beats another video. After five rows you
            will know if your problem is proof or the lame.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Key numbers
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-fg/90">
            <li>Blade angle for an ear: 25–30° to the skin.</li>
            <li>Depth: 8–12 mm on a 750–900 g loaf.</li>
            <li>Score within 90 seconds of turning out.</li>
            <li>Finger dent springs back halfway; cold dough scores cleaner.</li>
            <li>Covered bake 18–20 min at 475–500°F, then uncover.</li>
          </ul>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Proof it right and the ear takes care of itself.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The sourdough calculator reads your bulk from dough temp and starter
            amount — land the proof and the score opens like it should.
          </p>
          <Link
            to="/engines/sourdough"
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 text-base font-medium text-inverse shadow-[0_0_0_1px_rgb(229_169_98_/_0.4)] hover:bg-accent-hover"
          >
            Open the bulk-timing calculator
            <ArrowRight className="size-4" />
          </Link>
        </aside>
      </article>
    </GuideShell>
  );
}
