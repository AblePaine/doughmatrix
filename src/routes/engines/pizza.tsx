import { createFileRoute } from "@tanstack/react-router";
import { PizzaEngine } from "@/components/engine/pizza";
import { calculatorJsonLd } from "@/lib/og/json-ld";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

export const Route = createFileRoute("/engines/pizza")({
  component: PizzaEnginePage,
  head: () =>
    socialHead({
      title: "Pizza Dough Calculator — Hydration, Yeast & Pan Sizes | DoughMatrix",
      description:
        "NY, Neapolitan, Detroit, and sheet-pan pizza: dough weight from ball count or pan size, yeast dosed from your fermentation schedule, and hydration matched to your oven's heat.",
      path: "/engines/pizza",
      image: OG_IMAGES.engine,
      cardTitle: "Pizza Dough Calculator",
      category: "BAKING TOOL",
      detail: "4 Styles • Cold-Ferment Yeast • Pan Sizes",
      jsonLd: calculatorJsonLd({
        name: "Pizza Dough Calculator",
        path: "/engines/pizza",
        description:
          "NY, Neapolitan, Detroit, and sheet-pan pizza: dough weight from ball count or pan size, yeast dosed from your fermentation schedule, and hydration matched to your oven's heat.",
        featureList: [
          "Four styles: NY, Neapolitan, Detroit, sheet-pan",
          "Yeast dosed from fermentation schedule (room-temp or cold)",
          "Pan sizing via thickness factor",
          "Hydration-vs-heat warnings and step timeline",
        ],
      }),
    }),
});

function PizzaEnginePage() {
  return <PizzaEngine />;
}
