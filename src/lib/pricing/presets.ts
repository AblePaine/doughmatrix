import type { PricingDefaults, PricingProduct, PricingState } from "./types.ts";

/**
 * Sample products — the SPEC §4 hand-checked examples. A first-time visitor
 * lands on numbers that teach the lesson (flour is $1.15 of the loaf; labor
 * is the cost) instead of empty fields.
 */

export const DEFAULT_PRICING_DEFAULTS: PricingDefaults = {
  laborRate: 18,
  targetMarginPercent: 40,
  markupPercent: 100,
  orderFeePercent: 2.9,
  orderFlatFee: 0.3,
};

export const SAMPLE_PRODUCTS: PricingProduct[] = [
  {
    name: "Classic Chocolate Chip Cookies",
    yieldUnits: 24,
    laborMinutes: 45,
    overheadPerBatch: 6.0,
    wastePercent: 5,
    packagingPerUnit: 0.35,
    channelFeePercent: 5,
    currentPrice: 3.0,
    ingredients: [
      { name: "Flour", amountUsed: 500, purchaseQty: 5000, purchasePrice: 10.0 },
      { name: "Brown sugar", amountUsed: 300, purchaseQty: 1000, purchasePrice: 3.0 },
      { name: "Butter", amountUsed: 250, purchaseQty: 1000, purchasePrice: 12.0 },
      { name: "Eggs", amountUsed: 2, purchaseQty: 12, purchasePrice: 6.0 },
      { name: "Chocolate chips", amountUsed: 300, purchaseQty: 1000, purchasePrice: 9.0 },
      { name: "Pantry staples (salt, vanilla…)", amountUsed: 1, purchaseQty: 1, purchasePrice: 0.4 },
    ],
    variants: [
      { name: "Double Chocolate", batchCostDelta: 1.35, packagingDelta: 0 },
      { name: "Gluten-Free", batchCostDelta: 2.28, packagingDelta: 0 },
    ],
  },
  {
    name: "Sourdough Loaf",
    yieldUnits: 2,
    laborMinutes: 30,
    overheadPerBatch: 4.0,
    wastePercent: 0,
    packagingPerUnit: 0.5,
    channelFeePercent: 3,
    currentPrice: 14.0,
    ingredients: [
      { name: "Bread flour", amountUsed: 1000, purchaseQty: 5000, purchasePrice: 10.0 },
      { name: "Salt, levain, water", amountUsed: 1, purchaseQty: 1, purchasePrice: 0.3 },
    ],
    variants: [],
  },
];

export function samplePricingState(): PricingState {
  return {
    defaults: { ...DEFAULT_PRICING_DEFAULTS },
    activeProduct: 0,
    products: structuredClone(SAMPLE_PRODUCTS),
    order: [
      { productIndex: 0, variantIndex: null, qty: 12 },
      { productIndex: 1, variantIndex: null, qty: 1 },
    ],
  };
}

/**
 * Affiliate slots in the pricing results panel (Tranche 3 ruling: slots
 * YES). Brad's affiliate accounts don't exist yet — hrefs stay as "#"
 * placeholders and no slot renders a real outbound link until he creates
 * the accounts and fills these in.
 */
export const AFFILIATE_SLOTS = [
  {
    id: "bench-scale",
    label: "A 0.1 g bench scale",
    blurb: "Costing by grams starts with a scale that reads them.",
    href: "https://www.amazon.com/dp/B002SVNEWA?tag=doughmatrix-20",
  },
  {
    id: "packaging",
    label: "Bags, boxes & labels",
    blurb: "Packaging is a real per-unit cost — buy it like one.",
    href: "https://www.amazon.com/dp/B09NN3LD12?tag=doughmatrix-20",
  },
  {
    id: "proofing",
    label: "Proofing & bake gear",
    blurb: "The gear the sourdough and pizza engines assume you own.",
    href: "https://www.amazon.com/dp/B0CKTJX16P?tag=doughmatrix-20",
  },
] as const;
