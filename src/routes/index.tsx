import { createFileRoute, redirect } from "@tanstack/react-router";
import { HubHome } from "@/components/hub-home";
import { hasEngineQuery, parseEngineSearch } from "@/lib/engine-search";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

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
      title: "DoughMatrix — Baking science, minus the guesswork",
      description:
        "Dial in water absorption, hit your proofing windows, and stop ending up with flat, sticky dough. Real flour data and fermentation math for home and micro-bakers.",
      path: "/",
      image: OG_IMAGES.home,
      cardTitle: "Baking science, minus the guesswork",
      category: "BAKING SUITE",
    }),
});
