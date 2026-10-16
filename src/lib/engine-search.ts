import { FLOURS } from "./sourdough/flours";
import { DEFAULT_INPUT } from "./sourdough/store";
import type { BakerInput, Maturity, MixMode } from "./sourdough/types";
import { DEFAULT_PIZZA_INPUT } from "./pizza/store";
import type {
  PizzaInput,
  PizzaStyle,
  SizeMode,
  YeastType,
} from "./pizza/types";

export type EngineSearch = {
  flour?: string;
};

export function parseEngineSearch(raw: Record<string, unknown>): EngineSearch {
  return {
    flour:
      typeof raw.flour === "string" && raw.flour.length > 0
        ? raw.flour
        : undefined,
  };
}

export function hasEngineQuery(search: EngineSearch) {
  return Boolean(search.flour);
}

/* ------------------------------------------------------------------ */
/* Shareable calculator links                                          */
/*                                                                     */
/* Engine state round-trips through short query params, e.g.           */
/*   /engines/sourdough?flour=ww&h=78&fw=750                           */
/*   /engines/pizza?style=detroit&h=72&cold=48                         */
/*                                                                     */
/* The parsed search state is deliberately FLAT — the short params     */
/* themselves, primitives only. TanStack canonicalizes the URL         */
/* against validateSearch's output during SSR, so a nested object      */
/* would be JSON-serialized back into the address bar; flat params     */
/* make a valid shared URL already canonical. Only values that         */
/* differ from the engine defaults are serialized when sharing, so     */
/* a default calculator shares as the bare URL.                        */
/* ------------------------------------------------------------------ */

function parseNum(v: unknown): number | undefined {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

function fmtNum(n: number): string {
  return String(Number(n.toFixed(2)));
}

function oneOf<T extends string>(v: unknown, allowed: readonly T[]): T | undefined {
  return typeof v === "string" && (allowed as readonly string[]).includes(v)
    ? (v as T)
    : undefined;
}

function strParam(v: unknown): string | undefined {
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

/* ------------------------------ sourdough ------------------------------ */

/** Query param → BakerInput field, for every numeric input. */
const SOURDOUGH_NUMERIC_PARAMS = {
  fw: "flourWeight",
  dwt: "doughWeightTarget",
  loaves: "loafCount",
  h: "targetTrueHydration",
  sw: "starterWeight",
  sh: "starterHydration",
  salt: "saltPercent",
  dt: "doughTempC",
  rt: "roomTempC",
  ft: "flourTempC",
  st: "starterTempC",
  fr: "frictionC",
  bp: "blendPercent",
  cpro: "customProtein",
  cceil: "customCeiling",
} as const;

type SourdoughNumericParam = keyof typeof SOURDOUGH_NUMERIC_PARAMS;
type SourdoughNumericKey =
  (typeof SOURDOUGH_NUMERIC_PARAMS)[SourdoughNumericParam];

export type SourdoughSearch = Partial<
  Record<SourdoughNumericParam, number>
> & {
  /** Engine flour id, or an artisan catalog id (deep link). */
  flour?: string;
  mode?: MixMode;
  mat?: Maturity;
  blend?: string;
  cname?: string;
};

export function isEngineFlourId(id: string): boolean {
  return FLOURS.some((f) => f.id === id);
}

export function parseSourdoughSearch(
  raw: Record<string, unknown>,
): SourdoughSearch {
  const search: SourdoughSearch = {};

  for (const param of Object.keys(SOURDOUGH_NUMERIC_PARAMS)) {
    const n = parseNum(raw[param]);
    if (n !== undefined) {
      search[param as SourdoughNumericParam] = n;
    }
  }

  const flour = strParam(raw.flour);
  if (flour) search.flour = flour;
  const mode = oneOf(raw.mode, ["flour", "dough"] as const);
  if (mode) search.mode = mode;
  const mat = oneOf(raw.mat, ["young", "peak", "late"] as const);
  if (mat) search.mat = mat;
  const blend = strParam(raw.blend);
  if (blend) search.blend = blend;
  const cname = strParam(raw.cname);
  if (cname) search.cname = cname.slice(0, 80);

  return search;
}

/** The BakerInput patch a parsed sourdough search state describes. */
export function sourdoughPatchFromSearch(
  search: SourdoughSearch,
): Partial<BakerInput> {
  const patch: Partial<BakerInput> = {};

  for (const [param, key] of Object.entries(SOURDOUGH_NUMERIC_PARAMS) as [
    SourdoughNumericParam,
    SourdoughNumericKey,
  ][]) {
    const n = search[param];
    if (n !== undefined) {
      (patch as Record<string, number>)[key] = n;
    }
  }

  if (search.mode) patch.mixMode = search.mode;
  if (search.mat) patch.maturity = search.mat;
  if (search.blend) patch.blendId = search.blend;
  if (search.cname) patch.customName = search.cname;
  return patch;
}

/** The share params for a sourdough input — non-default values only. */
export function sourdoughShareParams(input: BakerInput): Record<string, string> {
  const params: Record<string, string> = {};
  if (input.flourId !== DEFAULT_INPUT.flourId) params.flour = input.flourId;

  for (const [param, key] of Object.entries(SOURDOUGH_NUMERIC_PARAMS) as [
    string,
    SourdoughNumericKey,
  ][]) {
    if (input[key] !== DEFAULT_INPUT[key]) params[param] = fmtNum(input[key]);
  }

  if (input.mixMode !== DEFAULT_INPUT.mixMode) params.mode = input.mixMode;
  if (input.maturity !== DEFAULT_INPUT.maturity) params.mat = input.maturity;
  if (input.blendId) params.blend = input.blendId;
  if (input.customName !== DEFAULT_INPUT.customName) {
    params.cname = input.customName;
  }
  return params;
}

/* -------------------------------- pizza -------------------------------- */

/** Query param → PizzaInput field, for every numeric input. */
const PIZZA_NUMERIC_PARAMS = {
  balls: "ballCount",
  bw: "ballWeight",
  panl: "panLengthIn",
  panw: "panWidthIn",
  h: "hydration",
  salt: "saltPercent",
  oil: "oilPercent",
  sh: "starterHydration",
  cold: "coldHours",
  room: "roomHours",
  rt: "roomTempC",
  dt: "doughTempC",
  ft: "flourTempC",
  fr: "frictionC",
} as const;

type PizzaNumericParam = keyof typeof PIZZA_NUMERIC_PARAMS;
type PizzaNumericKey = (typeof PIZZA_NUMERIC_PARAMS)[PizzaNumericParam];

export type PizzaSearch = Partial<Record<PizzaNumericParam, number>> & {
  style?: PizzaStyle;
  mode?: SizeMode;
  yeast?: YeastType;
};

export function parsePizzaSearch(raw: Record<string, unknown>): PizzaSearch {
  const search: PizzaSearch = {};

  for (const param of Object.keys(PIZZA_NUMERIC_PARAMS)) {
    const n = parseNum(raw[param]);
    if (n !== undefined) {
      search[param as PizzaNumericParam] = n;
    }
  }

  const style = oneOf(raw.style, [
    "ny",
    "neapolitan",
    "detroit",
    "sheet",
  ] as const);
  if (style) search.style = style;
  const mode = oneOf(raw.mode, ["balls", "pan"] as const);
  if (mode) search.mode = mode;
  const yeast = oneOf(raw.yeast, [
    "idy",
    "ady",
    "fresh",
    "sourdough",
  ] as const);
  if (yeast) search.yeast = yeast;

  return search;
}

/** The PizzaInput patch a parsed pizza search state describes. */
export function pizzaPatchFromSearch(search: PizzaSearch): Partial<PizzaInput> {
  const patch: Partial<PizzaInput> = {};

  for (const [param, key] of Object.entries(PIZZA_NUMERIC_PARAMS) as [
    PizzaNumericParam,
    PizzaNumericKey,
  ][]) {
    const n = search[param];
    if (n !== undefined) {
      (patch as Record<string, number>)[key] = n;
    }
  }

  if (search.style) patch.style = search.style;
  if (search.mode) patch.sizeMode = search.mode;
  if (search.yeast) patch.yeastType = search.yeast;
  return patch;
}

/** The share params for a pizza input — non-default values only. */
export function pizzaShareParams(input: PizzaInput): Record<string, string> {
  const params: Record<string, string> = {};

  for (const [param, key] of Object.entries(PIZZA_NUMERIC_PARAMS) as [
    string,
    PizzaNumericKey,
  ][]) {
    if (input[key] !== DEFAULT_PIZZA_INPUT[key]) {
      params[param] = fmtNum(input[key]);
    }
  }

  if (input.style !== DEFAULT_PIZZA_INPUT.style) params.style = input.style;
  if (input.sizeMode !== DEFAULT_PIZZA_INPUT.sizeMode) {
    params.mode = input.sizeMode;
  }
  if (input.yeastType !== DEFAULT_PIZZA_INPUT.yeastType) {
    params.yeast = input.yeastType;
  }
  return params;
}
