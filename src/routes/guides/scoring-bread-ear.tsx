import { createFileRoute } from "@tanstack/react-router";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

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
      image: OG_IMAGES.engine,
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
          The blade does not make the ear. The proof, the angle, and the
          depth do — in that order. Get those right and the loaf does the
          rest.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            Scoring is a controlled weak spot. Oven spring will open the loaf
            somewhere; the blade tells it where. A good ear — the thin flap
            that lifts and crisps — is the score opening upward instead of
            ripping sideways.
          </p>
          <p>
            Three variables decide it: dough readiness, blade angle, and
            depth. Fancy patterns fail for the same three reasons a single
            slash fails.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Score when the dough is proofed, not when the timer says so
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            The loaf should be cool if it came from the fridge, slightly
            puffy, and a floured finger should leave a dent that springs back
            halfway in 2–3 seconds. Fully collapsed dough cannot hold an ear.
            Under-proofed dough bursts wherever it wants, usually at the base.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Cold dough scores cleaner. If you proofed at room temperature,
            move the basket to the fridge for 20–30 minutes before turning it
            out — the skin firms and the lame stops dragging.
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
            Hold a straight or curved lame with a fresh half-razor:
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Scoring blade angle, depth, and length by goal
              </caption>
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-faint uppercase">
                  <th className="py-3 pr-3 font-medium">Goal</th>
                  <th className="py-3 pr-3 font-medium">Blade angle</th>
                  <th className="py-3 pr-3 font-medium">Depth</th>
                  <th className="py-3 font-medium">Length</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">
                    High ear on a boule
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap text-muted">
                    25–30° (almost flat)
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap text-muted">
                    8–12 mm (3/8 in)
                  </td>
                  <td className="py-3 text-muted">4–6 in, slightly off-center</td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">
                    Controlled bloom, less ear
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap text-muted">45°</td>
                  <td className="py-3 pr-3 whitespace-nowrap text-muted">
                    6–8 mm
                  </td>
                  <td className="py-3 text-muted">
                    Along the long axis of a batard
                  </td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">
                    Decorative slashes
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap text-muted">
                    90° (straight down)
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap text-muted">
                    3–5 mm
                  </td>
                  <td className="py-3 text-muted">Short, 1–2 in</td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">
                    High-hydration slack dough
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap text-muted">
                    20–30°, one confident motion
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap text-muted">
                    10–15 mm
                  </td>
                  <td className="py-3 text-muted">One decisive cut</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 leading-relaxed text-fg/90">
            A 90° cut makes a ridge, not an ear — the flap needs a shallow ramp
            so steam can lift it. Depth is measured into the skin, not along
            the blade: on a 750–900 g boule, 10 mm is the default. Shallower
            than 6 mm and the loaf ignores you. Deeper than 20 mm and you
            deflate a cold-proofed dough.
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
              as it sits on the peel. The ear opens on the near side of the
              cut, so aim the flap where you want the photo to land.
            </p>
            <p>
              <strong className="font-medium text-fg">Batard.</strong> One long
              cut from 1 inch off the top end to 1 inch off the tail, just
              right of the centerline, parallel to the long axis. Two parallel
              cuts on a narrow batard fight each other.
            </p>
            <p>
              <strong className="font-medium text-fg">Decoration.</strong>{" "}
              Wheat stalks and grids are 90° shallow cuts added after the
              expansion score. They are decoration. They do not create the
              ear.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Steam and heat so the cut can open
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            The score only works if the crust stays plastic for the first
            8–12 minutes:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-fg/90">
            <li>
              <strong className="font-medium text-fg">Dutch oven:</strong>{" "}
              preheat 30–45 minutes at 475–500°F. Lid on 18–20 minutes, lid
              off 15–20.
            </li>
            <li>
              <strong className="font-medium text-fg">Stone plus steam:</strong>{" "}
              500°F stone, 1 cup boiling water into a preheated pan at launch,
              vent after 12 minutes.
            </li>
            <li>
              <strong className="font-medium text-fg">Pull temp:</strong>{" "}
              205–210°F internal for lean bread.
            </li>
          </ul>
          <p className="mt-4 leading-relaxed text-fg/90">
            If the ear fused, you scored too late, cut at 90°, or lost steam.
            If the loaf split at the base, it was under-proofed or the score
            was too timid.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            A working routine
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed text-fg/90">
            <li>Preheat vessel 45 minutes at 485°F.</li>
            <li>
              Turn out a 12–16 hour cold-proofed boule. Whatever your
              calculator calls its hydration — include or exclude starter
              water, just stay consistent.
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
          <ul className="mt-4 space-y-3 leading-relaxed text-fg/90">
            <li>
              <strong className="font-medium text-fg">
                Tight crumb and the cut barely moved:
              </strong>{" "}
              raise proof 15–20 minutes next time.
            </li>
            <li>
              <strong className="font-medium text-fg">
                Loaf spread in the pot and the cut unzipped into a crater:
              </strong>{" "}
              drop proof 15 minutes.
            </li>
            <li>
              <strong className="font-medium text-fg">Dull razor:</strong>{" "}
              change blades every 4–6 loaves. A dull razor drags and seals the
              wound.
            </li>
            <li>
              <strong className="font-medium text-fg">
                High whole-grain doughs:
              </strong>{" "}
              they brown fast and set a crust early. Score 2 mm deeper and keep
              the lid on 2 extra minutes.
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Reading the crumb after the fact
          </h2>
          <div className="mt-4 space-y-4 leading-relaxed text-fg/90">
            <p>
              <strong className="font-medium text-fg">
                Tall ear, tight 1-inch band of dense crumb under the flap:
              </strong>{" "}
              the score was good and the proof was just shy. Add 15 minutes in
              the basket next loaf.
            </p>
            <p>
              <strong className="font-medium text-fg">
                Ear opened, then collapsed into a crater:
              </strong>{" "}
              late proof plus a deep cut. Pull the next bulk 20 minutes
              earlier.
            </p>
            <p>
              <strong className="font-medium text-fg">
                No ear, one side split at the basket ring:
              </strong>{" "}
              the dough stuck, or you dropped it into the pot on that seam.
              Dust the basket, and load so the score faces the side you want
              to show.
            </p>
          </div>
          <p className="mt-4 leading-relaxed text-fg/90">
            Keep a log for five loaves: mix hydration as your calculator prints
            it, bulk hours, fridge hours, the angle you think you used, and
            whether an ear formed. The log beats another video. After five rows
            you will know if your problem is proof or the lame.
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
      </article>
    </GuideShell>
  );
}
