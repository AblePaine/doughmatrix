import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Engine } from "@/components/engine/engine";
import { track } from "@/lib/analytics";
import {
  isEngineFlourId,
  parseSourdoughSearch,
  sourdoughPatchFromSearch,
} from "@/lib/engine-search";
import { calculatorJsonLd } from "@/lib/og/json-ld";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";
import { useBaker } from "@/lib/sourdough/store";

export const Route = createFileRoute("/engines/sourdough")({
  validateSearch: parseSourdoughSearch,
  component: SourdoughEnginePage,
  head: () =>
    socialHead({
      title: "Sourdough Hydration & Fermentation Calculator | DoughMatrix",
      description:
        "Figure out your true hydration (the water hiding in your starter counts), find the water temp that lands your dough right, and know when bulk should be done.",
      path: "/engines/sourdough",
      image: OG_IMAGES.engine,
      cardTitle: "Sourdough Hydration & Fermentation Calculator",
      category: "BAKING TOOL",
      detail: "True Hydration • Starter Dilution • DDT",
      jsonLd: calculatorJsonLd({
        name: "Sourdough Hydration & Fermentation Calculator",
        path: "/engines/sourdough",
        description:
          "Figure out your true hydration (the water hiding in your starter counts), find the water temp that lands your dough right, and know when bulk should be done.",
        featureList: [
          "True vs baker's hydration, including starter flour and water",
          "14-flour catalog with per-flour hydration ceilings and blends",
          "4-factor desired dough temperature (DDT) water calculation",
          "Temperature-calibrated bulk fermentation windows with fold schedules",
          "Over-pour rescue: how much flour fixes added water",
        ],
      }),
    }),
});

function SourdoughEnginePage() {
  const search = Route.useSearch();
  const flour = search.flour;

  useEffect(() => {
    const patch = sourdoughPatchFromSearch(search);
    const hasPatch = Object.keys(patch).length > 0;
    if (!flour && !hasPatch) return;
    const apply = () => {
      const state = useBaker.getState();
      // Share-link state first; the flour deep link below may still
      // override the flour itself (the catalog behavior predates sharing).
      if (hasPatch) state.set(patch);
      if (!flour) return;
      if (isEngineFlourId(flour)) {
        state.set({ flourId: flour });
      } else if (state.loadCatalogFlour(flour)) {
        track("load_flour", { id: flour });
      }
    };
    if (useBaker.persist.hasHydrated()) {
      apply();
      return;
    }
    return useBaker.persist.onFinishHydration(apply);
  }, [search, flour]);

  return <Engine />;
}
