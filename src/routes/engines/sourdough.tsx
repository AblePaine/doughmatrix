import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Engine } from "@/components/engine/engine";
import { track } from "@/lib/analytics";
import { parseEngineSearch } from "@/lib/engine-search";
import { useBaker } from "@/lib/sourdough/store";

export const Route = createFileRoute("/engines/sourdough")({
  validateSearch: parseEngineSearch,
  component: SourdoughEnginePage,
  head: () => ({
    meta: [
      { title: "Sourdough Hydration & Fermentation Matrix | DoughMatrix" },
      {
        name: "description",
        content:
          "Precision sourdough engine calculating true baker's percentages, hidden starter water dilution, DDT water temperature, and bulk fermentation timelines.",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.doughmatrix.com/engines/sourdough",
      },
    ],
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
