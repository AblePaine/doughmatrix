import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GuidesFooter } from "@/components/guides-footer";

const TITLE =
  "Sourdough Crumb Forensics: How to Diagnose and Fix Under-Fermented, Over-Fermented, and Fool's Crumb Loaves";

const DESCRIPTION =
  "Read the loaf: dense under-fermented crumb, weak over-fermented crumb, and fool’s crumb that looks open but isn’t. Diagnose the cut, then set bulk and hydration in DoughMatrix.";

const ROWS: { name: string; hallmark: string; next: string }[] = [
  {
    name: "Under-fermented",
    hallmark: "Tight even crumb, heavy loaf, thick pale crust, floury smell.",
    next: "Give bulk the DoughMatrix window — warmer DDT or more starter, not more water.",
  },
  {
    name: "Over-fermented",
    hallmark: "Shiny thin walls, spread in the oven, weak ear, vinegar or alcohol.",
    next: "Shorten bulk, cool the dough, or drop inoculation. Use a peak levain.",
  },
  {
    name: "Fool’s crumb",
    hallmark: "Caves under the crust, dense tight floor. Looks open, eats dense.",
    next: "Finish bulk so gas is throughout. Gentle folds. Proof to a slow spring-back.",
  },
  {
    name: "Tight even crumb",
    hallmark: "Uniform small holes, light loaf, decent ear. Sandwich crumb.",
    next: "If you want more open: raise true hydration toward the sweet spot, keep bulk on time.",
  },
  {
    name: "Gummy / wet",
    hallmark: "Knife smears hours after cooling. Shiny collapsed walls.",
    next: "Cool fully; bake longer. If the mix was a puddle, drop hydration or Rescue.",
  },
  {
    name: "Pancake / spread",
    hallmark: "Melted on the stone, no height, ragged skin.",
    next: "Check the ceiling first, then the bulk window. Shape only after a skin exists.",
  },
];

export const Route = createFileRoute("/guides/sourdough-crumb-troubleshooting")({
  component: CrumbGuide,
  head: () => ({
    meta: [
      { title: `${TITLE} — DoughMatrix` },
      { name: "description", content: DESCRIPTION },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://doughmatrix.com/guides/sourdough-crumb-troubleshooting",
      },
    ],
  }),
});

function CrumbGuide() {
  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 pt-6 pb-4">
        <Link to="/" className="flex min-w-0 items-center gap-3 text-fg">
          <Logo />
          <div className="min-w-0">
            <p className="font-display text-2xl leading-none tracking-tight">
              DoughMatrix
            </p>
            <p className="mt-1 text-xs leading-snug text-faint">
              Precision Hydration & Fermentation Engine
            </p>
          </div>
        </Link>
        <Link
          to="/"
          className="inline-flex h-9 shrink-0 items-center gap-1 rounded-sm px-3 text-sm text-muted hover:bg-card hover:text-fg"
        >
          <ArrowLeft className="size-4" />
          Calculator
        </Link>
      </header>

      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Sourdough Crumb Forensics: How to Diagnose and Fix Under-Fermented,
          Over-Fermented, and Fool's Crumb Loaves
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          The cut is the lab report. Height, ear, and Instagram holes lie.
          Density, hole placement, wall thickness, and smell tell you whether
          bulk was short, long, or merely uneven.
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
            DoughMatrix will not score the loaf for you. It will tell you if
            the mix could hold a skin, and when bulk should have ended for that
            temperature and starter load. Read the crumb first. Then change one
            number.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            How to read the loaf
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed text-fg/90">
            <li>
              Weigh it in your hand. Light for its size usually fermented;
              dense usually did not — holes at the crown do not count.
            </li>
            <li>
              Look at hole <em>placement</em>, not hole size. Evenly scattered
              alveoli mean the bulk did its job. A cave under the crust with a
              tight floor is fool’s crumb.
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
            Diagnostic table
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Match what you see to one row. Change the cause, not the scoring
            pattern, on the next bake.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Sourdough crumb diagnosis by hallmark and next bake
              </caption>
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-faint uppercase">
                  <th className="py-3 pr-3 font-medium">Diagnosis</th>
                  <th className="py-3 pr-3 font-medium">Hallmark</th>
                  <th className="py-3 font-medium">Next bake</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr
                    key={row.name}
                    className="border-b border-border/70 align-top last:border-0"
                  >
                    <th className="py-3 pr-3 font-medium text-accent">
                      {row.name}
                    </th>
                    <td className="py-3 pr-3 text-fg/90">{row.hallmark}</td>
                    <td className="py-3 text-muted">{row.next}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The three loaves people confuse
          </h2>
          <div className="mt-6 grid gap-3">
            <Band
              title="Under-fermented"
              body="The gluten net is intact and unused. You can still save the next bake by giving bulk the hours the matrix calls for — or by raising dough temperature so those hours fit a weekday. Do not add water to “open it up.” Under-fermented high hydration is how you get fool’s crumb."
            />
            <Band
              title="Over-fermented"
              body="The net digested itself. Acid and time thinned the walls; oven spring has nothing to push against. Shorter bulk, cooler DDT, or less starter. A late levain already spent part of the window in the jar — the matrix’s late factor (0.88×) exists for this."
            />
            <Band
              title="Fool’s crumb"
              body="The loaf is under-fermented in the mass and over-sprung at the skin. Big holes are a leak, not a goal. Finish bulk until the dough is aerated throughout, fold to stack layers without knocking the gas out, and proof until a floured finger springs back slowly. Then the ear is structure, not a blister over a cave."
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
                the ambient temp vs. starter % matrix
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
            Open the engine
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Set flour, hydration, temp, and starter. Bake the window, not the
            photo.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            DoughMatrix on the homepage is the bench tool behind this table:
            true hydration against the flour ceiling, temperature-decay bulk,
            and DDT water — so the next crumb matches the diagnosis you just
            made.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 text-base font-medium text-inverse shadow-[0_0_0_1px_rgb(229_169_98_/_0.4)] hover:bg-accent-hover"
          >
            Open the hydration calculator
            <ArrowRight className="size-4" />
          </Link>
        </aside>
      </article>

      <div className="mx-auto max-w-3xl px-4 pb-16">
        <GuidesFooter />
      </div>
    </div>
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

function Logo() {
  return (
    <svg viewBox="0 0 40 40" className="size-10 shrink-0 text-accent" aria-hidden>
      <circle
        cx="20"
        cy="21"
        r="13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12.5 18c3.5-6 8-9 14-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M18 11.5c1.2 4.5.2 9-1.5 13.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
