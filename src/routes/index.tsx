import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Engine } from "@/components/engine/engine";
import { track } from "@/lib/analytics";
import { useBaker } from "@/lib/sourdough/store";

type HomeSearch = {
  flour?: string;
};

export const Route = createFileRoute("/")({
  validateSearch: (raw: Record<string, unknown>): HomeSearch => ({
    flour: typeof raw.flour === "string" && raw.flour.length > 0 ? raw.flour : undefined,
  }),
  component: Home,
});

function Home() {
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
