import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const H1 =
  "Autolyse vs. Fermentolyse: When to Rest Your Dough — and When to Skip It";

const TITLE = "Autolyse vs. Fermentolyse | DoughMatrix";

const DESCRIPTION =
  "Should you rest flour and water before adding starter? It depends on the flour. Here's when an autolyse or fermentolyse helps — and when it turns your dough to soup.";

const ROWS = [
  {
    process: "Skip",
    bowl: "Flour, water, levain, salt — one mix",
    protease: "Just the mixing",
    ph: "Stays where the flour is",
    window: "0 min",
    use: "Rye, 00 pizza, stiff bagels, already-slack AP",
    skip: "—",
  },
  {
    process: "Autolyse",
    bowl: "Flour + water. Levain and salt out.",
    protease: "The flour's own enzymes, no acid yet",
    ph: "~6.0–6.2 (flour)",
    window: "20–45 min",
    use: "Strong patent bread flour, baguettes, wet country",
    skip: "Whole grain, high extraction, weak AP",
  },
  {
    process: "Long autolyse",
    bowl: "Flour + water, often cold",
    protease: "Hours of softening, nothing holding it back",
    ph: "Slow, still near flour",
    window: "2–12 h (cold)",
    use: "Very strong hi-gluten, rare",
    skip: "Almost every home bag; never warm overnight",
  },
  {
    process: "Fermentolyse",
    bowl: "Flour + water + levain. Salt out.",
    protease: "Enzymes plus starter acid",
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
          An autolyse is just flour and water, resting. Add your starter to the
          rest and it's a fermentolyse — the acid in the starter softens the
          dough faster. Skip both when your flour can't afford to lose any
          strength.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            The classic autolyse (Professor Calvel's idea) is flour and water,
            nothing else. As the flour hydrates, the gluten relaxes just enough
            that you skip a long mix. Salt stays out because salt tightens
            everything back up. Starter stays out because its acid speeds the
            softening.
          </p>
          <p>
            A fermentolyse puts the starter in the rest. You get a head start on
            flavor and a stretchier dough — but bulk starts early too. Ninety
            minutes of "rest" on a high-extraction flour, with all that acid
            working, is how a strong dough turns to soup.
          </p>
          <p>
            The{" "}
            <Link
              to="/guides/flour-hydration-ceiling"
              className="text-accent hover:text-accent-hover"
            >
              flour hydration ceiling
            </Link>{" "}
            still wins. No rest can create gluten the mill didn't put in the
            bag. Check the{" "}
            <Link to="/flours" className="text-accent hover:text-accent-hover">
              Flour Index
            </Link>{" "}
            before you start a timer.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Which rest fits your flour
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Pick one rest. Don't stack a long autolyse and a fermentolyse. The
            dough only has so much gluten to give.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Skip, autolyse, and fermentolyse compared: what's in the bowl,
                how long, and when to use each
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
            Three rules that keep you out of trouble
          </h2>
          <ol className="mt-6 space-y-5">
            <li className="rounded-lg bg-card p-5 shadow-[0_0_0_1px_var(--color-border)]">
              <p className="text-xs font-medium tracking-wide text-accent uppercase">
                1 · Flour first
              </p>
              <p className="mt-2 leading-relaxed text-fg/90">
                Time the rest to the bag, not the blog. Strong bread flour
                (King Arthur bread, ABC Plus, Peak Performer): 20–45 min
                autolyse. High-extraction and whole wheat: 15–20 min or skip —
                the bran is already cutting the gluten. Rye: skip. Tipo 00
                pizza: skip or under 15 min. Look up your bag in the Flour
                Index before you start a timer.
              </p>
            </li>
            <li className="rounded-lg bg-card p-5 shadow-[0_0_0_1px_var(--color-border)]">
              <p className="text-xs font-medium tracking-wide text-accent uppercase">
                2 · Acid is the accelerator
              </p>
              <p className="mt-2 leading-relaxed text-fg/90">
                A fermentolyse turns the acid up right away, and acid softens
                dough faster. Thirty minutes on bread flour: a useful tool.
                Ninety minutes on Type 82: soup. Never run a long autolyse and
                then a fermentolyse — pick one rest. If the starter is late and
                already sour, shorten the rest or skip it. The acid is already
                in the jar.
              </p>
            </li>
            <li className="rounded-lg bg-card p-5 shadow-[0_0_0_1px_var(--color-border)]">
              <p className="text-xs font-medium tracking-wide text-accent uppercase">
                3 · Salt is the brake — skip if it is already slack
              </p>
              <p className="mt-2 leading-relaxed text-fg/90">
                Salt firms the gluten back up and slows the softening, so hold it
                until the rest is over. If the dough is already slack the
                moment you touch it — wet mix, weak flour, rye blend — there
                is nothing left to relax. Just mix it, salt it, build strength,
                fold. Resting a puddle is just waiting.
              </p>
            </li>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            How the calculator handles it
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            The sourdough calculator holds back about 8% of the water as a
            reserve, rests the flour with the rest, then mixes in the levain,
            salt, and reserve together. That's a short autolyse — the acid and
            salt arrive at mix time, not during the rest. If you'd rather do a
            fermentolyse, add the levain at the rest and hold the salt for the
            mix — and keep it to 20–40 min on bread flour.
          </p>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Set the flour. Time the rest. Mix the reserve, levain, and salt
            together.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The rest and the reserve water are on your timeline. The ceiling and
            bulk times still follow the flour you picked.
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
