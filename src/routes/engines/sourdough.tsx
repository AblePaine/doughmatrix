import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Engine } from "@/components/engine/engine";
import { track } from "@/lib/analytics";
import { parseEngineSearch } from "@/lib/engine-search";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";
import { useBaker } from "@/lib/sourdough/store";

export const Route = createFileRoute("/engines/sourdough")({
  validateSearch: parseEngineSearch,
  component: SourdoughEnginePage,
  head: () =>
    socialHead({
      title: "Sourdough Hydration & Fermentation Calculator | DoughMatrix",
      description:
        "Calculate true hydration with hidden starter water, find your exact water mix temperature, and dial in your bulk fermentation window.",
      path: "/engines/sourdough",
      image: OG_IMAGES.engine,
      cardTitle: "Sourdough Hydration & Fermentation Calculator",
      category: "BAKING TOOL",
      detail: "True Hydration • Starter Dilution • DDT",
    }),
});

function SourdoughEnginePage() {
  const { flour } = Route.useSearch();

  useEffect(() => {
    if (!flour) return;
    const apply = () => {
      const ok = useBaker.getState().loadCatalogFlour(flour);
      if (ok) track("load_flour", { id: flour });
    };
    if (useBaker.persist.hasHydrated()) {
      apply();
      return;
    }
    return useBaker.persist.onFinishHydration(apply);
  }, [flour]);

  return <Engine />;
}
