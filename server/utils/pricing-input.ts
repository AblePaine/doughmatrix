import { normalizePricingState } from "../../src/lib/pricing/normalize.ts";
import { samplePricingState } from "../../src/lib/pricing/presets.ts";
import type { PricingState } from "../../src/lib/pricing/types.ts";

/**
 * Input normalization for the pricing API. Unlike the sourdough engine
 * (whose defaults live in its zustand store), the pricing defaults and
 * normalizer live in zustand-free modules (src/lib/pricing/), so the
 * server imports them directly — one normalize pipeline for UI and API.
 */

export function normalizePricingInput(raw: unknown): PricingState {
  return normalizePricingState(raw);
}

const DEFAULT_QUERY_KEYS = [
  "laborRate",
  "targetMarginPercent",
  "markupPercent",
  "orderFeePercent",
  "orderFlatFee",
] as const;

/**
 * GET /api/pricing/calculate: the nested pricing state can't ride flat
 * query params, so GET prices the sample products and lets callers
 * override the business defaults (laborRate, targetMarginPercent,
 * markupPercent, orderFeePercent, orderFlatFee) by query param. POST is
 * the full-state surface.
 */
export function pricingStateFromQuery(query: Record<string, unknown>): PricingState {
  const state = samplePricingState();
  const defaults: Record<string, number> = { ...state.defaults };
  for (const key of DEFAULT_QUERY_KEYS) {
    const v = query[key];
    const n =
      typeof v === "number"
        ? v
        : typeof v === "string" && v.trim() !== ""
          ? Number(v)
          : NaN;
    if (Number.isFinite(n)) defaults[key] = n;
  }
  return normalizePricingState({ ...state, defaults });
}
