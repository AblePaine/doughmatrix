import { resolveFlour } from "./flours";
import type {
  BakerInput,
  BulkWindow,
  DangerLevel,
  FormulaResult,
  Maturity,
  RescueResult,
  TimelineEvent,
} from "./types";

/**
 * Split a starter (preferment) into its flour and water.
 * 100 g at 100% hydration (1:1) → 50 g flour + 50 g water.
 */
export function splitStarter(weight: number, hydrationPct: number) {
  const h = Math.max(0, hydrationPct);
  const flour = weight * (100 / (100 + h));
  return { flour, water: weight - flour };
}

export const BULK_T_REF_C = 24;
export const BULK_T_REF_HOURS = 5.0;
/** Doubling interval (°C) for mixed yeast/LAB culture in the 18–30°C band. */
export const BULK_TAU_C = 8.5;
export const BULK_INOC_REF = 0.2;

const MATURITY_FACTOR: Record<Maturity, number> = {
  young: 1.22,
  peak: 1,
  late: 0.88,
};

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Calibrated temperature-decay bulk window:
 *   t(T) = tRef · 2^((TRef − T) / τ) · (inocRef / inoculation) · maturity
 *
 * tRef = 5.0 h at 24°C with 20% starter (by flour weight) and a peak levain.
 * Window is ±18% around the center for dough feel / starter vigor.
 */
export function bulkWindow(opts: {
  tempC: number;
  inoculation: number;
  maturity: Maturity;
}): BulkWindow {
  const inoc = clamp(opts.inoculation, 0.05, 0.6);
  const tempFactor = Math.pow(2, (BULK_T_REF_C - opts.tempC) / BULK_TAU_C);
  const inocFactor = BULK_INOC_REF / inoc;
  const targetH =
    BULK_T_REF_HOURS * tempFactor * inocFactor * MATURITY_FACTOR[opts.maturity];
  const foldEveryMin = opts.tempC >= 27 ? 25 : opts.tempC <= 21 ? 40 : 30;
  const foldSpanMin = Math.min(120, targetH * 60 * 0.4);
  const foldCount = Math.max(2, Math.round(foldSpanMin / foldEveryMin));
  return {
    minH: targetH * 0.82,
    targetH,
    maxH: targetH * 1.22,
    proofH: targetH * 0.42,
    coldProofMinH: 10,
    coldProofMaxH: 16,
    foldEveryMin,
    foldCount,
  };
}

function dangerFor(trueH: number, ceiling: number): DangerLevel {
  if (trueH >= ceiling) return "danger";
  if (trueH >= ceiling - 4) return "caution";
  return "safe";
}

/**
 * Solve flour weight from a target dough weight when mixing by dough.
 * Dough = totalFlour + totalWater + salt, with true hydration H and
 * starter as a % of flour.
 */
export function flourFromDoughWeight(input: BakerInput): number {
  const H = input.targetTrueHydration / 100;
  const S = input.saltPercent / 100;
  const I = input.starterWeight > 0 && input.flourWeight > 0
    ? input.starterWeight / input.flourWeight
    : 0.2;
  const starterHyd = input.starterHydration;
  const starterFlourPerFlour = (I * 100) / (100 + starterHyd);
  // totalFlour = F * (1 + starterFlourPerFlour)
  // D = totalFlour * (1 + H + S)
  const totalFlour = input.doughWeightTarget / (1 + H + S);
  const F = totalFlour / (1 + starterFlourPerFlour);
  return clamp(F, 50, 20000);
}

export function computeFormula(input: BakerInput): FormulaResult {
  const primary = resolveFlour(input.flourId, {
    name: input.customName,
    protein: input.customProtein,
    ceiling: input.customCeiling,
  });
  const blend =
    input.blendId && input.blendPercent > 0
      ? resolveFlour(input.blendId, {
          name: input.customName,
          protein: input.customProtein,
          ceiling: input.customCeiling,
        })
      : null;

  const p = clamp(input.blendPercent, 0, 80) / 100;
  const ceiling = blend
    ? primary.ceiling * (1 - p) + blend.ceiling * p
    : primary.ceiling;
  const sweetSpot = blend
    ? primary.sweetSpot * (1 - p) + blend.sweetSpot * p
    : primary.sweetSpot;

  let flourWeight = input.flourWeight;
  let starterWeight = input.starterWeight;

  if (input.mixMode === "dough") {
    flourWeight = flourFromDoughWeight(input);
    const inoc =
      input.flourWeight > 0 ? input.starterWeight / input.flourWeight : 0.2;
    starterWeight = flourWeight * inoc;
  }

  const starter = splitStarter(starterWeight, input.starterHydration);
  const totalFlour = flourWeight + starter.flour;
  const totalWater = totalFlour * (input.targetTrueHydration / 100);
  const waterWeight = Math.max(0, totalWater - starter.water);
  const saltWeight = totalFlour * (input.saltPercent / 100);
  const doughWeight = totalFlour + totalWater + saltWeight;
  const bakerHydration = flourWeight > 0 ? (waterWeight / flourWeight) * 100 : 0;
  const trueHydration = totalFlour > 0 ? (totalWater / totalFlour) * 100 : 0;
  const inoculation = flourWeight > 0 ? starterWeight / flourWeight : 0;
  const inoculationOfTotal = totalFlour > 0 ? starter.flour / totalFlour : 0;
  const load = ceiling > 0 ? trueHydration / ceiling : 0;
  const danger = dangerFor(trueHydration, ceiling);
  const bulk = bulkWindow({
    tempC: input.doughTempC,
    inoculation,
    maturity: input.maturity,
  });

  // 4-factor DDT: water = 4·DDT − flour − room − starter − friction
  const waterTempC =
    input.doughTempC * 4 -
    input.flourTempC -
    input.roomTempC -
    input.starterTempC -
    input.frictionC;

  const reserveWater = waterWeight * 0.08;
  const autolyseWater = waterWeight - reserveWater;

  return {
    flourWeight,
    waterWeight,
    starterWeight,
    saltWeight,
    starterFlour: starter.flour,
    starterWater: starter.water,
    totalFlour,
    totalWater,
    doughWeight,
    perLoafWeight: doughWeight / Math.max(1, input.loafCount),
    bakerHydration,
    trueHydration,
    inoculation,
    inoculationOfTotal,
    ceiling,
    sweetSpot,
    load,
    danger,
    margin: ceiling - trueHydration,
    primary,
    blend,
    bulk,
    waterTempC,
    autolyseWater,
    reserveWater,
  };
}

/**
 * Over-pour rescue: restore target true hydration after extra water hits the bowl.
 *
 * extraFlour = (totalWater + ΔW) / (H/100) − totalFlour
 * extraSalt  = extraFlour · salt%
 */
export function rescueOverPour(
  formula: FormulaResult,
  extraWater: number,
  saltPercent: number,
  targetTrueH: number,
): RescueResult {
  const dW = Math.max(0, extraWater);
  const H = targetTrueH / 100;
  const extraFlour = H > 0 ? (formula.totalWater + dW) / H - formula.totalFlour : 0;
  const extraSalt = Math.max(0, extraFlour) * (saltPercent / 100);
  const newTotalFlour = formula.totalFlour + Math.max(0, extraFlour);
  const newTotalWater = formula.totalWater + dW;
  const newTrueHydration = newTotalFlour > 0 ? (newTotalWater / newTotalFlour) * 100 : 0;
  return {
    extraWater: dW,
    extraFlour: Math.max(0, extraFlour),
    extraSalt,
    newDoughWeight: formula.doughWeight + dW + Math.max(0, extraFlour) + extraSalt,
    newTrueHydration,
  };
}

export function buildTimeline(formula: FormulaResult): TimelineEvent[] {
  const { bulk } = formula;
  const events: TimelineEvent[] = [
    {
      id: "autolyse",
      label: "Autolyse",
      detail: `${Math.round(formula.autolyseWater)} g water + flour · hold back ${Math.round(formula.reserveWater)} g`,
      offsetMin: 0,
      kind: "mix",
    },
    {
      id: "mix",
      label: "Mix",
      detail: `Starter, salt, remaining water · DDT water ${formula.waterTempC.toFixed(0)}°C`,
      offsetMin: 30,
      kind: "mix",
    },
  ];
  for (let i = 1; i <= bulk.foldCount; i++) {
    events.push({
      id: `fold-${i}`,
      label: `Fold ${i}`,
      detail: `Coil or stretch-and-fold · every ${bulk.foldEveryMin} min`,
      offsetMin: 30 + i * bulk.foldEveryMin,
      kind: "fold",
    });
  }
  const endBulk = 30 + bulk.targetH * 60;
  events.push({
    id: "shape",
    label: "Shape",
    detail: "Preshape, rest 20 min, final shape into banneton",
    offsetMin: endBulk,
    kind: "shape",
  });
  events.push({
    id: "proof",
    label: "Warm proof",
    detail: `~${formatHours(bulk.proofH)} at dough temp, or cold retard`,
    offsetMin: endBulk + 20,
    kind: "proof",
  });
  events.push({
    id: "bake",
    label: "Bake",
    detail: "Score and load · 20 min covered, 20–25 min open",
    offsetMin: endBulk + 20 + bulk.proofH * 60,
    kind: "bake",
  });
  events.push({
    id: "cold",
    label: "Cold retard option",
    detail: `${bulk.coldProofMinH}–${bulk.coldProofMaxH} h at 4°C after shaping`,
    offsetMin: endBulk + 20,
    kind: "cold",
  });
  return events;
}

export function formatGrams(n: number, digits = 0) {
  const v = Number(n.toFixed(digits));
  return digits === 0 ? String(Math.round(n)) : v.toFixed(digits);
}

export function formatHours(h: number) {
  if (!Number.isFinite(h) || h < 0) return "—";
  if (h === 0) return "0m";
  if (h < 1) return `${Math.max(1, Math.round(h * 60))}m`;
  const hours = Math.floor(h + 1e-9);
  const mins = Math.round((h - hours) * 60);
  if (mins <= 0) return `${hours}h`;
  if (mins >= 60) return `${hours + 1}h`;
  return `${hours}h ${mins}m`;
}

export function formatClock(from: number, offsetMin: number) {
  const d = new Date(from + offsetMin * 60_000);
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export function formulaPlaintext(f: FormulaResult, input: BakerInput) {
  const blend =
    f.blend && input.blendPercent > 0
      ? ` (${Math.round(100 - input.blendPercent)}/${Math.round(input.blendPercent)} ${f.primary.short}/${f.blend.short})`
      : "";
  return [
    "DoughMatrix formula",
    `${formatGrams(f.flourWeight)} g ${f.primary.name}${blend}`,
    `${formatGrams(f.waterWeight)} g water`,
    `${formatGrams(f.starterWeight)} g starter (${formatGrams(input.starterHydration, 0)}% H → ${formatGrams(f.starterFlour)} g flour / ${formatGrams(f.starterWater)} g water)`,
    `${formatGrams(f.saltWeight, 1)} g salt`,
    `True hydration ${f.trueHydration.toFixed(1)}% · baker’s ${f.bakerHydration.toFixed(1)}%`,
    `Ceiling ${f.ceiling.toFixed(0)}% · ${f.danger.toUpperCase()} (${f.margin >= 0 ? "+" : ""}${f.margin.toFixed(1)} pt)`,
    `Dough ${formatGrams(f.doughWeight)} g` +
      (input.loafCount > 1 ? ` · ${input.loafCount} × ${formatGrams(f.perLoafWeight)} g` : ""),
    `Bulk ${formatHours(f.bulk.minH)}–${formatHours(f.bulk.maxH)} at ${input.doughTempC.toFixed(0)}°C (target ${formatHours(f.bulk.targetH)})`,
  ].join("\n");
}
