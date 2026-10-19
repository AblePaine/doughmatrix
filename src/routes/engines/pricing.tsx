import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PricingEngine } from "@/components/engine/pricing";
import { parsePricingSearch, pricingStateFromSearch } from "@/lib/engine-search";
import { calculatorJsonLd } from "@/lib/og/json-ld";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";
import { usePricing } from "@/lib/pricing/store";

export const Route = createFileRoute("/engines/pricing")({
  validateSearch: parsePricingSearch,
  component: PricingEnginePage,
  head: () =>
    socialHead({
      title: "Pricing Calculator — What to Charge for Baked Goods | DoughMatrix",
      description:
        "Costing is not pricing. Cost the batch honestly — ingredients, packaging, your labor, overhead, and waste — then price per item, per flavor variant, and per whole market order.",
      path: "/engines/pricing",
      image: OG_IMAGES.engine,
      cardTitle: "Pricing Calculator",
      category: "BAKING TOOL",
      detail: "True Unit Cost • Margin & Markup • Order Profit",
      jsonLd: calculatorJsonLd({
        name: "Pricing Calculator",
        path: "/engines/pricing",
        description:
          "Costing is not pricing. Cost the batch honestly — ingredients, packaging, your labor, overhead, and waste — then price per item, per flavor variant, and per whole market order.",
        featureList: [
          "True unit cost: ingredients + labor + overhead over sellable units",
          "Margin and markup prices shown side by side",
          "Variant pricing as per-batch cost deltas",
          "Profit per order with the real card fee",
        ],
      }),
    }),
});

function PricingEnginePage() {
  const search = Route.useSearch();

  useEffect(() => {
    const shared = pricingStateFromSearch(search);
    if (!shared) return;
    const apply = () => usePricing.getState().replaceState(shared);
    if (usePricing.persist.hasHydrated()) {
      apply();
      return;
    }
    return usePricing.persist.onFinishHydration(apply);
  }, [search]);

  return <PricingEngine />;
}
