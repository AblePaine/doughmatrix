import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const H1 =
  "Autolyse vs. Fermentolyse: Enzymatic Kinetics, Extensibility, and When to Skip It";

const TITLE = "Autolyse vs. Fermentolyse: Dough Kinetics & Timing | DoughMatrix";

const DESCRIPTION =
  "Biochemical breakdown of autolyse vs. fermentolyse. Learn how protease activity, pH drop, and flour choice dictate resting times for artisan bread.";

const ROWS = [
  {
    process: "Skip",
    bowl: "Flour, water, levain, salt — one mix",
    protease: "Mix shear only",
    ph: "No dedicated drop",
    window: "0 min",
    use: "Rye, 00 pizza, stiff bagels, already-slack AP",
    skip: "—",
  },
  {
    process: "Autolyse",
    bowl: "Flour + water. Levain and salt out.",
    protease: "Endogenous proteases, no acid yet",
    ph: "~6.0–6.2 (flour)",
    window: "20–45 min",
    use: "Strong patent bread flour, baguettes, wet country",
    skip: "Whole grain, high extraction, weak AP",
  },
  {
    process: "Long autolyse",
    bowl: "Flour + water, often cold",
    protease: "Unopposed, hours of hydrolysis",
    ph: "Slow, still near flour",
    window: "2–12 h (cold)",
    use: "Very strong hi-gluten, rare",
    skip: "Almost every home bag; never warm overnight",
  },
  {
    process: "Fermentolyse",
    bowl: "Flour + water + levain. Salt out.",
    protease: "Protease + LAB acid",
    ph: "Falls toward 5.2–4.5",
    window: "20–40 min",
    use: "Daily sourdough on bread flour",
    skip: "Rye, Type 82, young/slack levain, long warm bulk after",
  },
] as const;

export const Route = createFileRoute("/guides/autolyse-vs-fermentolyse")({
  component: AutolyseGuide,
  head: () =>
    socialHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/guides/autolyse-vs-fermentolyse",
      image: OG_IMAGES.autolyse,
      cardTitle: H1,
      category: "FIELD GUIDE",
    }),
});

function AutolyseGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          {H1}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Autolyse is not a personality. It is a timed protease rest. Add levain
          and you have fermentolyse — same enzymes, plus a pH drop that
          accelerates them. Skip both when the flour cannot spare the gluten.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            Calvel’s autolyse is flour and water, nothing else. Hydration lets
            glutenin and gliadin hydrate. Proteases nibble the network just
            enough that the dough becomes extensible without a long mix. Salt
            stays out because salt is the brake. Levain stays out because acid
            is the accelerator.
          </p>
          <p>
            Fermentolyse puts the levain in the rest. You buy speed and
            extensibility. You also start bulk before you meant to: lactic acid
            bacteria drop pH, proteases run hotter, and a 90-minute “autolyse”
            on a high-extraction bag is how a gluten net becomes soup.
          </p>
          <p>
            The{" "}
            <Link
              to="/guides/flour-hydration-ceiling"
              className="text-accent hover:text-accent-hover"
            >
              flour hydration ceiling
            </Link>{" "}
            still wins. A rest cannot invent gluten the mill did not put in the
            bag. Check the{" "}
            <Link to="/flours" className="text-accent hover:text-accent-hover">
              Flour Index
            </Link>{" "}
            before you set a timer.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Process selection matrix
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Pick one rest. Do not stack a long autolyse and a fermentolyse. The
            dough only has so much protein to hydrolyze.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Autolyse versus fermentolyse versus skip: bowl contents,
                protease driver, pH, window, and when to use
              </caption>
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-faint uppercase">
                  <th className="sticky left-0 bg-bg py-3 pr-3 font-medium">
                    Process
                  </th>
                  <th className="py-3 pr-3 font-medium">In the bowl</th>
                  <th className="py-3 pr-3 font-medium">Protease</th>
                  <th className="py-3 pr-3 font-medium">pH</th>
                  <th className="py-3 pr-3 font-medium">Window</th>
                  <th className="py-3 pr-3 font-medium">Use when</th>
                  <th className="py-3 font-medium">Skip when</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr
                    key={row.process}
                    className="border-b border-border/70 align-top last:border-0"
                  >
                    <th className="sticky left-0 bg-bg py-3 pr-3 font-medium text-fg">
                      {row.process}
                    </th>
                    <td className="py-3 pr-3 text-fg/90">{row.bowl}</td>
                    <td className="py-3 pr-3 text-fg/90">{row.protease}</td>
                    <td className="py-3 pr-3 tabular-nums text-fg/90">
                      {row.ph}
                    </td>
                    <td className="py-3 pr-3 tabular-nums text-accent">
                      {row.window}
                    </td>
                    <td className="py-3 pr-3 text-muted">{row.use}</td>
                    <td className="py-3 text-muted">{row.skip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Three golden rules
          </h2>
          <ol className="mt-6 space-y-5">
            <li className="rounded-lg bg-card p-5 shadow-[0_0_0_1px_var(--color-border)]">
              <p className="text-xs font-medium tracking-wide text-accent uppercase">
                1 · Flour first
              </p>
              <p className="mt-2 leading-relaxed text-fg/90">
                Time the rest to the bag, not the blog. Strong patent bread
                flour (KA bread, ABC Plus, Peak Performer): 20–45 min autolyse.
                High extraction and whole wheat: 15–20 min or skip — bran and
                ash already cut the net. Rye and pentosan doughs: skip. Tipo 00
                pizza: skip or under 15 min. Load the mill sheet from the Flour
                Index before you start a clock.
              </p>
            </li>
            <li className="rounded-lg bg-card p-5 shadow-[0_0_0_1px_var(--color-border)]">
              <p className="text-xs font-medium tracking-wide text-accent uppercase">
                2 · Acid is the accelerator
              </p>
              <p className="mt-2 leading-relaxed text-fg/90">
                Fermentolyse drops pH immediately. Proteases run faster in acid.
                A 30-minute fermentolyse on bread flour is a tool. A 90-minute
                fermentolyse on Type 82 is hydrolysis. Never run a long autolyse
                and then a fermentolyse. One rest. If the levain is late and
                already acidic, shorten the rest or skip it — the acid is
                already in the jar.
              </p>
            </li>
            <li className="rounded-lg bg-card p-5 shadow-[0_0_0_1px_var(--color-border)]">
              <p className="text-xs font-medium tracking-wide text-accent uppercase">
                3 · Salt is the brake — skip if it is already slack
              </p>
              <p className="mt-2 leading-relaxed text-fg/90">
                Salt tightens gluten and slows protease. Hold it until the rest
                ends. If the mix is already slack at first contact — hydration
                near the ceiling, weak AP, rye blend — there is nothing left to
                relax. Mix, salt, develop, fold. A rest on a puddle is just a
                wait.
              </p>
            </li>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            How DoughMatrix times it
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            The sourdough engine holds back ~8% of bowl water as a reserve,
            autolyses flour with the rest, then mixes levain, salt, and the
            reserve. That is a short autolyse, not a fermentolyse: acid and salt
            arrive together at mix. If you want fermentolyse, add the levain at
            the rest and keep salt for mix — and cut the rest to 20–40 min on
            bread flour.
          </p>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the engine
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Set the flour. Time the rest. Mix the reserve, levain, and salt
            together.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Autolyse water and reserve are on the timeline. Ceiling and bulk
            still follow the bag you loaded.
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
