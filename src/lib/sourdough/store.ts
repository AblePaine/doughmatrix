import { resolveArtisanFlour, type ArtisanFlour } from "@/lib/flour-catalog";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import { applyPresetTo, type Preset } from "./presets";
import type { BakerInput, Maturity, MixMode } from "./types";

export const DEFAULT_INPUT: BakerInput = {
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

type BakerStore = BakerInput & {
  bulkStartedAt: number | null;
  set: (patch: Partial<BakerInput>) => void;
  bump: (key: NumericKey, delta: number) => void;
  applyPreset: (preset: Preset) => void;
  loadCatalogFlour: (id: string) => boolean;
  reset: () => void;
  startBulk: () => void;
  clearBulk: () => void;
};

type NumericKey =
  | "flourWeight"
  | "doughWeightTarget"
  | "loafCount"
  | "targetTrueHydration"
  | "starterWeight"
  | "starterHydration"
  | "saltPercent"
  | "doughTempC"
  | "roomTempC"
  | "flourTempC"
  | "starterTempC"
  | "frictionC"
  | "blendPercent"
  | "customProtein"
  | "customCeiling";

const BOUNDS: Record<NumericKey, { min: number; max: number; step: number }> = {
  flourWeight: { min: 50, max: 10000, step: 1 },
  doughWeightTarget: { min: 200, max: 20000, step: 1 },
  loafCount: { min: 1, max: 12, step: 1 },
  targetTrueHydration: { min: 50, max: 110, step: 0.1 },
  starterWeight: { min: 0, max: 2000, step: 1 },
  starterHydration: { min: 50, max: 200, step: 1 },
  saltPercent: { min: 0.5, max: 4, step: 0.1 },
  doughTempC: { min: 10, max: 34, step: 0.5 },
  roomTempC: { min: 8, max: 36, step: 0.5 },
  flourTempC: { min: 4, max: 36, step: 0.5 },
  starterTempC: { min: 8, max: 36, step: 0.5 },
  frictionC: { min: 0, max: 12, step: 0.5 },
  blendPercent: { min: 0, max: 80, step: 1 },
  customProtein: { min: 6, max: 18, step: 0.1 },
  customCeiling: { min: 55, max: 120, step: 0.5 },
};

function roundTo(n: number, step: number) {
  const d = step >= 1 ? 0 : String(step).split(".")[1]?.length ?? 1;
  const r = Math.round(n / step) * step;
  return Number(r.toFixed(d));
}

export const useBaker = create<BakerStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_INPUT,
      bulkStartedAt: null,
      set: (patch) => set(patch),
      bump: (key, delta) => {
        const { min, max, step } = BOUNDS[key];
        const next = roundTo(get()[key] + delta, step);
        set({ [key]: clampNum(next, min, max) });
      },
      applyPreset: (preset) => {
        const flour = get().flourWeight;
        set(applyPresetTo(preset, flour));
      },
      loadCatalogFlour: (id) => {
        const f = resolveArtisanFlour(id);
        if (!f) return false;
        set(catalogPatch(f));
        return true;
      },
      reset: () => set({ ...DEFAULT_INPUT, bulkStartedAt: null }),
      startBulk: () => set({ bulkStartedAt: Date.now() }),
      clearBulk: () => set({ bulkStartedAt: null }),
    }),
    {
      name: "doughmatrix-engine-v1",
      partialize: (s) => {
        const {
          set: _set,
          bump: _bump,
          applyPreset: _ap,
          loadCatalogFlour: _lf,
          reset: _r,
          startBulk: _sb,
          clearBulk: _cb,
          ...rest
        } = s;
        return rest;
      },
    },
  ),
);

function clampNum(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function catalogPatch(f: ArtisanFlour): Partial<BakerInput> {
  return {
    flourId: "custom",
    customName: `${f.brand} ${f.name}`,
    customProtein: f.protein,
    customCeiling: f.maxHydration,
    targetTrueHydration: f.safeHydration,
    blendId: null,
    blendPercent: 0,
  };
}

export function useBakerInput(): BakerInput {
  return useBaker(
    useShallow((s) => ({
      mixMode: s.mixMode,
      flourWeight: s.flourWeight,
      doughWeightTarget: s.doughWeightTarget,
      loafCount: s.loafCount,
      targetTrueHydration: s.targetTrueHydration,
      starterWeight: s.starterWeight,
      starterHydration: s.starterHydration,
      saltPercent: s.saltPercent,
      doughTempC: s.doughTempC,
      roomTempC: s.roomTempC,
      flourTempC: s.flourTempC,
      starterTempC: s.starterTempC,
      frictionC: s.frictionC,
      flourId: s.flourId,
      blendId: s.blendId,
      blendPercent: s.blendPercent,
      customName: s.customName,
      customProtein: s.customProtein,
      customCeiling: s.customCeiling,
      maturity: s.maturity,
    })),
  );
}

export type { MixMode, Maturity };
