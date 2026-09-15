import { createFileRoute, redirect } from "@tanstack/react-router";
import { HubHome } from "@/components/hub-home";
import { hasEngineQuery, parseEngineSearch } from "@/lib/engine-search";

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
  head: () => ({
    meta: [
      {
        title: "DoughMatrix — Computational Tools & Science for Modern Bakers",
      },
      {
        name: "description",
        content:
          "The precision grain craft suite. Calibrate true absorption ceilings, fermentation kinetics, and thermal targets — starting with the live sourdough engine.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.doughmatrix.com/" }],
  }),
});
