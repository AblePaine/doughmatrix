import { STYLE_BY_ID } from "./styles";
import type {
  HeatWarning,
  PizzaEvent,
  PizzaInput,
  PizzaResult,
  YeastType,
} from "./types";

export const OZ_TO_G = 28.3495;

/** Clamp helper shared across the pizza math. */
function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Schedule divisor for yeast math. Cold fermentation is deliberately leaner
 * than a time-converted room ferment (flavor builds over long hours with
 * minimal yeast), so the two schedules get their own calibration:
 *
 *   room-temp only: divisor = room hours        (8 h @21°C → 0.30% IDY)
 *   cold involved:  divisor = cold + room×4     (24 h cold → 0.10% IDY)
 *
 * Room hours count 4× in a cold schedule (Q10: ~4× faster at 21°C than 4°C).
 */
function fermentDivisor(input: PizzaInput): number {
  if (input.coldHours === 0) return Math.max(input.roomHours, 2);
  return Math.max(input.coldHours + input.roomHours * 4, 2);
}

/**
 * Cold-equivalent fermentation hours — descriptive stat for the schedule.
 * (Room hours count 4×: fermentation runs ~4× faster at 21°C than at 4°C.)
 */
export function coldEquivHours(input: PizzaInput): number {
  return input.coldHours + input.roomHours * 4;
}

/**
 * Instant-dry-yeast % of flour weight for a fermentation schedule.
 *
 * Calibrated to the guide's working numbers on 400 g flour:
 *   8 h room temp  → 0.30% (1.2 g, same-day dough)
 *   24 h cold     → 0.10% (0.4 g, 24–48 h cold ferment)
 *   48 h cold     → 0.05%
 *   72 h cold     → 0.033%
 *
 * Pure room-temp ferments scale with temperature: warmer needs less yeast.
 */
export function idyPercent(input: PizzaInput): number {
  const divisor = fermentDivisor(input);
  let pct = 2.4 / divisor;
  if (input.coldHours === 0) {
    pct *= Math.pow(2, (21 - input.roomTempC) / 8);
  }
  return clamp(pct, 0.02, 0.6);
}

const YEAST_FACTOR: Record<Exclude<YeastType, "sourdough">, number> = {
  idy: 1,
  ady: 1.25,
  fresh: 3,
};

export const YEAST_LABEL: Record<YeastType, string> = {
  idy: "Instant dry yeast",
  ady: "Active dry yeast",
  fresh: "Fresh yeast",
  sourdough: "Ripe starter",
};

/**
 * Starter as % of flour weight. 24 h cold → 20% (the guide's inoculation);
 * 8 h room temp → 20%; scaling inversely with schedule length either way.
 * 100%-hydration starter assumed unless starterHydration says otherwise.
 */
export function starterPercent(input: PizzaInput): number {
  const divisor = fermentDivisor(input);
  const k = input.coldHours === 0 ? 160 : 480;
  return clamp(k / divisor, 5, 25);
}

function splitStarter(weight: number, hydrationPct: number) {
  const h = Math.max(0, hydrationPct);
  const flour = weight * (100 / (100 + h));
  return { flour, water: weight - flour };
}

export function doughWeightTarget(input: PizzaInput): {
  grams: number;
  panAreaIn2: number | null;
} {
  if (input.sizeMode === "pan") {
    const style = STYLE_BY_ID[input.style];
    const tf = style.thicknessFactorOz ?? 0.12;
    const area = Math.max(1, input.panLengthIn * input.panWidthIn);
    return { grams: area * tf * OZ_TO_G, panAreaIn2: area };
  }
  return {
    grams: Math.max(50, input.ballCount * input.ballWeight),
    panAreaIn2: null,
  };
}

function heatWarningFor(input: PizzaInput): {
  warning: HeatWarning;
  text: string;
} {
  const style = STYLE_BY_ID[input.style];
  const [lo, hi] = style.recHydration;
  const h = input.hydration;
  if (h >= lo && h <= hi) {
    return { warning: "ok", text: "" };
  }
  if (h < lo) {
    const gap = lo - h;
    return {
      warning: gap > 5 ? "danger" : "caution",
      text: `${h.toFixed(0)}% is drier than this style wants (${lo}–${hi}%). Expect a tight, pale crumb — raise hydration or pick Sheet Pan.`,
    };
  }
  const over = h - hi;
  const heat =
    input.style === "neapolitan"
      ? "a 700°F+ deck"
      : input.style === "sheet"
        ? "a 475°F oven"
        : "a 550°F steel";
  return {
    warning: over > 5 ? "danger" : "caution",
    text: `${h.toFixed(0)}% is wetter than this style wants (${lo}–${hi}%). On ${heat} it will spread and gum — drop hydration or bring more heat.`,
  };
}

export function computePizza(input: PizzaInput): PizzaResult {
  const style = STYLE_BY_ID[input.style];
  const H = input.hydration / 100;
  const S = input.saltPercent / 100;
  const O = input.oilPercent / 100;
  const { grams: doughTarget, panAreaIn2 } = doughWeightTarget(input);

  let flourWeight: number;
  let starterWeight = 0;
  let starterFlour = 0;
  let starterWater = 0;
  let yeastWeight = 0;
  let yeastPercent = 0;
  const yeastLabel = YEAST_LABEL[input.yeastType];

  if (input.yeastType === "sourdough") {
    const p = starterPercent(input) / 100;
    const a = (p * 100) / (100 + input.starterHydration);
    flourWeight = doughTarget / ((1 + a) * (1 + H + S + O));
    starterWeight = flourWeight * p;
    const split = splitStarter(starterWeight, input.starterHydration);
    starterFlour = split.flour;
    starterWater = split.water;
  } else {
    const idy = idyPercent(input);
    yeastPercent = idy * YEAST_FACTOR[input.yeastType];
    const Y = yeastPercent / 100;
    flourWeight = doughTarget / (1 + H + S + O + Y);
    yeastWeight = flourWeight * Y;
  }

  const totalFlour = flourWeight + starterFlour;
  const totalWater = totalFlour * H;
  const waterWeight = Math.max(0, totalWater - starterWater);
  const saltWeight = totalFlour * S;
  const oilWeight = totalFlour * O;
  const doughWeight = totalFlour + totalWater + saltWeight + oilWeight + yeastWeight;

  // 3-factor straight-dough DDT: water = 3·DDT − flour − room − friction
  const waterTempC =
    input.doughTempC * 3 - input.flourTempC - input.roomTempC - input.frictionC;

  const { warning, text: warningText } = heatWarningFor(input);

  const ballCount =
    input.sizeMode === "balls" ? Math.max(1, Math.round(input.ballCount)) : 1;
  const perBallWeight =
    input.sizeMode === "balls" ? doughWeight / ballCount : doughWeight;

  const timeline = buildPizzaTimeline(input);

  return {
    flourWeight,
    waterWeight,
    saltWeight,
    oilWeight,
    yeastWeight,
    yeastLabel,
    yeastPercent,
    starterWeight,
    starterFlour,
    starterWater,
    totalFlour,
    totalWater,
    doughWeight,
    hydration: totalFlour > 0 ? (totalWater / totalFlour) * 100 : 0,
    waterTempC,
    ballCount,
    perBallWeight,
    panAreaIn2,
    warning,
    warningText,
    bake: style.bake,
    timeline,
    coldEquivHours: coldEquivHours(input),
  };
}

export function buildPizzaTimeline(input: PizzaInput): PizzaEvent[] {
  const events: PizzaEvent[] = [
    {
      id: "mix",
      label: "Mix",
      detail: `Water at ~${Math.round(input.doughTempC * 3 - input.flourTempC - input.roomTempC - input.frictionC)}°C · mix until ${input.hydration >= 70 ? "smooth (it won't fully clear the bowl)" : "the dough clears the bowl"}`,
      offsetMin: 0,
      kind: "mix",
    },
  ];
  let t = 20; // rest after mix
  if (input.roomHours > 0) {
    events.push({
      id: "room",
      label: "Room ferment",
      detail: `${fmtH(input.roomHours)} at ~${input.roomTempC.toFixed(0)}°C before balling`,
      offsetMin: t,
      kind: "ferment",
    });
    t += input.roomHours * 60;
  }
  events.push({
    id: "ball",
    label: input.sizeMode === "pan" ? "Pan the dough" : "Ball the dough",
    detail:
      input.sizeMode === "pan"
        ? "Press into the oiled pan, cover"
        : "Tight balls, seam down, covered",
    offsetMin: t,
    kind: "ball",
  });
  if (input.coldHours > 0) {
    t += 30;
    events.push({
      id: "cold",
      label: "Cold ferment",
      detail: `${fmtH(input.coldHours)} in the fridge — flavor builds here`,
      offsetMin: t,
      kind: "cold",
    });
    t += input.coldHours * 60;
    events.push({
      id: "warm",
      label: "Warm up",
      detail: "90 min at room temp before baking — cold dough won't stretch",
      offsetMin: t,
      kind: "warm",
    });
    t += 90;
  }
  events.push({
    id: "bake",
    label: "Bake",
    detail: STYLE_BY_ID[input.style].bake.bakeTime,
    offsetMin: t,
    kind: "bake",
  });
  return events;
}

function fmtH(h: number) {
  if (h < 1) return `${Math.round(h * 60)} min`;
  const whole = Math.floor(h);
  const mins = Math.round((h - whole) * 60);
  return mins ? `${whole} h ${mins} min` : `${whole} h`;
}

export function formatYeast(g: number): string {
  if (g < 0.05) return "a pinch";
  if (g < 1) return `${g.toFixed(2)} g`;
  return `${g.toFixed(1)} g`;
}

/** ~3.1 g per tsp of instant dry yeast — for bakers without a 0.1 g scale. */
export function yeastTsp(g: number, yeastType: YeastType): string | null {
  if (yeastType === "fresh" || yeastType === "sourdough" || g < 0.2) return null;
  const tsp = g / 3.1;
  if (tsp < 0.125) return null;
  const rounded = Math.round(tsp * 8) / 8;
  return `≈ ${rounded} tsp`;
}

export function pizzaPlaintext(r: PizzaResult, input: PizzaInput): string {
  const style = STYLE_BY_ID[input.style];
  const lines = [
    `DoughMatrix pizza — ${style.name}`,
    `${r.flourWeight.toFixed(0)} g flour · ${r.waterWeight.toFixed(0)} g water (${input.hydration.toFixed(0)}%)`,
    `${r.saltWeight.toFixed(1)} g salt · ${r.oilWeight.toFixed(1)} g oil`,
  ];
  if (input.yeastType === "sourdough") {
    lines.push(
      `${r.starterWeight.toFixed(0)} g ripe starter (${input.starterHydration.toFixed(0)}% hydration)`,
    );
  } else {
    const tsp = yeastTsp(r.yeastWeight, input.yeastType);
    lines.push(
      `${formatYeast(r.yeastWeight)} ${r.yeastLabel.toLowerCase()}${tsp ? ` ${tsp}` : ""}`,
    );
  }
  lines.push(
    `Water temp ~${r.waterTempC.toFixed(0)}°C for ${input.doughTempC.toFixed(0)}°C dough`,
    input.sizeMode === "pan"
      ? `Pan ${input.panLengthIn}×${input.panWidthIn} in → ${r.doughWeight.toFixed(0)} g dough`
      : `${r.ballCount} × ${r.perBallWeight.toFixed(0)} g balls`,
    `Bake ${style.bake.tempF}°F, ${style.bake.surface} — ${style.bake.bakeTime}`,
  );
  return lines.join("\n");
}
