/**
 * Pricing engine types — DoughMatrix's first business engine.
 *
 * A product is costed per batch: ingredients + labor + overhead, divided by
 * the units that actually sell (yield minus waste), plus per-unit packaging.
 * Prices are then derived from that true unit cost — margin on price (after
 * channel fees), with a markup frame shown alongside. See SPEC §3 in the
 * Dojo staging prototype (dojo/staging/doughmatrix-pricing-engine).
 */

export type PricingDefaults = {
  /** Your time, $/hr — the input bakers most often leave at $0 by accident. */
  laborRate: number;
  /** Target gross margin on price, %, after channel fees. */
  targetMarginPercent: number;
  /** Markup % shown side-by-side with the margin price. */
  markupPercent: number;
  /** Order-level card fee % (Square in-person default 2.9). */
  orderFeePercent: number;
  /** Order-level card fee flat $ (Square default 0.30). */
  orderFlatFee: number;
};

export type Ingredient = {
  name: string;
  /** Amount used per batch, in the same unit as purchaseQty. */
  amountUsed: number;
  /** Size of the purchase the price buys (g, count — must match amountUsed). */
  purchaseQty: number;
  /** What that purchase costs, $. */
  purchasePrice: number;
};

export type Variant = {
  name: string;
  /** Extra (or saved) cost for a whole batch of this variant, $. */
  batchCostDelta: number;
  /** Extra packaging cost per unit, $. */
  packagingDelta: number;
};

export type PricingProduct = {
  name: string;
  yieldUnits: number;
  ingredients: Ingredient[];
  laborMinutes: number;
  overheadPerBatch: number;
  /** % of the batch that doesn't sell — cost divides by sellable units only. */
  wastePercent: number;
  packagingPerUnit: number;
  /** Fee this product's sales channel takes out of the price, %. */
  channelFeePercent: number;
  /** The price currently being charged, for the profit/margin check. */
  currentPrice: number;
  variants: Variant[];
};

export type OrderLine = {
  productIndex: number;
  /** Index into the product's variants, or null for the base product. */
  variantIndex: number | null;
  qty: number;
};

export type PricingState = {
  defaults: PricingDefaults;
  activeProduct: number;
  products: PricingProduct[];
  order: OrderLine[];
};

export type ProductMath = {
  ingredientCost: number;
  laborCost: number;
  batchCost: number;
  sellableUnits: number;
  unitCost: number;
  ingredientUnit: number;
  laborUnit: number;
  overheadUnit: number;
  packagingUnit: number;
};

export type MarginBand = "safe" | "caution" | "danger";

export type PriceCheck = {
  profit: number;
  marginPercent: number;
  band: MarginBand;
};

export type VariantMath = {
  unitCost: number;
  suggestedPrice: number | null;
};

export type OrderMath = {
  revenue: number;
  cost: number;
  fees: number;
  profit: number;
  marginPercent: number;
  band: MarginBand;
};
