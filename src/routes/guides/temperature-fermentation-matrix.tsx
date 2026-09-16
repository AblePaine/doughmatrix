import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  BULK_INOC_REF,
  BULK_T_REF_C,
  BULK_T_REF_HOURS,
  BULK_TAU_C,
  bulkWindow,
  formatHours,
} from "@/lib/sourdough/math";
import { cn } from "@/lib/utils";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const TITLE =
  "The Ambient Temp vs. Starter % Matrix: How to Predict Bulk Fermentation to the Hour";

const DESCRIPTION =
  "Bulk time is a temperature-decay curve, not a kitchen timer. Use DoughMatrix’s ambient-temp vs. starter-% matrix and the 4-factor DDT formula to land bulk to the hour.";

const TEMPS_C = [18, 20, 22, 24, 26, 28, 30] as const;
const INOCS = [0.1, 0.15, 0.2, 0.25, 0.3] as const;

export const Route = createFileRoute("/guides/temperature-fermentation-matrix")({
  component: TempMatrixGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/temperature-fermentation-matrix",
      image: OG_IMAGES.temp,
    }),
});

function TempMatrixGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          The Ambient Temp vs. Starter % Matrix: How to Predict Bulk
          Fermentation to the Hour
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          “Bulk until it looks ready” is how you miss dinner. Yeast and lactic
          acid bacteria double on a clock. Temperature sets the clock. Inoculation
          sets how many clocks you started.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            A 20% inoculation at 24°C with a peak levain is DoughMatrix’s
            reference: five hours to the window. Drop the room to 18°C and that
            same dough wants a little over eight. Cut the starter in half at 24°C
            and you have doubled the wait. The matrix below is that curve, not a
            vibe.
          </p>
          <p>
            Starter percent here is{" "}
            <strong className="font-medium text-fg">
              levain weight over bowl flour
            </strong>
            , the baker’s inoculation, not a share of total dough. A 100 g starter
            on 500 g flour is 20% — the same 20% that anchors the table.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The decay equation
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Bulk center time follows a Q10-style doubling interval of{" "}
            {BULK_TAU_C}°C in the 18–30°C band:
          </p>
          <div className="mt-6 rounded-lg bg-card p-4 shadow-[0_0_0_1px_var(--color-border)] sm:p-5">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              Calibrated bulk window
            </p>
            <p className="mt-3 font-sans text-base leading-relaxed text-fg sm:text-lg">
              t(T) = {BULK_T_REF_HOURS.toFixed(1)}h · 2
              <sup>
                (({BULK_T_REF_C} − T) / {BULK_TAU_C})
              </sup>{" "}
              · (20% / inoc) · maturity
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Reference: {BULK_T_REF_HOURS.toFixed(1)} hours at {BULK_T_REF_C}°C
              with {Math.round(BULK_INOC_REF * 100)}% peak levain. The usable
              window is ±18% around that center — dough feel and starter vigor
              still matter, but they no longer get to invent the hour.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Ambient temp vs. starter %
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Hours to end of bulk at peak levain. Gold cell is the 5.0 h
            reference. Read down to add starter, read right to warm the dough.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <caption className="sr-only">
                Bulk fermentation hours by dough temperature and starter
                inoculation
              </caption>
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-faint uppercase">
                  <th className="sticky left-0 bg-bg py-3 pr-3 text-left font-medium">
                    Dough °C
                  </th>
                  {INOCS.map((inoc) => (
                    <th
                      key={inoc}
                      className="py-3 px-2 text-right font-medium tabular-nums"
                    >
                      {Math.round(inoc * 100)}%
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TEMPS_C.map((tempC) => (
                  <tr key={tempC} className="border-b border-border/70 last:border-0">
                    <th className="sticky left-0 bg-bg py-3 pr-3 text-left font-medium text-fg">
                      {tempC}°
                    </th>
                    {INOCS.map((inoc) => {
                      const hours = bulkWindow({
                        tempC,
                        inoculation: inoc,
                        maturity: "peak",
                      }).targetH;
                      const isRef =
                        tempC === BULK_T_REF_C && inoc === BULK_INOC_REF;
                      return (
                        <td
                          key={inoc}
                          className={cn(
                            "py-3 px-2 text-right tabular-nums",
                            isRef
                              ? "rounded-sm bg-accent-dim font-medium text-accent"
                              : "text-fg/90",
                          )}
                        >
                          {formatHours(hours)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Columns are starter as a percent of bowl flour. A 20°C kitchen at
            10% inoculation is a 13h 51m bulk — overnight, not “a little slow.”
            The same dough at 30% and 26°C is a 2h 50m sprint. Pick the cell
            that matches the clock you actually have.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            How to hit a clock
          </h2>
          <div className="mt-4 space-y-4 leading-relaxed text-fg/90">
            <p>
              Want five hours in a 20°C kitchen? Temperature alone stretches the
              reference by ~1.39×. You need roughly 28% starter, not 20%, to put
              the center back on five hours. DoughMatrix solves this live when
              you bump dough temp and starter weight.
            </p>
            <p>
              <strong className="font-medium text-fg">Warm kitchen, small starter.</strong>{" "}
              10% at 28°C is still about 7 hours — not a crash. Under-inoculating
              is a valid schedule, not a defect, as long as you own the hour.
            </p>
            <p>
              <strong className="font-medium text-fg">Cold kitchen, big starter.</strong>{" "}
              30% at 18°C lands near 5h 30m. That is how you keep a weekday bake
              when the house sits at 68°F.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Maturity still moves the window
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            The matrix assumes a peak levain. Young and late cultures scale the
            whole table:
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            <Band
              title="Young · 1.22×"
              body="Just doubled, still sweet. Bulk runs ~22% longer. Use when the jar is early and you can wait."
            />
            <Band
              title="Peak · 1.00×"
              body="Domed, just starting to fall. This is the matrix. Mix here unless you have a reason not to."
            />
            <Band
              title="Late · 0.88×"
              body="Acidic, receded. Bulk runs ~12% faster and tastes sharper. Fine for rye and country loaves."
            />
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            DDT: the water that makes the matrix true
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Ambient air is not dough temperature. Friction from mixing, flour
            from a cold pantry, and a warm levain all shift the mix. Desired
            dough temperature (DDT) is the number the matrix actually uses.
            DoughMatrix solves the 4-factor water temperature so the dough lands
            on the cell you picked:
          </p>
          <div className="mt-6 rounded-lg bg-card p-4 shadow-[0_0_0_1px_var(--color-border)] sm:p-5">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              4-factor DDT
            </p>
            <p className="mt-3 font-sans text-base leading-relaxed text-fg sm:text-lg">
              T<sub>water</sub> = 4 · DDT − T<sub>flour</sub> − T<sub>room</sub>{" "}
              − T<sub>starter</sub> − friction
            </p>
            <dl className="mt-5 grid gap-3 sm:grid-cols-3">
              <Stat label="Target DDT" value="24°C" hint="Matrix reference row" />
              <Stat label="Flour / room / starter" value="21 / 22 / 23°C" hint="Engine defaults" />
              <Stat label="Friction" value="1°C" hint="Hand mix, light" />
            </dl>
            <p className="mt-4 font-display text-lg text-accent">
              Water at 29°C → 4×24 − 21 − 22 − 23 − 1
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Mixer friction is higher (often 4–8°C). If the solved water
              temperature drops below fridge temp, you need ice or a cooler
              room — the algebra is telling you the matrix cell is unreachable
              from this kitchen. If it climbs past ~40°C you will shock the
              culture; lower DDT or mix gentler instead.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Folds ride the same clock
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            DoughMatrix packs coil folds into the first 40% of bulk, capped at
            two hours: every 40 minutes at ≤21°C, every 30 in the middle, every
            25 at ≥27°C. A 3-hour warm bulk does not get six folds. A 10-hour
            cool bulk does not get twelve. The matrix sets the hour; fold
            spacing follows.
          </p>
        </section>

        <p className="mt-10 text-sm leading-relaxed text-muted">
          Hydration is a different failure mode. If the dough is a puddle before
          bulk even starts, read{" "}
          <Link
            to="/guides/flour-hydration-ceiling"
            className="text-accent hover:text-accent-hover"
          >
            The flour hydration ceiling
          </Link>
          .
        </p>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the engine
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Set dough temp and starter. Read the bulk window to the hour.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The DoughMatrix sourdough engine is this matrix, live:
            temperature-decay bulk, maturity, fold spacing, and DDT water —
            updated as you bump the paddles.
          </p>
          <Link
            to="/engines/sourdough"
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 text-base font-medium text-inverse shadow-[0_0_0_1px_rgb(229_169_98_/_0.4)] hover:bg-accent-hover"
          >
            Open the hydration calculator
            <ArrowRight className="size-4" />
          </Link>
        </aside>
      </article>
    </GuideShell>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-md bg-inset px-3 py-3">
      <dt className="text-xs tracking-wide text-faint uppercase">{label}</dt>
      <dd className="mt-1 font-display text-2xl text-fg">{value}</dd>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}

function Band({ title, body }: { title: string; body: string }) {
  return (
    <li className="rounded-lg bg-card p-4 shadow-[0_0_0_1px_var(--color-border)]">
      <p className="text-sm font-medium text-fg">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </li>
  );
}
