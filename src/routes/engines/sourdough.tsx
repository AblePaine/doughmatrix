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
        "Figure out your true hydration (the water hiding in your starter counts), find the water temp that lands your dough right, and know when bulk should be done.",
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
