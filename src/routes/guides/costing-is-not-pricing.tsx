import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { articleJsonLd } from "@/lib/og/json-ld";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

const TITLE = "Costing Is Not Pricing: What to Charge for Baked Goods";

const DESCRIPTION =
  "Ingredients are the smallest slice of what a cookie costs. Labor, overhead, packaging, and the ones that don't sell — then a price with the profit already in it.";

export const Route = createFileRoute("/guides/costing-is-not-pricing")({
  component: CostingIsNotPricingGuide,
  head: () =>
    socialHead({
      title: `${TITLE} — DoughMatrix`,
      description: DESCRIPTION,
      path: "/guides/costing-is-not-pricing",
      image: OG_IMAGES.engine,
      cardTitle: TITLE,
      category: "FIELD GUIDE",
      jsonLd: articleJsonLd({
        headline: TITLE,
        description: DESCRIPTION,
        path: "/guides/costing-is-not-pricing",
      }),
    }),
});

function CostingIsNotPricingGuide() {
  return (
    <GuideShell>
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Guide
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Costing Is Not Pricing
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          “How much would you charge for these?” is the most-asked question in
          cottage baking — and the answers are almost always ingredients plus
          a guess. Ingredients are the smallest slice of the cost. If you
          don&apos;t add profit on purpose, you don&apos;t have a business;
          you have an expensive hobby with customers.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            The five slices of a true unit cost
          </h2>
          <div className="mt-4 space-y-5 text-base leading-relaxed text-fg/90">
            <p>
              <strong className="text-fg">Ingredients</strong> — what the batch
              actually used, priced from what you paid: amount used × purchase
              price ÷ purchase quantity. Not the bag&apos;s price, not a
              per-cup guess.
            </p>
            <p>
              <strong className="text-fg">Labor</strong> — hands-on minutes at
              an hourly rate you choose. This is the slice most bakers set to
              $0 by accident, and it is usually the biggest one. In the worked
              example below, flour is $1.15 of a loaf whose true cost is
              $8.15. Labor is the cost.
            </p>
            <p>
              <strong className="text-fg">Overhead</strong> — oven energy,
              booth-fee share, utilities. One honest number per batch beats
              pretending it&apos;s free.
            </p>
            <p>
              <strong className="text-fg">Waste</strong> — you bake 24 and sell
              22. The batch cost divides by the units that sell, not the
              units you made. Skip this and you get the classic market-day
              story: sold out, and still lost money.
            </p>
            <p>
              <strong className="text-fg">Packaging</strong> — bag, box,
              label, tie. Per unit, every unit, no exceptions.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Worked by hand: a batch of cookies
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Classic chocolate chip cookies. Ingredients total $9.00 for the
            batch (flour $1.00, brown sugar $0.90, butter $3.00, eggs $1.00,
            chips $2.70, pantry staples $0.40). Add 45 minutes of labor at
            $18/hr ($13.50) and $6.00 of overhead: the batch truly costs
            $28.50. At 5% waste, 22.8 of the 24 cookies sell — $1.25 each —
            plus $0.35 of packaging: <strong className="text-fg">a true unit
            cost of $1.60</strong>.
          </p>
          <p className="mt-4 leading-relaxed text-fg/90">
            Now price it. At a 40% target margin with a 5% channel fee, the
            price is $1.60 ÷ (1 − 0.40 − 0.05) = <strong className="text-fg">
            $2.91</strong>. Charge $3.00 and you keep $1.25 a cookie — a
            41.7% margin. Charge the “ingredients × 2” guess of $1.50 and you
            lose money on every sale while feeling busy.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Margin is not markup
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            “I did cost × 2, isn&apos;t that 50%?” No — doubling cost is a
            100% markup and a 50% margin only before fees, and the two numbers
            drift apart the moment a channel takes its cut. Margin is profit
            as a share of the <em>price</em>; markup is profit as a share of
            the <em>cost</em>. The calculator shows both, labeled, so the
            frame you think in is the frame you get.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Variants are deltas, not new recipes
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Nobody asks “price this entirely new product.” They ask “how
            much more for gluten-free?” That&apos;s a per-batch delta: +$2.28
            of ingredients on the cookie batch is +$0.10 a unit, $1.70 true
            cost, $3.09 at the same margin. Double chocolate (+$1.35 a batch)
            lands at $3.02. Price the difference, keep the margin, move on.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight text-fg">
            Then check the whole order
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">
            Per-item margins lie by omission: the card fee is per order. A
            market order of 12 cookies at $3.00 and a loaf at $14.00 is
            $50.00 of revenue, $27.35 of true cost, and a $1.75 Square fee —
            $20.90 of profit, 41.8%. That&apos;s the number market day
            actually pays you.
          </p>
          <p className="mt-6">
            <Link
              to="/engines/pricing"
              className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
            >
              Run your own numbers in the Pricing Calculator
              <ArrowRight className="size-4" />
            </Link>
          </p>
        </section>
      </article>
    </GuideShell>
  );
}
