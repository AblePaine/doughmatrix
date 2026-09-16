export const LIVE_ENGINE = {
  id: "sourdough",
  to: "/engines/sourdough" as const,
  name: "Sourdough Engine",
  short: "Sourdough",
  badge: "Live",
  blurb:
    "Calculate true hydration (including starter water), find the exact water temp to hit your target, and predict your bulk rise time.",
} as const;

export const UPCOMING_ENGINES = [
  {
    id: "pizza",
    name: "Pizza Matrix",
    short: "Pizza",
    badge: "Phase 2",
    blurb:
      "Formulate dough for Neapolitan, NY, Detroit, or pan styles with cold-ferment schedules and pan size math.",
  },
  {
    id: "bagel",
    name: "Bagels & Stiff Doughs",
    short: "Bagels",
    badge: "Phase 3",
    blurb:
      "Nail low-hydration chewy doughs, barley malt dosing, and boiling bath times without burning out your mixer.",
  },
  {
    id: "enriched",
    name: "Enriched & Pastry",
    short: "Enriched",
    badge: "Phase 4",
    blurb:
      "Balance butter, eggs, and sugar without stalling your yeast or tearing delicate gluten structures.",
  },
] as const;
