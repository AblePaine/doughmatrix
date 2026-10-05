import type { BakerInput, Maturity, MixMode } from "../../../src/lib/sourdough/types.ts";

/**
 * Server-side copy of the UI's DEFAULT_INPUT + BOUNDS
 * (src/lib/sourdough/store.ts). Duplicated rather than imported so the
 * server bundle never pulls in zustand/react.
 */
export const DEFAULT_API_INPUT: BakerInput = {
  mixMode: "flour",
  flourWeight: 500,
  doughWeightTarget: 900,
  loafCount: 1,
  targetTrueHydration: 72,
  starterWeight: 100,
  starterHydration: 100,
  saltPercent: 2,
  doughTempC: 24,
  roomTempC: 22,
  flourTempC: 21,
  starterTempC: 23,
  frictionC: 1,
  flourId: "bread",
  blendId: null,
  blendPercent: 0,
  customName: "Bag flour",
  customProtein: 12.2,
  customCeiling: 76,
  maturity: "peak",
};

const NUMERIC_BOUNDS: Record<string, { min: number; max: number }> = {
  flourWeight: { min: 50, max: 10000 },
  doughWeightTarget: { min: 200, max: 20000 },
  loafCount: { min: 1, max: 12 },
  targetTrueHydration: { min: 50, max: 110 },
  starterWeight: { min: 0, max: 2000 },
  starterHydration: { min: 50, max: 200 },
  saltPercent: { min: 0.5, max: 4 },
  doughTempC: { min: 10, max: 34 },
  roomTempC: { min: 8, max: 36 },
  flourTempC: { min: 4, max: 36 },
  starterTempC: { min: 8, max: 36 },
  frictionC: { min: 0, max: 12 },
  blendPercent: { min: 0, max: 80 },
  customProtein: { min: 6, max: 18 },
  customCeiling: { min: 55, max: 120 },
};

const NUMERIC_KEYS = Object.keys(NUMERIC_BOUNDS);

function toNumber(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

/**
 * Merge a partial, untrusted input (JSON body or query params) over the
 * defaults, clamping numerics to the same bounds the UI enforces and
 * validating enums. Unknown keys are ignored.
 */
export function normalizeInput(raw: unknown): BakerInput {
  const input: BakerInput = { ...DEFAULT_API_INPUT };
  if (!raw || typeof raw !== "object") return input;
  const r = raw as Record<string, unknown>;

  for (const key of NUMERIC_KEYS) {
    const n = toNumber(r[key]);
    if (n !== null) {
      const { min, max } = NUMERIC_BOUNDS[key];
      (input as unknown as Record<string, number>)[key] = Math.min(
        max,
        Math.max(min, n),
      );
    }
  }

  if (r.mixMode === "flour" || r.mixMode === "dough") {
    input.mixMode = r.mixMode as MixMode;
  }
  if (r.maturity === "young" || r.maturity === "peak" || r.maturity === "late") {
    input.maturity = r.maturity as Maturity;
  }
  if (typeof r.flourId === "string" && r.flourId.trim() !== "") {
    input.flourId = r.flourId.trim();
  }
  if (typeof r.blendId === "string") {
    input.blendId = r.blendId.trim() === "" ? null : r.blendId.trim();
  }
  if (typeof r.customName === "string" && r.customName.trim() !== "") {
    input.customName = r.customName.slice(0, 80);
  }
  // Round loafCount to a whole loaf — agents send 2.0, 1.5, etc.
  input.loafCount = Math.max(1, Math.round(input.loafCount));

  return input;
}
