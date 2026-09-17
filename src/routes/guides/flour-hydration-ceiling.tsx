import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { FLOURS } from "@/lib/sourdough/flours";
import type { FlourFamily } from "@/lib/sourdough/types";
import { cn } from "@/lib/utils";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const TITLE =
  "The Flour Hydration Ceiling: Why Your High-Hydration Sourdough Is a Sticky Puddle (And How to Fix It)";

const DESCRIPTION =
  "High-hydration sourdough fails when true water exceeds the flour’s ceiling — not because 80% is fashionable. Use absorption benchmarks, the danger light, and DoughMatrix to fix a slack mix.";

export const Route = createFileRoute("/guides/flour-hydration-ceiling")({
  component: FlourCeilingGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/flour-hydration-ceiling",
      image: OG_IMAGES.hydration,
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

const FAMILY_LABEL: Record<FlourFamily, string> = {
  white: "White",
  whole: "Whole grain",
  rye: "Rye",
  ancient: "Ancient",
  specialty: "Specialty",
};

const BENCHMARKS = FLOURS.filter((f) => f.id !== "custom");

function FlourCeilingGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          The Flour Hydration Ceiling: Why Your High-Hydration Sourdough Is a
          Sticky Puddle (And How to Fix It)
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Eighty percent hydration is not a personality. It is a load on a
          specific gluten net. Cross that flour’s ceiling and the dough stops
          being dough — it is a puddle with ambition.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            The internet sold a single number. Bake like Tartine, hold the dough
            like a cloud, score a ear. What it did not sell is that Chad
            Robertson’s country loaf sits on a strong bread-flour blend with a
            ceiling near 78%, while the bag of all-purpose in a home pantry tops
            out around 74% — and tipo 00, despite the protein on the label,
            often collapses above 70%.
          </p>
          <p>
            DoughMatrix treats that limit as a{" "}
            <strong className="font-medium text-fg">hydration ceiling</strong>:
            the true water-to-flour ratio at which the gluten sheet can no
            longer hold a skin. Below it, folds build tension. Four points under
            it, you are in the caution band. At or above it, the mix shears, the
            bench floods, and no amount of slap-and-fold will invent gluten the
            mill did not put in the bag.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            True hydration, not baker’s percent
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Baker’s percent is bowl water over bowl flour. That under-counts
            water and flour already sitting in the starter. A 100 g levain at
            1:1 (100% hydration) is 50 g flour and 50 g water. Those grams join
            the dough whether you write them down or not.
          </p>
          <div className="mt-6 rounded-lg bg-card p-4 shadow-[0_0_0_1px_var(--color-border)] sm:p-5">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              Worked example
            </p>
            <p className="mt-3 font-display text-xl text-fg">
              500 g flour · 350 g water · 100 g starter (1:1)
            </p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-3">
              <Stat label="Baker’s H" value="70.0%" hint="350 / 500" />
              <Stat
                label="True total H"
                value="72.7%"
                hint="400 water / 550 flour"
              />
              <Stat label="Bread-flour ceiling" value="78%" hint="+5.3 pt margin" />
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The 2.7-point gap is the starter. Ignore it and you will think a
              74% mix is “a little wet” when true hydration is already in the
              caution band on all-purpose.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The danger light
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Protein is a hint, not a passport. Ash, bran, mill extraction, and
            pentosans change how much water a flour can drink before the net
            fails. DoughMatrix maps true hydration onto three bands against the
            active flour’s ceiling:
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            <Band
              tone="safe"
              title="Safe"
              body="More than 4 points under the ceiling. The gluten net should hold. Mix, fold, and expect a skin."
            />
            <Band
              tone="caution"
              title="Caution"
              body="Inside 4 points of the ceiling. Slack, sticky, still recoverable with coil folds and a cooler bulk."
            />
            <Band
              tone="danger"
              title="Danger"
              body="At or above the ceiling. A sticky puddle. Add flour (and salt) or change the flour — do not keep folding."
            />
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Absorption benchmarks
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Sweet spot is where the loaf usually wants to live. Ceiling is
            where the mix stops being a loaf. Both are true-hydration numbers,
            starter included. Use them as a starting index — then match the bag
            in front of you.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Flour protein, sweet-spot hydration, and ceiling hydration
              </caption>
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-faint uppercase">
                  <th className="py-3 pr-3 font-medium">Flour</th>
                  <th className="py-3 pr-3 text-right font-medium tabular-nums">
                    Protein
                  </th>
                  <th className="py-3 pr-3 text-right font-medium tabular-nums">
                    Sweet spot
                  </th>
                  <th className="py-3 text-right font-medium tabular-nums">
                    Ceiling
                  </th>
                </tr>
              </thead>
              <tbody>
                {BENCHMARKS.map((f) => (
                  <tr
                    key={f.id}
                    className="border-b border-border/70 last:border-0"
                  >
                    <td className="py-3 pr-3">
                      <div className="font-medium text-fg">{f.name}</div>
                      <div className="mt-0.5 text-xs text-faint">
                        {FAMILY_LABEL[f.family]}
                      </div>
                    </td>
                    <td className="py-3 pr-3 text-right tabular-nums text-muted">
                      {f.protein.toFixed(1)}%
                    </td>
                    <td className="py-3 pr-3 text-right tabular-nums text-fg">
                      {f.sweetSpot}%
                    </td>
                    <td className="py-3 text-right tabular-nums text-accent">
                      {f.ceiling}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Read the surprises: 00 pizza is not a high-hydration boule flour.
            Einkorn’s protein is high and its ceiling is low. Dark rye has
            almost no gluten net — a 95% mix is a pan loaf, not a failure of
            technique.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            How the puddle happens
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed text-fg/90">
            <li>
              You copy an 80% formula written for bread flour onto all-purpose
              or 00.
            </li>
            <li>
              You weigh bowl water only, so the starter’s 50 g of water never
              enters the percent.
            </li>
            <li>
              The mix looks shaggy, then glossy, then like batter. Folds smear
              instead of stacking layers.
            </li>
            <li>
              Bulk “never comes.” That is not under-fermentation. The dough
              cannot trap gas because there is no continuous sheet.
            </li>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            How to fix it
          </h2>
          <div className="mt-4 space-y-4 leading-relaxed text-fg/90">
            <p>
              <strong className="font-medium text-fg">Before you mix.</strong>{" "}
              Pick the flour (or blend) first. Set true hydration to its sweet
              spot, not to a number from a video. DoughMatrix lights the ceiling
              as you move the paddle.
            </p>
            <p>
              <strong className="font-medium text-fg">If you already over-poured.</strong>{" "}
              Do not dump the bowl. Extra flour is{" "}
              <span className="text-accent">extra water ÷ target hydration</span>
              . Extra salt is that flour times your salt percent. Rescue in
              DoughMatrix does the algebra so the dough returns to the same
              true hydration and seasoning — not a guess-handful of flour that
              under-salts the loaf.
            </p>
            <p>
              <strong className="font-medium text-fg">If the flour is the problem.</strong>{" "}
              Raise the ceiling instead of chasing water: bread flour instead of
              AP, a 20–30% whole-wheat blend, or a high-extraction T80. Lower
              it on purpose for 00 pizza, spelt, and einkorn.
            </p>
            <p>
              <strong className="font-medium text-fg">If the mix is only slack, not broken.</strong>{" "}
              You are in caution, not danger. Lengthen autolyse, drop dough
              temperature a degree, and keep coil folds. The net can still
              form.
            </p>
          </div>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the engine
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Set the flour. Watch the ceiling. Mix the number the bag can hold.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The DoughMatrix sourdough engine is the same math in this
            guide: true hydration, flour-ceiling danger light, and over-pour
            rescue — live as you bump grams.
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

function Band({
  tone,
  title,
  body,
}: {
  tone: "safe" | "caution" | "danger";
  title: string;
  body: string;
}) {
  return (
    <li className="rounded-lg bg-card p-4 shadow-[0_0_0_1px_var(--color-border)]">
      <p className="flex items-center gap-2 text-sm font-medium">
        <span
          className={cn(
            "size-2.5 rounded-full",
            tone === "safe" && "bg-safe shadow-glow-safe",
            tone === "caution" && "bg-caution shadow-glow-caution",
            tone === "danger" && "bg-danger shadow-glow-danger",
          )}
        />
        {title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </li>
  );
}
