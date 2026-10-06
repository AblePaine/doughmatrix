import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const TITLE = "Same-Day Sourdough Recipe: One Day, and What You Trade";

const DESCRIPTION =
  "Same-day sourdough: warm kitchen, ripe starter, shorter bulk. What the one-day loaf keeps, and the flavor it gives up.";

export const Route = createFileRoute("/guides/same-day-sourdough")({
  component: SameDaySourdoughGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/same-day-sourdough",
      image: OG_IMAGES.temp,
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function SameDaySourdoughGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Same-Day Sourdough Recipe: One Day, and What You Trade
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          A two-day loaf is a schedule, not a law. Compress it and you still
          get bread. You spend the long cold rest. That rest is where a lot
          of the flavor was going to come from.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Same-day keeps the structure if you hit temperature and stop bulk
          on time. It does not keep the depth of a loaf that sat cold
          overnight.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            What you are compressing
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            A usual home loaf has three clocks. A ripe starter. A warm bulk.
            A cold proof, 12&ndash;24 hours at 39&ndash;42&deg;F. Same-day
            deletes the third clock. Sometimes it shortens the second.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            The dough does not care that you want it for dinner. It cares
            about temperature and how much ripe starter you mixed in. Warm
            kitchen, fast bulk. Cold kitchen, slow bulk. A 68&deg;F room will
            not finish a same-day loaf while you are at work. Heat the dough,
            or pick another day.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            The fridge is the pause button. Room temp is not. Same-day means
            you stay near the bowl.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Starter first
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Mix with a starter at peak. Domed, webbed, not fallen. A collapsed
            jar has already used part of the window. You will not get it back
            by adding more starter at mix.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            The house feeding is 1:5:5. That is an overnight build, not a
            morning one. A 1:10:10 at 18&deg;C is a 32-hour culture, not a
            levain you can use tonight. Same-day needs a short fuse. Feed a
            smaller ratio in the morning so the jar peaks when you mix. If
            the jar is already at peak from last night&apos;s feed and still
            domed, use it. Do not refresh out of habit and then wait.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Young starter, under peak, stretches bulk. Fallen starter
            compresses it. Neither one matches the hour you planned.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The warm bulk
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Target a warm dough, not a warm room you hope will catch up.
            Desired dough temperature is the number bulk actually runs on.
            Water temperature is how you land it. Stay inside the warning
            band, 3&ndash;38&deg;C. If the water the formula wants is outside
            that band, the kitchen is the problem. Ice or a warmer corner. Do
            not ignore the band.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            More starter shortens the hour. A warmer dough shortens it again.
            Both levers at once is how a same-day loaf fits between lunch and
            dinner. Both levers at once is also how you blow past the window
            while the oven preheats.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Folds still matter. A short bulk gets fewer of them, spaced
            tighter. Three folds early, then leave it alone. A dough that is
            folded every ten minutes until bake is overworked, not better
            proved.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            End bulk short of doubled. Growth, jiggle, a dough that holds
            tension. Same-day dough is warm. Warm dough keeps moving on the
            bench while you shape. Stop early enough that shaping is not a
            rescue.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Skip the cold proof, on purpose
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Shape. Proof at room temperature until the loaf is ready, not
            until the clock says dinner. A poke should come back slowly. Bake
            it.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            What you traded: acid, aroma, a drier skin on the loaf going into
            the oven, and the convenience of baking from cold in the morning.
            A cold loaf scores clean. A warm same-day loaf scores soft.
            Shallower cut. Sharper blade. Do not wait for a skin that the
            fridge was going to make.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            What you keep: oven spring, if bulk ended on time. Crumb that is
            open enough to be bread, not a brick. A milder flavor. That
            mildness is the point, not a failure. The long cold retard is what
            builds the sharper tang. You skipped it.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            If the loaf looks ready and dinner is still an hour out, then use
            the fridge. An hour or two of cold is a brake. It is not the
            12&ndash;24 hour flavor rest. Do not leave a fully proved warm
            loaf on the counter &ldquo;until the oven is hot.&rdquo; That loaf
            is done fermenting.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            What not to do
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Do not start at bedtime in a cool kitchen and call it same-day.
            That is an overnight counter bulk with no one watching.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Do not double the starter and also hold the dough warm until it
            has doubled and then some. The crumb will cave. Dense, gummy, or
            caves under the crust: the crumb is still telling the truth on a
            one-day schedule.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Do not chase a sour loaf on a same-day clock. Sour is time. You
            spent the time.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Key numbers
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-fg/90">
            <li>Cold proof you are skipping: 12&ndash;24 hours at 39&ndash;42&deg;F.</li>
            <li>House starter feed for an overnight build: 1:5:5.</li>
            <li>A 1:10:10 at 18&deg;C is a 32-hour culture, not a same-day levain.</li>
            <li>Water-temperature warning band: 3&ndash;38&deg;C.</li>
            <li>Same-day levers: warmer dough, ripe starter, shorter bulk.</li>
            <li>Trade: flavor depth. Keep: structure, if bulk stops on time.</li>
          </ul>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Read the hour for the temperature and inoculation you mixed.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The sourdough engine reads the bulk window from dough temperature
            and starter amount. Warmer dough and more starter both shorten
            the hour — set both levers and read the window before you mix.
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
