import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { socialHead } from "@/lib/og/meta";

const TITLE = "Baking Around a Job: Sourdough Schedules That Fit a Work Week";

const DESCRIPTION =
  "Three timed sourdough schedules — weeknight mix, fridge bulk, and weekend bake — so fermentation happens while you are at work.";

export const Route = createFileRoute("/guides/sourdough-work-week-schedule")({
  component: WorkWeekScheduleGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/sourdough-work-week-schedule",
      cardTitle: TITLE,
      category: "FIELD GUIDE",
    }),
});

function WorkWeekScheduleGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Baking Around a Job: Sourdough Schedules That Fit a Work Week
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Sourdough does not care that you have a 8:00 meeting. The dough only
          cares about temperature and time. Fit those two to the hours you are
          actually home, and the loaf stops owning the calendar.
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/90">
          <p>
            All three schedules below assume a single 850–900 g lean boule: 500
            g flour, 70–75% hydration by the standard method (all water ÷ all
            flour, including starter water), 2% salt, 20% ripe levain. If your
            calculator excludes starter water from the headline hydration, your
            72% will feel like this dough’s 75%. Same dough, different label.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The temperature lever
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Fermentation rate roughly doubles every 15°F in the range home
            bakers use. A bulk that takes 5 hours at 75°F takes about 8 hours
            at 68°F and 2.5–3 hours at 82°F.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Bulk fermentation time by dough temperature at 20% levain
              </caption>
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-faint uppercase">
                  <th className="py-3 pr-3 font-medium">Dough temp</th>
                  <th className="py-3 pr-3 font-medium">
                    Rough bulk to 50–60% rise at 20% levain
                  </th>
                  <th className="py-3 font-medium">Use it when</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg tabular-nums">
                    68°F
                  </td>
                  <td className="py-3 pr-3 text-muted">7–9 hours</td>
                  <td className="py-3 text-muted">
                    Overnight on the counter in a cool house
                  </td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg tabular-nums">
                    75°F
                  </td>
                  <td className="py-3 pr-3 text-muted">4–5.5 hours</td>
                  <td className="py-3 text-muted">
                    Evening mix, shape before bed
                  </td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg tabular-nums">
                    78–80°F
                  </td>
                  <td className="py-3 pr-3 text-muted">3–4 hours</td>
                  <td className="py-3 text-muted">Short window after work</td>
                </tr>
                <tr className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3 font-medium text-fg tabular-nums">
                    39–42°F (fridge)
                  </td>
                  <td className="py-3 pr-3 text-muted">
                    12–24 hours after a short warm start
                  </td>
                  <td className="py-3 text-muted">You will not be home</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 leading-relaxed text-fg/90">
            A cheap probe thermometer in the dough is worth more than another
            recipe.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Schedule A — mix after work, bake tomorrow night
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            For someone home at 6:00 p.m. and gone by 7:30 a.m.
          </p>
          <div className="mt-4 space-y-4 leading-relaxed text-fg/90">
            <p>
              <strong className="font-medium text-fg">
                Tuesday 6:15 p.m.
              </strong>{" "}
              Feed the starter 1:5:5 (20 g starter / 100 g flour / 100 g water)
              at 80°F water. It should peak Wednesday 6–8 p.m., right when you
              mix. A 1:2:2 feed peaks in 4–6 hours and would be long past peak
              by Wednesday evening — too acidic for this schedule.
            </p>
            <p>
              <strong className="font-medium text-fg">
                Wednesday 6:15 p.m.
              </strong>{" "}
              Mix final dough. Target dough temp 76–78°F. Rest 30 minutes. Three
              sets of stretch-and-folds, 20 minutes apart (6:45, 7:05, 7:25).
            </p>
            <p>
              <strong className="font-medium text-fg">
                Wednesday 7:30 p.m. to Thursday 7:00 a.m.
              </strong>{" "}
              Cover and refrigerate the dough in the bowl (cold bulk).
            </p>
            <p>
              <strong className="font-medium text-fg">
                Thursday 6:00 p.m.
              </strong>{" "}
              Divide if needed, preshape, rest 20 minutes, shape, into a floured
              basket.
            </p>
            <p>
              <strong className="font-medium text-fg">
                Thursday 6:30 p.m. to Friday 7:00 a.m.
              </strong>{" "}
              Cold proof in the fridge.
            </p>
            <p>
              <strong className="font-medium text-fg">Friday 6:00 p.m.</strong>{" "}
              Preheat Dutch oven 45 minutes at 485°F. Score. Bake 20 minutes
              covered, 18 uncovered.
            </p>
          </div>
          <p className="mt-4 leading-relaxed text-fg/90">
            Two nights of fridge time is not a defect. Flavor improves. Oven
            spring stays if the warm bulk on Wednesday was not skipped.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Schedule B — weekend bake, zero weeknight bench time
          </h2>
          <div className="mt-4 space-y-4 leading-relaxed text-fg/90">
            <p>
              <strong className="font-medium text-fg">Friday 9:00 p.m.</strong>{" "}
              Feed starter 1:3:3 and refrigerate immediately. It wakes slowly.
            </p>
            <p>
              <strong className="font-medium text-fg">
                Saturday 8:00 a.m.
              </strong>{" "}
              Take starter out. It should be rising. If not, give it one 1:1:1
              feed and wait 3 hours.
            </p>
            <p>
              <strong className="font-medium text-fg">
                Saturday 11:00 a.m.
              </strong>{" "}
              Mix. Dough temp 75°F. Folds at 11:30, 11:50, 12:10.
            </p>
            <p>
              <strong className="font-medium text-fg">
                Saturday 11:00 a.m. to 3:30 p.m.
              </strong>{" "}
              Warm bulk while you run errands. Check at 3:00. If it has risen
              50–60% and jiggles, shape. If it is sluggish, leave it until 4:30.
            </p>
            <p>
              <strong className="font-medium text-fg">
                Saturday 4:00 p.m.
              </strong>{" "}
              Shape. Basket into the fridge.
            </p>
            <p>
              <strong className="font-medium text-fg">
                Sunday 8:00–10:00 a.m.
              </strong>{" "}
              Bake from cold. Same 485°F pot routine.
            </p>
          </div>
          <p className="mt-4 leading-relaxed text-fg/90">
            This is the schedule that survives soccer and grocery runs. The only
            committed blocks are Saturday late morning (mix + three folds in a
            70-minute window) and Sunday morning bake.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Schedule C — same-weeknight loaf
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Only if the kitchen is 76°F or you have a proof box.
          </p>
          <div className="mt-4 space-y-4 leading-relaxed text-fg/90">
            <p>
              <strong className="font-medium text-fg">5:45 p.m.</strong> Mix
              with 25% levain instead of 20%, dough temp 80°F.
            </p>
            <p>
              <strong className="font-medium text-fg">Folds</strong> at 6:05,
              6:20, 6:35.
            </p>
            <p>
              <strong className="font-medium text-fg">7:45–8:15 p.m.</strong>{" "}
              Shape when the dough is up 50%.
            </p>
            <p>
              <strong className="font-medium text-fg">8:15–9:30 p.m.</strong>{" "}
              Room-temp proof in the basket. Preheat at 8:45.
            </p>
            <p>
              <strong className="font-medium text-fg">9:30 p.m.</strong> Bake.
              Cool on a rack overnight. Slice tomorrow.
            </p>
          </div>
          <p className="mt-4 leading-relaxed text-fg/90">
            Same-night bakes run hotter and use more levain. They taste milder.
            They exist so you are not a hostage.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            What not to do
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Do not mix at 10 p.m. and hope a 68°F kitchen finishes bulk by 6
            a.m. without checking. Either fridge it at 10:30 after one fold, or
            get a $15 plug-in seedling mat under the bowl and actually hit 75°F.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Do not bake from a warm, fully doubled basket after an 8-hour
            unattended bulk. That loaf is already done fermenting. Put it in the
            fridge two hours earlier next time.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Starter that matches the calendar
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            A starter that peaks in 4 hours at 77°F after a 1:2:2 feed is ready
            for Schedule A and C. If it takes 8 hours, either keep it warmer or
            feed 1:1:1 so it fits the evening window.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Store the jar in the fridge after Thursday’s bake. Friday night feed
            and leave out only if you are on Schedule B. Two feeds a week is
            enough for these schedules. Daily feeding is for bakeries, not for
            one loaf.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Write the schedule on a sticky note on the flour bin: feed day, mix
            day, bake day. The dough does not need a new formula when life gets
            loud. It needs the same 20% levain and a fridge. If you miss
            Thursday shape, the dough can sit cold until Saturday. Cold is the
            pause button. Room-temp bulk is not.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Key numbers
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-fg/90">
            <li>20% levain, 75°F dough: 4–5.5 h bulk to 50–60% rise.</li>
            <li>Fridge bulk or proof: 12–24 h at 39–42°F after a short warm start.</li>
            <li>After-work mix: folds done in a 70-minute window, then cold.</li>
            <li>Weekend version: Saturday 11:00 mix, Sunday morning bake.</li>
            <li>Same-night: 25% levain, 80°F dough, bake ~3.5–4 h after mix.</li>
          </ul>
        </section>

        <aside className="mt-12 rounded-lg bg-accent-dim p-5 shadow-[0_0_0_1px_rgb(229_169_98_/_0.35)] sm:p-6">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Open the calculator
          </p>
          <p className="mt-2 font-display text-2xl tracking-tight text-fg">
            Fit the bulk to the hours you are home.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The sourdough calculator reads your bulk window from dough temp and
            starter amount — pick the schedule, then set the numbers so the
            dough is ready when you are.
          </p>
          <Link
            to="/engines/sourdough"
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 text-base font-medium text-inverse shadow-[0_0_0_1px_rgb(229_169_98_/_0.4)] hover:bg-accent-hover"
          >
            Open the bulk-timing calculator
            <ArrowRight className="size-4" />
          </Link>
        </aside>
      </article>
    </GuideShell>
  );
}
