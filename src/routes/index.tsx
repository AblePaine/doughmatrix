import { createFileRoute, redirect } from "@tanstack/react-router";
import { HubHome } from "@/components/hub-home";
import { hasEngineQuery, parseEngineSearch } from "@/lib/engine-search";
import { socialHead } from "@/lib/og/meta";

export const Route = createFileRoute("/")({
  validateSearch: parseEngineSearch,
  beforeLoad: ({ search }) => {
    if (!hasEngineQuery(search)) return;
    throw redirect({
      to: "/engines/sourdough",
      search: { flour: search.flour },
      replace: true,
      statusCode: 301,
    });
  },
  component: HubHome,
  head: () =>
    socialHead({
      title: "DoughMatrix — Computational Tools & Science for Modern Bakers",
      description:
        "The precision grain craft suite. Calibrate true absorption ceilings, fermentation kinetics, and thermal targets — starting with the live sourdough engine.",
      path: "/",
      cardTitle: "Precision Grain Craft & Baking Engines",
      category: "MISSION CONTROL",
    }),
});
