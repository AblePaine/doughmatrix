import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import { PIZZA_STYLES, STYLE_BY_ID } from "./styles";
import type { PizzaInput, PizzaStyle, SizeMode, YeastType } from "./types";

export const DEFAULT_PIZZA_INPUT: PizzaInput = {
  style: "ny",
  sizeMode: "balls",
  ballCount: 4,
  ballWeight: 270,
  panLengthIn: 14,
  panWidthIn: 10,
  hydration: 68,
  saltPercent: 2.5,
  oilPercent: 1.5,
  yeastType: "idy",
  starterHydration: 100,
  coldHours: 24,
  roomHours: 2,
  roomTempC: 21,
  doughTempC: 24,
  flourTempC: 20,
  frictionC: 2,
};

type NumericKey =
  | "ballCount"
  | "ballWeight"
  | "panLengthIn"
  | "panWidthIn"
  | "hydration"
  | "saltPercent"
  | "oilPercent"
  | "starterHydration"
  | "coldHours"
  | "roomHours"
  | "roomTempC"
  | "doughTempC"
  | "flourTempC"
  | "frictionC";

const BOUNDS: Record<NumericKey, { min: number; max: number; step: number }> = {
  ballCount: { min: 1, max: 24, step: 1 },
  ballWeight: { min: 150, max: 800, step: 5 },
  panLengthIn: { min: 6, max: 26, step: 0.5 },
  panWidthIn: { min: 6, max: 18, step: 0.5 },
  hydration: { min: 50, max: 85, step: 0.5 },
  saltPercent: { min: 1.5, max: 3.5, step: 0.1 },
  oilPercent: { min: 0, max: 6, step: 0.5 },
  starterHydration: { min: 50, max: 200, step: 5 },
  coldHours: { min: 0, max: 96, step: 1 },
  roomHours: { min: 0, max: 24, step: 0.5 },
  roomTempC: { min: 15, max: 32, step: 0.5 },
  doughTempC: { min: 18, max: 28, step: 0.5 },
  flourTempC: { min: 10, max: 30, step: 0.5 },
  frictionC: { min: 0, max: 12, step: 0.5 },
};

function clampNum(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function roundTo(n: number, step: number) {
  const d = step >= 1 ? 0 : String(step).split(".")[1]?.length ?? 1;
  return Number((Math.round(n / step) * step).toFixed(d));
}

/** Apply a style preset's dough parameters (keeps the user's schedule). */
export function stylePatch(style: PizzaStyle): Partial<PizzaInput> {
  const p = STYLE_BY_ID[style];
  return {
    style,
    hydration: p.hydration,
    saltPercent: p.saltPercent,
    oilPercent: p.oilPercent,
    sizeMode: p.thicknessFactorOz ? "pan" : "balls",
    ballWeight: p.defaultBallWeight,
    panLengthIn: p.defaultPan?.lengthIn ?? 14,
    panWidthIn: p.defaultPan?.widthIn ?? 10,
  };
}

type PizzaStore = PizzaInput & {
  set: (patch: Partial<PizzaInput>) => void;
  bump: (key: NumericKey, delta: number) => void;
  applyStyle: (style: PizzaStyle) => void;
  reset: () => void;
};

export const usePizza = create<PizzaStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_PIZZA_INPUT,
      set: (patch) => {
        const next = { ...patch } as Partial<PizzaInput>;
        (Object.keys(next) as NumericKey[]).forEach((key) => {
          const bounds = BOUNDS[key];
          const value = next[key];
          if (bounds && typeof value === "number") {
            next[key] = clampNum(value, bounds.min, bounds.max);
          }
        });
        set(next);
      },
      bump: (key, delta) => {
        const { min, max, step } = BOUNDS[key];
        set({ [key]: clampNum(roundTo(get()[key] + delta, step), min, max) });
      },
      applyStyle: (style) => set(stylePatch(style)),
      reset: () => set({ ...DEFAULT_PIZZA_INPUT }),
    }),
    { name: "doughmatrix-pizza-v1" },
  ),
);

export function usePizzaInput(): PizzaInput {
  return usePizza(
    useShallow((s) => ({
      style: s.style,
      sizeMode: s.sizeMode,
      ballCount: s.ballCount,
      ballWeight: s.ballWeight,
      panLengthIn: s.panLengthIn,
      panWidthIn: s.panWidthIn,
      hydration: s.hydration,
      saltPercent: s.saltPercent,
      oilPercent: s.oilPercent,
      yeastType: s.yeastType,
      starterHydration: s.starterHydration,
      coldHours: s.coldHours,
      roomHours: s.roomHours,
      roomTempC: s.roomTempC,
      doughTempC: s.doughTempC,
      flourTempC: s.flourTempC,
      frictionC: s.frictionC,
    })),
  );
}

export { PIZZA_STYLES };
export type { PizzaStyle, SizeMode, YeastType };
