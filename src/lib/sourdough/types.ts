export type FlourFamily = "white" | "whole" | "ancient" | "rye" | "specialty";

export type Maturity = "young" | "peak" | "late";

export type DangerLevel = "safe" | "caution" | "danger";

export type Flour = {
  id: string;
  name: string;
  short: string;
  protein: number;
  sweetSpot: number;
  ceiling: number;
  family: FlourFamily;
  notes: string;
};

export type MixMode = "flour" | "dough";

export type BakerInput = {
  mixMode: MixMode;
  flourWeight: number;
  doughWeightTarget: number;
  loafCount: number;
  targetTrueHydration: number;
  starterWeight: number;
  starterHydration: number;
  saltPercent: number;
  doughTempC: number;
  roomTempC: number;
  flourTempC: number;
  starterTempC: number;
  frictionC: number;
  flourId: string;
  blendId: string | null;
  blendPercent: number;
  customName: string;
  customProtein: number;
  customCeiling: number;
  maturity: Maturity;
};

export type BulkWindow = {
  minH: number;
  targetH: number;
  maxH: number;
  proofH: number;
  coldProofMinH: number;
  coldProofMaxH: number;
  foldEveryMin: number;
  foldCount: number;
};

export type FormulaResult = {
  flourWeight: number;
  waterWeight: number;
  starterWeight: number;
  saltWeight: number;
  starterFlour: number;
  starterWater: number;
  totalFlour: number;
  totalWater: number;
  doughWeight: number;
  perLoafWeight: number;
  bakerHydration: number;
  trueHydration: number;
  inoculation: number;
  inoculationOfTotal: number;
  ceiling: number;
  sweetSpot: number;
  load: number;
  danger: DangerLevel;
  margin: number;
  primary: Flour;
  blend: Flour | null;
  bulk: BulkWindow;
  waterTempC: number;
  autolyseWater: number;
  reserveWater: number;
};

export type RescueResult = {
  extraWater: number;
  extraFlour: number;
  extraSalt: number;
  newDoughWeight: number;
  newTrueHydration: number;
};

export type TimelineEvent = {
  id: string;
  label: string;
  detail: string;
  offsetMin: number;
  kind: "mix" | "fold" | "shape" | "proof" | "bake" | "cold";
};
