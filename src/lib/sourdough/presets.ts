import type { BakerInput, Maturity } from "./types";

export type Preset = {
  id: string;
  name: string;
  tag: string;
  bakerHydration: number;
  inoculation: number;
  starterHydration: number;
  saltPercent: number;
  flourId: string;
  blendId: string | null;
  blendPercent: number;
  doughTempC: number;
  maturity: Maturity;
  note: string;
};

export const PRESETS: Preset[] = [
  {
    id: "tartine",
    name: "Tartine country",
    tag: "Country",
    bakerHydration: 75,
    inoculation: 0.2,
    starterHydration: 100,
    saltPercent: 2,
    flourId: "bread",
    blendId: "ww",
    blendPercent: 10,
    doughTempC: 24,
    maturity: "peak",
    note: "Robertson country loaf — 75% baker’s, 10% whole wheat.",
  },
  {
    id: "weeknight",
    name: "Weeknight boule",
    tag: "Fast",
    bakerHydration: 72,
    inoculation: 0.3,
    starterHydration: 100,
    saltPercent: 2,
    flourId: "bread",
    blendId: null,
    blendPercent: 0,
    doughTempC: 26,
    maturity: "peak",
    note: "Higher inoculation, warmer bulk — same-day bake.",
  },
  {
    id: "baguette",
    name: "Baguette",
    tag: "Lean",
    bakerHydration: 68,
    inoculation: 0.15,
    starterHydration: 100,
    saltPercent: 2,
    flourId: "ap",
    blendId: "bread",
    blendPercent: 40,
    doughTempC: 24,
    maturity: "peak",
    note: "Drier mix, open alveoles from gentle handling.",
  },
  {
    id: "ciabatta",
    name: "Ciabatta",
    tag: "Wet",
    bakerHydration: 80,
    inoculation: 0.2,
    starterHydration: 100,
    saltPercent: 2,
    flourId: "bread",
    blendId: null,
    blendPercent: 0,
    doughTempC: 24,
    maturity: "peak",
    note: "Slack, slap-and-fold. Will sit near most ceilings.",
  },
  {
    id: "focaccia",
    name: "Focaccia",
    tag: "Pan",
    bakerHydration: 80,
    inoculation: 0.2,
    starterHydration: 100,
    saltPercent: 2.2,
    flourId: "bread",
    blendId: null,
    blendPercent: 0,
    doughTempC: 25,
    maturity: "peak",
    note: "Pan dough. Dimple generously; oil is extra.",
  },
  {
    id: "pizza",
    name: "Pizza al taglio",
    tag: "Pizza",
    bakerHydration: 70,
    inoculation: 0.15,
    starterHydration: 100,
    saltPercent: 2.5,
    flourId: "tipo00",
    blendId: "bread",
    blendPercent: 20,
    doughTempC: 23,
    maturity: "peak",
    note: "00-forward, cold retard after shape.",
  },
  {
    id: "rye",
    name: "40% rye",
    tag: "Rye",
    bakerHydration: 78,
    inoculation: 0.2,
    starterHydration: 100,
    saltPercent: 1.8,
    flourId: "bread",
    blendId: "rye-light",
    blendPercent: 40,
    doughTempC: 26,
    maturity: "peak",
    note: "Sticky mix, pan or tight boule. Don’t chase gluten.",
  },
  {
    id: "cristal",
    name: "Pan de cristal",
    tag: "Edge",
    bakerHydration: 95,
    inoculation: 0.2,
    starterHydration: 100,
    saltPercent: 2,
    flourId: "bread",
    blendId: null,
    blendPercent: 0,
    doughTempC: 24,
    maturity: "peak",
    note: "Extreme hydration. Expect the danger light — that’s the point.",
  },
];

/** Convert a baker’s-hydration preset into a true-hydration target. */
export function trueHydrationFromPreset(p: Preset): number {
  const flour = 100;
  const water = flour * (p.bakerHydration / 100);
  const starter = flour * p.inoculation;
  const starterFlour = starter * (100 / (100 + p.starterHydration));
  const starterWater = starter - starterFlour;
  return ((water + starterWater) / (flour + starterFlour)) * 100;
}

export function applyPresetTo(p: Preset, flourWeight: number): Partial<BakerInput> {
  return {
    mixMode: "flour",
    flourWeight,
    targetTrueHydration: Number(trueHydrationFromPreset(p).toFixed(1)),
    starterWeight: Number((flourWeight * p.inoculation).toFixed(1)),
    starterHydration: p.starterHydration,
    saltPercent: p.saltPercent,
    doughTempC: p.doughTempC,
    flourId: p.flourId,
    blendId: p.blendId,
    blendPercent: p.blendPercent,
    maturity: p.maturity,
  };
}
