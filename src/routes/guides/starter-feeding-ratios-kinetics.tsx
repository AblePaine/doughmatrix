import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BULK_T_REF_C, BULK_TAU_C, formatGrams, formatHours } from "@/lib/sourdough/math";
import { cn } from "@/lib/utils";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const TITLE =
  "Feeding Your Starter: Ratios and Peak Timing";

const DESCRIPTION =
  "Peak is a clock, not a vibe. Pick the feeding ratio and room temp that land your starter's peak at mix time — not two hours early, not collapsed.";

/** 1:2:2 at 24°C — same 5.0 h reference the engine uses for a peak levain. */
const PEAK_REF_H = 5.0;
const RATIO_REF = 2;
const TEMPS_C = [18, 20, 22, 24, 26, 28, 30] as const;
const RATIOS = [1, 2, 3, 5, 10] as const;

function peakHours(tempC: number, flourParts: number) {
  const tempFactor = Math.pow(2, (BULK_T_REF_C - tempC) / BULK_TAU_C);
  return PEAK_REF_H * tempFactor * (flourParts / RATIO_REF);
}

function scaleLevain(needG: number, flourParts: number, waterParts: number) {
  const total = 1 + flourParts + waterParts;
  return {
    seed: needG / total,
    flour: (needG * flourParts) / total,
    water: (needG * waterParts) / total,
  };
}

const SCALE_1_2_2 = scaleLevain(100, 2, 2);
const SCALE_1_5_5 = scaleLevain(150, 5, 5);

export const Route = createFileRoute("/guides/starter-feeding-ratios-kinetics")({
  component: StarterKineticsGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/starter-feeding-ratios-kinetics",
      image: OG_IMAGES.starter,
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function StarterKineticsGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Feeding Your Starter: Ratios and Peak Timing
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          A starter that peaks at 2 a.m. is a scheduling error, not a
          personality trait. The same clock that runs bulk runs the jar.
          Feeding ratio decides how much food each cell gets. Temperature
          decides how fast they eat it.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            The calculator's mix card builds a{" "}
            <strong className="font-medium text-fg">1:2:2 levain</strong> (seed :
            flour : water) sized to the mix, and assumes it's at peak when you
            mix. That 1:2:2 at 24°C is five hours — the same five-hour
            reference as a 20% bulk. Miss the peak and you didn't "use a young
            starter." You moved the bulk window.
          </p>
          <p>
            Read it as: <strong className="font-medium text-fg">1:n:n</strong>{" "}
            means 1 part ripe starter, n parts flour, n parts water, at 100%
            hydration. A 1:1:1 is a short fuse. A 1:5:5 is an overnight build.
            Peak looks like this: doubled (or a little more), domed on top,
            webbed inside — just before it falls.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            When will it peak?
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Hours to peak — same timing as bulk. Warmer jar goes faster,
            more food per starter goes slower:
          </p>
          <div className="mt-6 rounded-lg bg-card p-4 shadow-[0_0_0_1px_var(--color-border)] sm:p-5">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              Time to peak
            </p>
            <p className="mt-3 font-sans text-base leading-relaxed text-fg sm:text-lg">
              t(T, n) = {PEAK_REF_H.toFixed(1)}h · 2
              <sup>
                (({BULK_T_REF_C} − T) / {BULK_TAU_C})
              </sup>{" "}
              · (n / {RATIO_REF})
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Reference: {PEAK_REF_H.toFixed(1)} hours at {BULK_T_REF_C}°C with
              a 1:2:2 feeding. n is the flour (and water) parts. Double the
              food per seed and you double the wait. Drop {BULK_TAU_C}°C and
              you double it again.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The table: temp vs. feeding ratio
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Hours from feed to peak at 100% hydration. Gold cell is the 5.0 h
            1:2:2 reference. Read down for more food per seed, right for a
            warmer jar.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <caption className="sr-only">
                Hours to starter peak by jar temperature and feeding ratio
              </caption>
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-faint uppercase">
                  <th className="sticky left-0 bg-bg py-3 pr-3 text-left font-medium">
                    Jar °C
                  </th>
                  {RATIOS.map((n) => (
                    <th
                      key={n}
                      className="px-2 py-3 text-right font-medium tabular-nums"
                    >
                      1:{n}:{n}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TEMPS_C.map((tempC) => (
                  <tr
                    key={tempC}
                    className="border-b border-border/70 last:border-0"
                  >
                    <th className="sticky left-0 bg-bg py-3 pr-3 text-left font-medium text-fg">
                      {tempC}°
                    </th>
                    {RATIOS.map((n) => {
                      const hours = peakHours(tempC, n);
                      const isRef = tempC === BULK_T_REF_C && n === RATIO_REF;
                      return (
                        <td
                          key={n}
                          className={cn(
                            "px-2 py-3 text-right tabular-nums",
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
            A 1:1:1 at 24°C is 2h 30m — useful before a late mix, useless if you
            feed at bedtime. A 1:5:5 at 22°C is about 14h 30m: feed at 8 p.m.,
            mix at 10:30 a.m. A 1:10:10 at 18°C is a 32-hour culture, not a
            levain.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Building exactly what you need
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            You need a weight, not a guess. Size the jar to the mix, then pick
            the ratio that peaks at mix time. For a 1:n:n build at 100%
            hydration:
          </p>
          <div className="mt-6 rounded-lg bg-card p-4 shadow-[0_0_0_1px_var(--color-border)] sm:p-5">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              To build W grams
            </p>
            <ul className="mt-3 space-y-2 font-sans text-base leading-relaxed text-fg sm:text-lg">
              <li>seed = W / (1 + 2n)</li>
              <li>flour = n · W / (1 + 2n)</li>
              <li>water = n · W / (1 + 2n)</li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Total parts = 1 + 2n. In plain English: divide your target
              weight by the total parts, then multiply by each part. The
              calculator's mix card is n = 2 (1:2:2): starter is one-fifth of
              the levain you weigh into the dough.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Worked
              title="100 g · 1:2:2 · 24°C"
              lines={[
                `Seed ${formatGrams(SCALE_1_2_2.seed)} g`,
                `Flour ${formatGrams(SCALE_1_2_2.flour)} g`,
                `Water ${formatGrams(SCALE_1_2_2.water)} g`,
                `Peak ~${formatHours(peakHours(24, 2))}`,
              ]}
              note="Calculator default. Feed five hours before mix in a 24°C room."
            />
            <Worked
              title="150 g · 1:5:5 · 22°C"
              lines={[
                `Seed ${formatGrams(SCALE_1_5_5.seed, 1)} g`,
                `Flour ${formatGrams(SCALE_1_5_5.flour)} g`,
                `Water ${formatGrams(SCALE_1_5_5.water)} g`,
                `Peak ~${formatHours(peakHours(22, 5))}`,
              ]}
              note="Overnight build. Less seed, more food, same 150 g at mix."
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Peak, then bulk
          </h2>
          <div className="mt-4 space-y-4 leading-relaxed text-fg/90">
            <p>
              Mix at peak and the{" "}
              <Link
                to="/guides/temperature-fermentation-matrix"
                className="text-accent hover:text-accent-hover"
              >
                bulk fermentation guide
              </Link>{" "}
              is honest. Mix before the peak and the calculator stretches
              bulk by 1.22×. Mix after it has fallen and bulk compresses by
              0.88× — acid already spent part of the window in the jar.
            </p>
            <p>
              Do not “just add more starter” to cover a collapsed jar. That
              changes the starter amount and bulk together. Rebuild, or own
              the late-starter factor on purpose.
            </p>
          </div>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Size the levain to the mix. Feed so it peaks at mix, not at 2 a.m.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The sourdough calculator already scales a 1:2:2 build to your
            starter weight and estimates when it will be ready from dough
            temperature — then runs bulk from that peak.
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

function Worked({
  title,
  lines,
  note,
}: {
  title: string;
  lines: string[];
  note: string;
}) {
  return (
    <div className="rounded-lg bg-card p-4 shadow-[0_0_0_1px_var(--color-border)]">
      <p className="text-xs tracking-wide text-faint uppercase">{title}</p>
      <ul className="mt-3 space-y-1 text-sm text-fg">
        {lines.map((line) => (
          <li key={line} className="tabular-nums">
            {line}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-muted">{note}</p>
    </div>
  );
}
