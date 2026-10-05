export type PizzaStyle = "ny" | "neapolitan" | "detroit" | "sheet";

export type YeastType = "idy" | "ady" | "fresh" | "sourdough";

export type SizeMode = "balls" | "pan";

export type HeatWarning = "ok" | "caution" | "danger";

export type PizzaInput = {
  style: PizzaStyle;
  sizeMode: SizeMode;
  ballCount: number;
  ballWeight: number;
  panLengthIn: number;
  panWidthIn: number;
  hydration: number;
  saltPercent: number;
  oilPercent: number;
  yeastType: YeastType;
  starterHydration: number;
  coldHours: number;
  roomHours: number;
  roomTempC: number;
  doughTempC: number;
  flourTempC: number;
  frictionC: number;
};

export type BakeProfile = {
  tempF: number;
  surface: string;
  preheat: string;
  bakeTime: string;
  notes: string;
};

export type PizzaEvent = {
  id: string;
  label: string;
  detail: string;
  offsetMin: number;
  kind: "mix" | "ferment" | "ball" | "cold" | "warm" | "bake";
};

export type PizzaResult = {
  flourWeight: number;
  waterWeight: number;
  saltWeight: number;
  oilWeight: number;
  yeastWeight: number;
  yeastLabel: string;
  yeastPercent: number;
  starterWeight: number;
  starterFlour: number;
  starterWater: number;
  totalFlour: number;
  totalWater: number;
  doughWeight: number;
  hydration: number;
  waterTempC: number;
  ballCount: number;
  perBallWeight: number;
  panAreaIn2: number | null;
  warning: HeatWarning;
  warningText: string;
  bake: BakeProfile;
  timeline: PizzaEvent[];
  coldEquivHours: number;
};
