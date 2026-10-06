import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const TITLE = "Baking Sourdough Without a Dutch Oven: Steam for Oven Spring";

const DESCRIPTION =
  "Baking sourdough without a Dutch oven: what steam does, and what lava rocks, a spray, and a roaster cost you.";

export const Route = createFileRoute("/guides/dutch-oven-vs-open-bake")({
  component: DutchOvenVsOpenBakeGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/dutch-oven-vs-open-bake",
      image: OG_IMAGES.crumb,
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function DutchOvenVsOpenBakeGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Baking Sourdough Without a Dutch Oven: Steam for Oven Spring
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          The Dutch oven is not magic. It is a steam chamber you already own.
          Take it away and the loaf still bakes. What you lose is the trapped
          moisture that keeps the crust soft long enough to spring.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Steam is the job. The pot is one way to do the job.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            What steam actually does
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            In the first minutes of the bake the loaf is still expanding.
            Starch on the surface has not set. A dry oven sets that skin fast.
            A set skin is a lid. Oven spring stops. You get a tight crown and
            a split in the wrong place.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Steam delays that set. The surface stays extensible. Gas from the
            bake and the last of fermentation push the loaf up. The score
            opens into an ear instead of a seam. Then the steam is gone, the
            crust dries, and color starts.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            No steam, no extension. More steam does not mean more rise past
            the point the dough was proved. Steam spends the spring you
            already earned. It does not invent spring in an overproved loaf.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The Dutch oven as a chamber
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Covered, a preheated Dutch oven does two things. The mass of iron
            hits the loaf with heat from below and from the sides. The lid
            traps water leaving the dough and turns it into steam around the
            loaf. You do not add water. The loaf supplies it.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Lid on is the spring phase. Lid off is the color phase. Pull the
            lid while the crust is still pale and the loaf is still willing to
            open. Leave the lid on until the crust is dark and you steam the
            color out of it.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            A cold pot does not do this. The mass has to be hot before the
            loaf goes in. That is the cost of the method: a heavy pan, a long
            preheat, and a burn risk when the lid comes off.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Open bake, and what each workaround costs
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Open bake means the loaf goes onto a stone or steel with no lid.
            Spring then depends on steam you add yourself, and on heat already
            stored in the deck.
          </p>
          <h3 className="mt-8 font-display text-xl tracking-tight text-fg">
            Lava rocks in a pan
          </h3>
          <p className="mt-4 leading-relaxed text-fg/90">
            A cast-iron pan of rocks on a lower rack, preheated with the oven.
            Pour boiling water in when the loaf goes on the stone. The rocks
            hold heat and flash the water to steam. Cost: a dedicated pan, a
            splash risk, and a steam burst that fades once the water is gone.
            Rocks that were not preheated just boil. They do not flash.
            Thermal mass is the point.
          </p>
          <h3 className="mt-8 font-display text-xl tracking-tight text-fg">
            Spray bottle
          </h3>
          <p className="mt-4 leading-relaxed text-fg/90">
            Mist the oven walls, or the loaf, at load-in. Cost: almost
            nothing, and almost no steam. A home oven vents. The mist is gone
            in seconds. You get a momentary delay in crust set and then a dry
            bake. Fine for a loaf that was fully proved and only needs a
            little opening. Not enough for a tight, underproved boule that
            needed the full chamber.
          </p>
          <h3 className="mt-8 font-display text-xl tracking-tight text-fg">
            Covered roaster
          </h3>
          <p className="mt-4 leading-relaxed text-fg/90">
            A granite-ware or stainless roaster with a lid is the closest
            stand-in for the Dutch oven. Same idea: trap the loaf&apos;s own
            water. Cost: the seal is worse, so steam leaks. Many roasters
            cannot be preheated empty. Load the loaf in a cold roaster and
            you lose the heat-from-below that a preheated pot gives you. You
            keep the humidity. You spend the spring on a slower heat-up.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            A stainless bowl over the loaf on a stone is the same trade.
            Humidity, yes. Stored heat in the cover, no.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            What you cannot fake
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Steam does not fix a dough that finished fermenting on the
            counter. Cold retard is still 12&ndash;24 hours at 39&ndash;42&deg;F
            if you want that pause. Skipping the pot does not skip the proof.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Score after the setup is hot, not before the oven is ready. A
            scored loaf waiting on the peel skins over. The ear you wanted is
            already sealed.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Preheat the deck longer than feels necessary. An open bake on a
            stone that is only warm is a pale bottom and no spring, steam or
            not. The steel or stone is doing the work the Dutch oven floor
            used to do.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Vent the oven after the spring phase if you added water. Trapped
            steam past the opening will soften the crust you just earned.
            Color wants a dry oven.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Key numbers
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-fg/90">
            <li>Cold retard, if you use one: 12&ndash;24 hours at 39&ndash;42&deg;F.</li>
            <li>Steam&apos;s job: keep the crust extensible for oven spring.</li>
            <li>Dutch oven: preheated, lid on for spring, lid off for color.</li>
            <li>Lava rocks: steam burst, then gone. They must be hot.</li>
            <li>Spray bottle: seconds of steam. A dry bake after that.</li>
            <li>
              Covered roaster: humidity without the preheated mass, unless
              the pan can take an empty preheat.
            </li>
          </ul>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            The dough is a separate problem from the pot.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            True hydration, water temperature, and the bulk window belong to
            the calculator, not to the bake setup. Get the dough right first.
            Then pick your steam.
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
