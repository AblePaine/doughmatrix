export const LIVE_ENGINE = {
  id: "sourdough",
  to: "/engines/sourdough" as const,
  name: "Sourdough Calculator",
  short: "Sourdough",
  badge: "Live",
  blurb:
    "True hydration with the starter water counted, the water temp that lands your dough where you want it, and a bulk window for your kitchen — not someone else's.",
} as const;

export const UPCOMING_ENGINES = [
  {
    id: "pizza",
    name: "Pizza Calculator",
    short: "Pizza",
    badge: "Coming soon",
    blurb:
      "Neapolitan, NY, Detroit, and pan pizza — cold-ferment timing and pan sizes worked out for you.",
  },
  {
    id: "bagel",
    name: "Bagels & Stiff Doughs",
    short: "Bagels",
    badge: "Coming soon",
    blurb:
      "Chewy low-hydration bagels: how much barley malt, how long the boil, and a mix your mixer survives.",
  },
  {
    id: "enriched",
    name: "Enriched & Pastry",
    short: "Enriched",
    badge: "Coming soon",
    blurb:
      "Butter, eggs, and sugar in the right amounts — a rich dough that still rises and doesn't tear.",
  },
] as const;
