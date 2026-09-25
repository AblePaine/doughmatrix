import { createFileRoute } from "@tanstack/react-router";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const TITLE = "Preferments Compared: Poolish, Biga, and Levain";

const DESCRIPTION =
  "Exact ratios and fermentation times for poolish, biga, and levain — and when each one belongs in a home bake.";

export const Route = createFileRoute("/guides/preferments-poolish-biga-levain")(
  {
    component: PrefermentsGuide,
    head: () =>
      socialHead({
        title: `${TITLE} — DoughMatrix`,
        description: DESCRIPTION,
        path: "/guides/preferments-poolish-biga-levain",
        image: OG_IMAGES.starter,
        cardTitle: TITLE,
        category: "FIELD GUIDE",
      }),
  },
);

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
          Poolish, biga, and levain are not interchangeable. The hydration,
          the yeast level, and the clock are all different. Pick one, feed it
          right, use it before it falls.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            A preferment is a piece of the dough mixed hours earlier so flavor
            and extensibility show up before the final mix. Three workhorses
            cover almost every home bake. They are not interchangeable — the
            hydration, the yeast level, and the clock are different.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The three, side by side
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Poolish, biga, and levain compared by hydration, leavening, and timing
              </caption>
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-faint uppercase">
                  <th className="py-3 pr-3 font-medium"></th>
                  <th className="py-3 pr-3 font-medium">Poolish</th>
                  <th className="py-3 pr-3 font-medium">Biga</th>
                  <th className="py-3 font-medium">Levain</th>
                </tr>
              </thead>
              <tbody>
                <CompareRow label="Hydration" pool="100% (equal flour and water)" biga="50–60%" levain="Usually 100%; 80% if you want it stiffer" />
                <CompareRow label="Leavening" pool="Instant or fresh yeast, 0.1–0.3% of preferment flour" biga="Instant yeast, 0.1–0.2% of preferment flour" levain="Ripe starter, typically 10–20% of levain flour" />
                <CompareRow label="Texture" pool="Batter" biga="Stiff dough" levain="Batter or soft dough" />
                <CompareRow label="Ripe when" pool="Domed, bubbly, just starting to recede" biga="Doubled, webbed inside, sweet-nutty smell" levain="Doubled, domed, passes a float test" />
                <CompareRow label="Typical ferment" pool="12–16 h at 70–75°F" biga="12–16 h at 65–70°F" levain="4–6 h at 76–78°F, or overnight at 70°F with a smaller inoculation" />
                <CompareRow label="Flavor" pool="Mild dairy, slight acidity" biga="Nutty, low acid" levain="Lactic and/or acetic, depending on temp and stiffness" />
                <CompareRow label="Best for" pool="Baguettes, pizza, ciabatta" biga="Country loaves that need strength, some pizza" levain="Any wild-yeast bread" />
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Hydration here is water ÷ flour inside the preferment; final-dough
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
            A poolish that feeds a 1 kg flour bake at 30% prefermented flour:
            300 g flour, 300 g water, 0.3–0.6 g instant yeast (0.1–0.2% of the
            300 g). Stir until no dry flour remains. Cover. At 72°F it is ready
            in 12–14 hours; at 75°F, check at 10. When the center wrinkles and
            the dome sags 2–3 mm, use it within an hour.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Poolish makes dough extensible — that is why it shows up in
            baguettes and in pizza that needs to stretch without snapping back.
            It does not add much acid. If you want sour, this is the wrong
            preferment.
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
            Same 30% prefermented flour on 1 kg total flour: 300 g flour, 165 g
            water (55%), 0.3–0.45 g instant yeast. Mix until it just comes
            together. It will look unfinished. That is correct. Ferment 12–16
            hours at 65–68°F — a cool counter or the warmest shelf in the
            fridge. A 75°F kitchen will push a biga too far by morning.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Ripe biga is doubled, dry-skinned, and webbed when you tear it. It
            smells like toasted grain, not vinegar.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Biga adds strength. Use it when the final dough is high hydration
            and keeps slumping, or when you want a chewier crumb without more
            mixing. Italian-style pizza at 65–68% often runs a 20–30% biga. To
            incorporate: cut the biga into walnut pieces and mix them with the
            final water first so they slacken, then add flour.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Levain: the wild-yeast preferment
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            A levain is a sourdough starter built for a specific bake. It is
            not the jar in the fridge. You take some starter and feed it so it
            peaks when you mix.
          </p>
          <div className="mt-6 rounded-lg bg-card p-4 shadow-[0_0_0_1px_var(--color-border)] sm:p-5">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              A quick example
            </p>
            <p className="mt-3 font-display text-xl text-fg">
              Ripe starter 20 g · flour 100 g · water 100 g at 80°F
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              100% hydration, ready in 4–5 hours at 77°F. Inoculation is 20% of
              the levain flour. Halve the inoculation and it will take 8–10
              hours — useful for an overnight build. Try 80 g bread flour + 20 g
              whole rye for extra activity.
            </p>
          </div>
          <p className="mt-4 leading-relaxed text-fg/90">
            A stiff levain at 80% hydration (100 g flour, 80 g water) runs
            cooler in flavor and gives the final dough more muscle. Use it for
            rye-heavy loaves, or when a 100% levain makes the dough too slack.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            When the levain has doubled and a spoonful floats, mix. Past peak
            by two hours it still works, but the bake will be more acidic and
            the rise a little weaker. Final-dough inoculation is commonly
            15–25% of total flour as ripe levain — 200 g levain on 1,000 g
            flour.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Which one to reach for
          </h2>
          <ul className="mt-4 space-y-3 leading-relaxed text-fg/90">
            <li>
              <strong className="font-medium text-fg">
                Same-day flavor on commercial yeast:
              </strong>{" "}
              poolish, 12 hours, 20–30% of flour.
            </li>
            <li>
              <strong className="font-medium text-fg">
                A dough that must hold high hydration without extra folds:
              </strong>{" "}
              biga, 55%, cool overnight.
            </li>
            <li>
              <strong className="font-medium text-fg">
                No commercial yeast, or you want acidity:
              </strong>{" "}
              levain.
            </li>
            <li>
              <strong className="font-medium text-fg">
                Pizza on a steel this weekend:
              </strong>{" "}
              poolish or a small biga. Save levain for when you want tang.
            </li>
          </ul>
          <p className="mt-4 leading-relaxed text-fg/90">
            Do not stack all three in one dough unless you like chaos. One
            preferment, one job.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            One pizza weekend, one preferment
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
            <li>
              Poolish: 100% hydration, 0.1–0.2% instant yeast, 12–16 h at
              70–75°F.
            </li>
            <li>
              Biga: 50–60% hydration, 0.1–0.2% yeast, 12–16 h at 65–70°F.
            </li>
            <li>
              Levain build: 100% hydration, 10–20% starter inoculation, 4–6 h
              at 76–78°F.
            </li>
            <li>
              Prefermented flour: 20–30% of total flour for yeasted doughs;
              levain often 15–25% of total flour.
            </li>
            <li>Always add salt in the final dough, not in the preferment.</li>
          </ul>
        </section>
      </article>
    </GuideShell>
  );
}

function CompareRow({
  label,
  pool,
  biga,
  levain,
}: {
  label: string;
  pool: string;
  biga: string;
  levain: string;
}) {
  return (
    <tr className="border-b border-border/70 last:border-0">
      <th
        scope="row"
        className="py-3 pr-3 align-top font-medium whitespace-nowrap text-fg"
      >
        {label}
      </th>
      <td className="py-3 pr-3 align-top text-muted">{pool}</td>
      <td className="py-3 pr-3 align-top text-muted">{biga}</td>
      <td className="py-3 align-top text-muted">{levain}</td>
    </tr>
  );
}
