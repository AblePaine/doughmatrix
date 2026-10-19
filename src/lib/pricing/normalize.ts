import {
  DEFAULT_PRICING_DEFAULTS,
  SAMPLE_PRODUCTS,
  samplePricingState,
} from "./presets.ts";
import type {
  Ingredient,
  OrderLine,
  PricingDefaults,
  PricingProduct,
  PricingState,
  Variant,
} from "./types.ts";

/**
 * Clamp/validate an untrusted pricing state (share link, API body, stored
 * JSON) into a complete, safe PricingState. Unknown keys are ignored,
 * missing pieces fall back to the sample products, numerics are clamped
 * to the bounds the UI enforces. Pure — no zustand/react — so the server
 * API uses this exact function too.
 */

function num(v: unknown, fallback: number, min: number, max: number): number {
  const n = typeof v === "number" && Number.isFinite(v) ? v : fallback;
  return Math.min(max, Math.max(min, n));
}

function str(v: unknown, fallback: string, maxLen = 80): string {
  return typeof v === "string" && v.trim() !== "" ? v.slice(0, maxLen) : fallback;
}

export function normalizeDefaults(raw: unknown): PricingDefaults {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const d = DEFAULT_PRICING_DEFAULTS;
  return {
    laborRate: num(r.laborRate, d.laborRate, 0, 200),
    targetMarginPercent: num(r.targetMarginPercent, d.targetMarginPercent, 0, 95),
    markupPercent: num(r.markupPercent, d.markupPercent, 0, 1000),
    orderFeePercent: num(r.orderFeePercent, d.orderFeePercent, 0, 30),
    orderFlatFee: num(r.orderFlatFee, d.orderFlatFee, 0, 50),
  };
}

export function normalizeIngredient(raw: unknown): Ingredient {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  return {
    name: str(r.name, "Ingredient"),
    amountUsed: num(r.amountUsed, 0, 0, 1e7),
    purchaseQty: num(r.purchaseQty, 1, 1e-9, 1e7),
    purchasePrice: num(r.purchasePrice, 0, 0, 1e6),
  };
}

export function normalizeVariant(raw: unknown): Variant {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  return {
    name: str(r.name, "Variant"),
    batchCostDelta: num(r.batchCostDelta, 0, -1e5, 1e5),
    packagingDelta: num(r.packagingDelta, 0, -1000, 1000),
  };
}

export function normalizeProduct(raw: unknown, fallbackName = "Product"): PricingProduct {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const ingredients = Array.isArray(r.ingredients)
    ? r.ingredients.slice(0, 40).map(normalizeIngredient)
    : [];
  const variants = Array.isArray(r.variants)
    ? r.variants.slice(0, 20).map(normalizeVariant)
    : [];
  return {
    name: str(r.name, fallbackName),
    yieldUnits: num(r.yieldUnits, 1, 1, 10000),
    ingredients,
    laborMinutes: num(r.laborMinutes, 0, 0, 5000),
    overheadPerBatch: num(r.overheadPerBatch, 0, 0, 100000),
    wastePercent: num(r.wastePercent, 0, 0, 90),
    packagingPerUnit: num(r.packagingPerUnit, 0, 0, 1000),
    channelFeePercent: num(r.channelFeePercent, 0, 0, 60),
    currentPrice: num(r.currentPrice, 0, 0, 100000),
    variants,
  };
}

export function normalizePricingState(raw: unknown): PricingState {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const productsDefaulted = !(Array.isArray(r.products) && r.products.length > 0);
  const products = productsDefaulted
    ? structuredClone(SAMPLE_PRODUCTS)
    : (r.products as unknown[])
        .slice(0, 12)
        .map((p, i) => normalizeProduct(p, `Product ${i + 1}`));
  const rawOrder = Array.isArray(r.order)
    ? r.order
    : productsDefaulted
      ? samplePricingState().order
      : [];
  const order: OrderLine[] = Array.isArray(rawOrder)
    ? rawOrder.slice(0, 50).flatMap((l) => {
        if (!l || typeof l !== "object") return [];
        const line = l as Record<string, unknown>;
        const productIndex = Math.floor(num(line.productIndex, -1, -1, products.length - 1));
        if (productIndex < 0) return [];
        const variantRaw = line.variantIndex;
        const variantIndex =
          typeof variantRaw === "number" &&
          Number.isFinite(variantRaw) &&
          products[productIndex].variants[Math.floor(variantRaw)]
            ? Math.floor(variantRaw)
            : null;
        return [
          {
            productIndex,
            variantIndex,
            qty: num(line.qty, 1, 0, 100000),
          },
        ];
      })
    : [];
  const activeProduct = Math.floor(
    num(r.activeProduct, 0, 0, Math.max(0, products.length - 1)),
  );
  return { defaults: normalizeDefaults(r.defaults), activeProduct, products, order };
}
