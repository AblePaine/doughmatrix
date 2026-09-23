import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { socialHead } from "@/lib/og/meta";

const TITLE = "Preferments Compared: Poolish, Biga, and Levain";

const DESCRIPTION =
  "Exact ratios and fermentation times for poolish, biga, and levain — and when each one belongs in a home bake.";

export const Route = createFileRoute("/guides/preferments-poolish-biga-levain")({
  component: PrefermentsGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/preferments-poolish-biga-levain",
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function PrefermentsGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Preferments Compared: Poolish, Biga, and Levain
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          A preferment is a piece of the dough mixed hours earlier so flavor and
          extensibility show up before the final mix. Three workhorses cover
          almost every home bake: poolish, biga, and levain. They are not
          interchangeable. The hydration, the yeast level, and the clock are
          different.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The three, side by side
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Poolish, biga, and levain compared by hydration, leavening, and
                ferment time
              </caption>
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-faint uppercase">
                  <th className="py-3 pr-3 font-medium"> </th>
                  <th className="py-3 pr-3 font-medium">Poolish</th>
                  <th className="py-3 pr-3 font-medium">Biga</th>
                  <th className="py-3 font-medium">Levain (sourdough)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">Hydration</td>
                  <td className="py-3 pr-3 text-muted">
                    100% (equal flour and water)
                  </td>
                  <td className="py-3 pr-3 text-muted">50–60%</td>
                  <td className="py-3 text-muted">
                    Usually 100%; 80% if you want it stiffer
                  </td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">Leavening</td>
                  <td className="py-3 pr-3 text-muted">
                    Instant or fresh yeast, 0.1–0.3% of preferment flour
                  </td>
                  <td className="py-3 pr-3 text-muted">
                    Instant yeast, 0.1–0.2% of preferment flour
                  </td>
                  <td className="py-3 text-muted">
                    Ripe sourdough starter, typically 10–20% of levain flour
                  </td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">Texture</td>
                  <td className="py-3 pr-3 text-muted">Batter</td>
                  <td className="py-3 pr-3 text-muted">Stiff dough</td>
                  <td className="py-3 text-muted">Batter or soft dough</td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">Ripe when</td>
                  <td className="py-3 pr-3 text-muted">
                    Domed, bubbly, just starting to recede
                  </td>
                  <td className="py-3 pr-3 text-muted">
                    Doubled, webbed inside, sweet-nutty smell
                  </td>
                  <td className="py-3 text-muted">
                    Doubled, domed, passes a float test
                  </td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">
                    Typical ferment
                  </td>
                  <td className="py-3 pr-3 text-muted">12–16 h at 70–75°F</td>
                  <td className="py-3 pr-3 text-muted">12–16 h at 65–70°F</td>
                  <td className="py-3 text-muted">
                    4–6 h at 76–78°F, or overnight at 70°F with a smaller
                    inoculation
                  </td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">Flavor</td>
                  <td className="py-3 pr-3 text-muted">
                    Mild dairy, slight acidity
                  </td>
                  <td className="py-3 pr-3 text-muted">Nutty, low acid</td>
                  <td className="py-3 text-muted">
                    Lactic and/or acetic, depending on temp and stiffness
                  </td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg">Best for</td>
                  <td className="py-3 pr-3 text-muted">
                    Baguettes, pizza, ciabatta
                  </td>
                  <td className="py-3 pr-3 text-muted">
                    Country loaves that need strength, some pizza
                  </td>
                  <td className="py-3 text-muted">Any wild-yeast bread</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 leading-relaxed text-fg/90">
            Hydration here is water ÷ flour inside the preferment. Final-dough
            hydration is a separate number. Standard practice folds preferment
            flour and water into the total baker’s percentages. If a calculator
            lists “dough hydration” excluding starter water, the printed number
            will read lower. Pick a convention and do not mix them in one
            formula.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Poolish: 100% hydration, tiny yeast
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Formula for a poolish that feeds a 1 kg flour bake at 30%
            prefermented flour:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-fg/90">
            <li>Flour: 300 g</li>
            <li>Water: 300 g</li>
            <li>Instant yeast: 0.3–0.6 g (0.1–0.2% of the 300 g)</li>
          </ul>
          <p className="mt-4 leading-relaxed text-fg/90">
            Stir until no dry flour remains. Cover. At 72°F it is ready in
            12–14 hours. At 75°F, check at 10. When the center wrinkles and the
            dome sags 2–3 mm, use it within an hour.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Poolish makes dough extensible. That is why it shows up in baguettes
            and in pizza that needs to stretch without snapping back. It does
            not add much acid. If you want sour, this is the wrong preferment.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Final mix: subtract the 300 g flour and 300 g water from the total
            formula. Add salt only in the final dough (2–2.2%).
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Biga: stiff, cool, strong
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Formula for the same 30% prefermented flour on 1 kg total flour:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-fg/90">
            <li>Flour: 300 g</li>
            <li>Water: 165 g (55%)</li>
            <li>Instant yeast: 0.3–0.45 g</li>
          </ul>
          <p className="mt-4 leading-relaxed text-fg/90">
            Mix until it just comes together. It will look unfinished. That is
            correct. Ferment 12–16 hours at 65–68°F — a cool counter or the
            warmest shelf in the fridge. A 75°F kitchen will push a biga too far
            by morning.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Ripe biga is doubled, dry-skinned, and webbed when you tear it. It
            smells like toasted grain, not vinegar.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Biga adds strength. Use it when the final dough is high hydration
            and keeps slumping, or when you want a chewier crumb without more
            mixing. Italian-style pizza at 65–68% often runs a 20–30% biga.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            To incorporate: cut the biga into walnut pieces and mix them with
            the final water first so they slacken, then add flour.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Levain: the wild-yeast preferment
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            A levain is a sourdough starter built for a specific bake. It is not
            the jar in the fridge. You take some starter and feed it so it peaks
            when you mix.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Typical build, 100% hydration, ready in 4–5 hours at 77°F:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-fg/90">
            <li>Ripe starter: 20 g</li>
            <li>Flour: 100 g (or 80 g bread + 20 g whole rye for extra activity)</li>
            <li>Water: 100 g at 80°F</li>
          </ul>
          <p className="mt-4 leading-relaxed text-fg/90">
            Inoculation is 20% of the levain flour (20 g on 100 g). Halve the
            inoculation and it will take 8–10 hours — useful for an overnight
            build.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            A stiff levain at 80% hydration (100 g flour, 80 g water) runs cooler
            in flavor and gives the final dough more muscle. Use it for
            rye-heavy loaves or when a 100% levain makes the dough too slack.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            When the levain has doubled and a spoonful floats, mix. Past peak by
            two hours, it still works but the bake will be more acidic and the
            rise a little weaker.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Final-dough inoculation is commonly 15–25% of total flour as ripe
            levain. Twenty percent of 1000 g flour is 200 g levain.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Which one to reach for
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-fg/90">
            <li>Same-day flavor on commercial yeast: poolish, 12 hours, 20–30% of flour.</li>
            <li>
              Need a dough that can hold a high hydration without extra folds:
              biga, 55%, cool overnight.
            </li>
            <li>No commercial yeast, or you want acidity: levain.</li>
            <li>
              Pizza on a steel this weekend: poolish or a small biga. Save
              levain for when you want tang.
            </li>
          </ul>
          <p className="mt-4 leading-relaxed text-fg/90">
            Do not stack all three in one dough unless you like chaos. One
            preferment, one job.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            One pizza weekend, two preferments not three
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Friday 8:00 p.m.: mix a poolish of 200 g flour, 200 g water, 0.3 g
            instant yeast. Saturday 10:00 a.m. it should be domed. Mix a 70%
            dough on 400 g more flour using that poolish as the entire water +
            200 g of the flour. Cold ball 24 hours. Sunday steel at 550°F.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            If you wanted sour instead, skip the poolish and build a levain
            Friday night at 1:5:5 so it peaks Saturday evening, then mix and
            cold ball. Do not run poolish and levain in the same dough unless
            you have a reason to write down.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Key numbers
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-fg/90">
            <li>Poolish: 100% hydration, 0.1–0.2% instant yeast, 12–16 h at 70–75°F.</li>
            <li>Biga: 50–60% hydration, 0.1–0.2% yeast, 12–16 h at 65–70°F.</li>
            <li>Levain build: 100% hydration, 10–20% starter inoculation, 4–6 h at 76–78°F.</li>
            <li>
              Prefermented flour: 20–30% of total flour for yeasted doughs;
              levain often 15–25% of total flour.
            </li>
            <li>Always add salt in the final dough, not in the preferment.</li>
          </ul>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Build the levain to peak at mix time, not 2 a.m.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The sourdough calculator’s starter feeding and peak timing does
            exactly this math: pick the ratio and room temp that land your
            levain ready when you mix.
          </p>
          <Link
            to="/engines/sourdough"
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 text-base font-medium text-inverse shadow-[0_0_0_1px_rgb(229_169_98_/_0.4)] hover:bg-accent-hover"
          >
            Open the levain calculator
            <ArrowRight className="size-4" />
          </Link>
        </aside>
      </article>
    </GuideShell>
  );
}
