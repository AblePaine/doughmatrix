export const LIVE_ENGINES = [
  {
    id: "sourdough",
    to: "/engines/sourdough" as const,
    name: "Sourdough Calculator",
    short: "Sourdough",
    badge: "Live",
    blurb:
      "True hydration with the starter water counted, the water temp that lands your dough where you want it, and a bulk window for your kitchen — not someone else's.",
  },
  {
    id: "pizza",
    to: "/engines/pizza" as const,
    name: "Pizza Calculator",
    short: "Pizza",
    badge: "New",
    blurb:
      "NY, Neapolitan, Detroit, and sheet-pan — yeast dosed from your fermentation schedule, dough sized from balls or pan, hydration matched to your oven's heat.",
  },
] as const;

export const UPCOMING_ENGINES = [
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
