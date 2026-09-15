export const LIVE_ENGINE = {
  id: "sourdough",
  to: "/engines/sourdough" as const,
  name: "Sourdough Engine",
  short: "Sourdough",
  badge: "Live",
  blurb:
    "True hydration with starter dilution, flour-ceiling danger light, DDT water, and a temperature-decay bulk timeline.",
} as const;

export const UPCOMING_ENGINES = [
  {
    id: "pizza",
    name: "Pizza Matrix",
    short: "Pizza",
    badge: "Phase 2",
    blurb:
      "Neapolitan, NY, Detroit, and Roman formulation. 24–72h cold-retard decay, micro-gram yeast scaling, and pan surface-area logic.",
  },
  {
    id: "bagel",
    name: "Bagel & Stiff Dough",
    short: "Bagels",
    badge: "Phase 3",
    blurb:
      "Low-hydration motor-strain warnings, diastatic malt dosing, and alkaline boiling-bath pH kinetics.",
  },
  {
    id: "enriched",
    name: "Laminated & Enriched",
    short: "Enriched",
    badge: "Phase 4",
    blurb:
      "Brioche and croissant butter-block ratios, egg/fat hydration dilution, and thermal proofing ceilings.",
  },
] as const;
