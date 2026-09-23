import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const TITLE =
  "Reading Your Sourdough Crumb: How to Diagnose Under-Fermented, Over-Fermented, and Fool's Crumb Loaves";

const DESCRIPTION =
  "Read the loaf: dense under-fermented crumb, weak over-fermented crumb, and fool's crumb that looks open but isn't. Find the cause, change one number, and bake it better next time.";

const ROWS: {
  defect: string;
  symptoms: string;
  cause: string;
  fix: string;
}[] = [
  {
    defect: "Under-fermented",
    symptoms:
      "Tight even crumb, heavy loaf, thick pale crust, little ear, floury smell.",
    cause:
      "Bulk ended early for that dough temp and starter amount. Cold kitchen, young starter, or 20% starter treated like a 5-hour mix at 18°C.",
    fix: "Give bulk the hours the calculator calls for. Raise dough temp or starter amount — do not add water to “open it up.”",
  },
  {
    defect: "Over-fermented",
    symptoms:
      "Shiny thin walls, greasy look, loaf spread, weak or no ear, vinegar or alcohol.",
    cause:
      "Past the bulk window: too warm, too much starter, a past-peak starter, or a long bulk that ignored the temperature.",
    fix: "Shorten bulk toward the table's center. Cooler dough temp, less starter, peaked starter. Fridge proof if the kitchen runs hot.",
  },
  {
    defect: "Fool’s crumb",
    symptoms:
      "Caves clustered under the crust, dense tight floor. Looks open in a photo, eats like sandwich bread with holes.",
    cause:
      "Gas never distributed. Short or uneven bulk, then aggressive shaping parked a few bubbles at the top. Under-proofed core, big oven spring in the wrong places.",
    fix: "Finish bulk so the mass is aerated throughout. Gentle coil folds. Proof to a slow spring-back. Then score.",
  },
  {
    defect: "Tight even crumb",
    symptoms: "Uniform small holes, light loaf, decent ear. Sandwich crumb.",
    cause:
      "Hydration below the flour’s sweet spot, or a thorough degas at shape. Not under-fermentation if the loaf is light.",
    fix: "If you want more open crumb, raise true hydration toward the sweet spot without crossing the ceiling. Keep bulk on time.",
  },
  {
    defect: "Gummy / wet",
    symptoms: "Knife smears hours after cooling. Shiny collapsed walls.",
    cause:
      "Sliced hot; underbaked (core under 206°F); or true hydration at or over the flour ceiling, so the net never set.",
    fix: "Cool 2 hours. Bake to 206–210°F in the center. If the mix was a puddle, drop hydration or use Rescue.",
  },
  {
    defect: "Pancake / spread",
    symptoms: "Melted on the stone, no height, ragged skin, maybe a burst side.",
    cause:
      "No gluten skin: ceiling crossed, bulk run long, or both. Weak flour (AP, 00, einkorn) at country-loaf water.",
    fix: "Check the hydration bands first, then the bulk window. Shape only after the mix can hold a skin.",
  },
];

export const Route = createFileRoute("/guides/sourdough-crumb-troubleshooting")({
  component: CrumbGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/sourdough-crumb-troubleshooting",
      image: OG_IMAGES.crumb,
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function CrumbGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Reading Your Sourdough Crumb: How to Diagnose Under-Fermented,
          Over-Fermented, and Fool's Crumb Loaves
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          The cut is the report card. Height, ear, and Instagram holes lie.
          Density, hole placement, wall thickness, and smell tell you whether
          bulk was short, long, or just uneven.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            Most “open crumb” photos that disappoint at the table are{" "}
            <strong className="font-medium text-fg">fool’s crumb</strong>: a
            few caverns under the crust and a tight, under-fermented core.
            That is not high hydration succeeding. It is gas that never got
            distributed, then bolted for the top in the oven.
          </p>
          <p>
            The calculator won't score your loaf. It will tell you if the mix
            could hold a skin, and when bulk should have ended for that
            temperature and starter amount. Read the crumb first. Then change
            one number.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            What you're looking for
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed text-fg/90">
            <li>
              Weigh it in your hand. Light for its size usually fermented;
              dense usually did not — holes at the crown do not count.
            </li>
            <li>
              Look at hole <em>placement</em>, not hole size. Evenly scattered
              holes mean bulk did its job. A cave under the crust with a tight
              floor is fool's crumb.
            </li>
            <li>
              Check the walls. Dull and thick: under. Thin, shiny, greasy:
              over. Soft but set: on time.
            </li>
            <li>
              Smell the center, not the crust. Floury is short. Vinegar and
              alcohol are long. Nutty and faintly tangy is the window.
            </li>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Match the crumb to the problem
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Match symptoms to a primary defect. Change the root cause on the
            next bake — not your scoring pattern.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Sourdough crumb guide: symptoms, defect, cause, and fix
              </caption>
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-faint uppercase">
                  <th className="py-3 pr-3 font-medium">Symptoms</th>
                  <th className="py-3 pr-3 font-medium">Primary defect</th>
                  <th className="py-3 pr-3 font-medium">Root cause</th>
                  <th className="py-3 font-medium">Recipe fix</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr
                    key={row.defect}
                    className="border-b border-border/70 align-top last:border-0"
                  >
                    <td className="py-3 pr-3 text-fg/90">{row.symptoms}</td>
                    <th className="py-3 pr-3 font-medium text-accent">
                      {row.defect}
                    </th>
                    <td className="py-3 pr-3 text-muted">{row.cause}</td>
                    <td className="py-3 text-fg/90">{row.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Gummy crumb isn't always about bulk
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            A gummy crumb is often blamed on bulk when the starch never set.
            Wheat starch sets in the loaf's core around{" "}
            <strong className="font-medium text-fg">206–210°F</strong>{" "}
            (96–99°C). Probe the center, not the crust. If you pull at 200°F,
            the walls look baked and the middle stays paste.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-card p-4 shadow-[0_0_0_1px_var(--color-border)]">
              <p className="text-xs tracking-wide text-faint uppercase">
                Core temperature
              </p>
              <p className="mt-2 font-display text-2xl text-fg">206–210°F</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Hold until the probe in the thickest part reads this band. Lid
                off if the crust is already dark.
              </p>
            </div>
            <div className="rounded-lg bg-card p-4 shadow-[0_0_0_1px_var(--color-border)]">
              <p className="text-xs tracking-wide text-faint uppercase">
                Cooling rule
              </p>
              <p className="mt-2 font-display text-2xl text-fg">2 hours</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Steam is still migrating. Slice sooner and the knife smears —
                that is unset crumb, not a recipe failure.
              </p>
            </div>
          </div>
          <p className="mt-4 leading-relaxed text-fg/90">
            If the loaf hit 208°F and cooled two hours and still smears, look
            at hydration and bulk — the ceiling and the window — not the oven.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The three loaves people confuse
          </h2>
          <div className="mt-6 grid gap-3">
            <Band
              title="Under-fermented"
              body="The gluten net is intact and unused. You can still save the next bake by giving bulk the hours the temperature table calls for — or by warming the dough so those hours fit a weekday. Do not add water to “open it up.” Under-fermented high hydration is how you get fool’s crumb."
            />
            <Band
              title="Over-fermented"
              body="The net ate itself. Acid and time thinned the walls; oven spring has nothing to push against. Shorter bulk, cooler dough temp, or less starter. A past-peak starter already spent part of the window in the jar — the calculator's late-starter factor (0.88×) exists for this."
            />
            <Band
              title="Fool’s crumb"
              body="The loaf is under-fermented in the middle and over-sprung at the skin. Big holes are a leak, not a goal. Finish bulk until the dough is airy all the way through, fold to stack layers without knocking the gas out, and proof until a floured finger springs back slowly. Then the ear is structure, not a blister over a cave."
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Change one number
          </h2>
          <div className="mt-4 space-y-4 leading-relaxed text-fg/90">
            <p>
              If the crumb is tight and the mix was stiff, hydration was the
              lever — see{" "}
              <Link
                to="/guides/flour-hydration-ceiling"
                className="text-accent hover:text-accent-hover"
              >
                the flour hydration ceiling
              </Link>
              . If the crumb is tight and the mix was slack enough, bulk was
              short — see{" "}
              <Link
                to="/guides/temperature-fermentation-matrix"
                className="text-accent hover:text-accent-hover"
              >
                the bulk guide
              </Link>
              .
            </p>
            <p>
              Fool’s crumb is almost always the second case wearing the first
              case’s photography. Hit the bulk window at a hydration the flour
              can hold. The open crumb is a side effect of an even ferment, not
              a hole you score into existence.
            </p>
          </div>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Set flour, hydration, temp, and starter. Bake the window, not the
            photo.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The sourdough calculator is the bench tool behind this table:
            true hydration against the flour ceiling, bulk by dough temp and
            starter amount, and the water temp that lands your dough — so the
            next crumb matches the diagnosis you just made.
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

function Band({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg bg-card p-4 shadow-[0_0_0_1px_var(--color-border)]">
      <p className="text-sm font-medium text-fg">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
