import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const TITLE = "Whole Wheat Sourdough Hydration and the Adjustments That Matter";

const DESCRIPTION =
  "Whole wheat sourdough hydration: bran cuts gluten and drinks water. What to raise, what to shorten, what stays.";

export const Route = createFileRoute("/guides/whole-wheat-sourdough")({
  component: WholeWheatSourdoughGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/whole-wheat-sourdough",
      image: OG_IMAGES.hydration,
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function WholeWheatSourdoughGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Whole Wheat Sourdough Hydration and the Adjustments That Matter
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Whole wheat is not white flour with a tan color. The bran is still
          in the dough. Bran cuts gluten strands. Bran drinks water the white
          endosperm already had. Ignore either one and the loaf goes dense, or
          it goes slack and tears.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Change the water, the rest, and the length of bulk. Leave the rest
          of the method alone.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            What the bran does
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            A white loaf builds a continuous gluten sheet. Bran particles punch
            holes in that sheet. The dough tolerates less mixing and less time
            before the network gives up. That is the cut.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            The same particles are dry fiber. They keep taking water after the
            mix looks done. A dough that felt right at the bowl can feel tight
            an hour later. Bakers call that thirsty. It is the bran finishing
            a job the mix started.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            So whole wheat wants more water than the white loaf at the same
            flour weight. It also wants that water earlier, in contact with
            the flour, before the starter and salt go in.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            True hydration still counts the starter. Starter flour and starter
            water belong inside the percentage. A headline number that ignores
            them will read low and feel wet. Set the flour to whole wheat
            before you read the ceiling. The ceiling on whole wheat sits
            higher than the ceiling on bread flour. Higher ceiling is not a
            dare. It is room. A whole-wheat dough at a white-flour hydration
            often feels stiff and bakes tight.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The rest: longer than a skip, shorter than a classic autolyse
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            White bread flour can skip the rest. Whole wheat should not. The
            bran needs minutes in the water.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Keep the rest short. Fifteen to twenty minutes. The bran is
            already cutting the gluten. A long autolyse on that flour does not
            make it stronger. It makes it soup. Salt stays out of the rest.
            Starter stays out if you want the slower version of the rest. Add
            the starter and you have a fermentolyse, and the clock on bulk has
            already started.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Flour and water. Cover. Then salt, starter, and a short mix. Do
            not knead whole wheat the way you knead a white boule. The network
            you are building is easier to break than to make.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Shorter bulk
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Whole wheat ferments faster than white at the same temperature and
            the same starter percentage. More food for the culture. A weaker
            network, so the dough reaches the end of its strength sooner.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Do not reuse the white-flour hour. Enter the flour you mixed. Read
            the bulk window for that dough temperature and that starter
            amount. Warm kitchen, fast bulk. Cold kitchen, slow bulk. The
            rule did not change. The flour did.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            End bulk on feel, inside the window. Jiggle, some growth, a dough
            that holds a fold and then slowly relaxes. Whole wheat will not
            look as billowy as white. Waiting for a white-loaf volume is how
            you overshoot it.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            A cold retard still works after that. Twelve to twenty-four hours
            at 39&ndash;42&deg;F. The fridge is the pause button. Room temp is
            not. Whole wheat left on the counter &ldquo;to build
            flavor&rdquo; past the window just collapses.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            What stays the same
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Salt still belongs near 2% of total flour. Whole wheat does not
            get a special salt.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Starter is still ripe at mix. Peaked, domed, not collapsed. A
            fallen starter has already spent acid in the jar. In a weaker
            dough that acid shows up as slack.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Inoculation still moves the hour. More starter, shorter bulk. Less
            starter, longer bulk. A same-day whole-wheat loaf and an overnight
            white loaf are different schedules. Do not copy the clock from one
            onto the other.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Desired dough temperature still runs the table. Water temperature
            is how you hit it. The warning band is 3&ndash;38&deg;C. Outside
            that, the mix is fighting the room.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Scoring, steam, and the bake do not get new physics. A
            whole-wheat loaf springs less because the network is cut, not
            because the oven changed. Steam still keeps the crust extensible.
            It cannot replace gluten the mill left in the bran.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Key numbers
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-fg/90">
            <li>True hydration includes starter flour and starter water.</li>
            <li>Whole-wheat rest: 15&ndash;20 minutes. Not a long autolyse.</li>
            <li>
              Bulk: shorter than the white loaf at the same temperature and
              starter percent.
            </li>
            <li>Cold retard: 12&ndash;24 hours at 39&ndash;42&deg;F.</li>
            <li>Water-temperature warning band: 3&ndash;38&deg;C.</li>
            <li>Salt: about 2% of total flour.</li>
            <li>Read the ceiling and the hour off the flour you actually mixed.</li>
          </ul>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Enter the flour you mixed. Read the ceiling and the hour.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The sourdough engine folds starter flour and water into true
            hydration and reads the bulk window from dough temperature and
            inoculation. Set whole wheat as the flour before you read either
            number.
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
