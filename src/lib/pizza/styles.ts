import type { BakeProfile, PizzaStyle } from "./types";

export type PizzaStylePreset = {
  id: PizzaStyle;
  name: string;
  tagline: string;
  hydration: number;
  saltPercent: number;
  oilPercent: number;
  flourNote: string;
  defaultBallWeight: number;
  /** oz of dough per in² of pan — pan/sheet styles only */
  thicknessFactorOz: number | null;
  defaultPan: { lengthIn: number; widthIn: number } | null;
  recHydration: [number, number];
  bake: BakeProfile;
};

export const PIZZA_STYLES: PizzaStylePreset[] = [
  {
    id: "ny",
    name: "NY-Style",
    tagline: "Thin, foldable, blistered — built for a home steel.",
    hydration: 68,
    saltPercent: 2.5,
    oilPercent: 1.5,
    flourNote: "Bread flour, or 50/50 bread + 00. AP works with a longer mix.",
    defaultBallWeight: 270,
    thicknessFactorOz: null,
    defaultPan: null,
    recHydration: [62, 72],
    bake: {
      tempF: 550,
      surface: "Baking steel, top rack",
      preheat: "45–60 min at 550°F",
      bakeTime: "5–7 min",
      notes:
        "If the bottom chars before the top sets, drop one rack and finish 60–90 s under the broiler.",
    },
  },
  {
    id: "neapolitan",
    name: "Neapolitan",
    tagline: "Puffy leopard-spotted rim — needs a very hot oven.",
    hydration: 70,
    saltPercent: 2.8,
    oilPercent: 0,
    flourNote: "00 pizzeria flour, 12.5%+ protein. No oil in this dough.",
    defaultBallWeight: 260,
    thicknessFactorOz: null,
    defaultPan: null,
    recHydration: [65, 78],
    bake: {
      tempF: 800,
      surface: "Outdoor pizza oven (700–900°F deck)",
      preheat: "Per oven — deck fully saturated",
      bakeTime: "60–90 seconds",
      notes:
        "Below 700°F this dough spreads and gums. In a home oven, bake NY-style instead and keep 68–72%.",
    },
  },
  {
    id: "detroit",
    name: "Detroit / Pan",
    tagline: "Thick, cheesy-edged, baked in a steel pan.",
    hydration: 72,
    saltPercent: 2.5,
    oilPercent: 2.5,
    flourNote: "Bread flour. The pan does the work — oil it well.",
    defaultBallWeight: 500,
    thicknessFactorOz: 0.13,
    defaultPan: { lengthIn: 14, widthIn: 10 },
    recHydration: [68, 75],
    bake: {
      tempF: 500,
      surface: "Oiled steel pan (e.g. 10×14 in)",
      preheat: "Oven only — pan goes in cold with the dough",
      bakeTime: "12–15 min",
      notes:
        "Cheese to the very edge for the caramelized crown. Par-bake 8 min before topping if the center stays pale.",
    },
  },
  {
    id: "sheet",
    name: "Sheet Pan / Bar Pie",
    tagline: "Thin, crisp, weeknight — the low-hydration workhorse.",
    hydration: 60,
    saltPercent: 2.8,
    oilPercent: 2,
    flourNote: "Bread or all-purpose. Forgiving dough, easy stretch.",
    defaultBallWeight: 450,
    thicknessFactorOz: 0.09,
    defaultPan: { lengthIn: 18, widthIn: 13 },
    recHydration: [55, 65],
    bake: {
      tempF: 475,
      surface: "Dark sheet pan",
      preheat: "Oven only",
      bakeTime: "10–12 min",
      notes:
        "Dark pans brown faster — check at 9 min. On a stone at 500°F, 7–9 min.",
    },
  },
];

export const STYLE_BY_ID: Record<PizzaStyle, PizzaStylePreset> =
  Object.fromEntries(PIZZA_STYLES.map((s) => [s.id, s])) as Record<
    PizzaStyle,
    PizzaStylePreset
  >;
