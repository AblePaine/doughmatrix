import type {
  Ingredient,
  MarginBand,
  OrderLine,
  OrderMath,
  PriceCheck,
  PricingDefaults,
  PricingProduct,
  PricingState,
  ProductMath,
  Variant,
  VariantMath,
} from "./types.ts";

/**
 * Pure pricing math — the contract is SPEC §3 of the Dojo prototype
 * (dojo/staging/doughmatrix-pricing-engine/SPEC.md), ported 1:1 and
 * verified against its hand-checked examples in
 * scripts/pricing-math.test.mjs.
 */

export function rowCost(ing: Ingredient): number {
  return (ing.amountUsed || 0) * ((ing.purchasePrice || 0) / Math.max(ing.purchaseQty || 0, 1e-9));
}

export function computeProduct(p: PricingProduct, d: PricingDefaults): ProductMath {
  const ingredientCost = p.ingredients.reduce((s, i) => s + rowCost(i), 0);
  const laborCost = ((p.laborMinutes || 0) / 60) * (d.laborRate || 0);
  const batchCost = ingredientCost + laborCost + (p.overheadPerBatch || 0);
  const sellableUnits = Math.max((p.yieldUnits || 0) * (1 - (p.wastePercent || 0) / 100), 1e-9);
  const unitCost = batchCost / sellableUnits + (p.packagingPerUnit || 0);
  return {
    ingredientCost,
    laborCost,
    batchCost,
    sellableUnits,
    unitCost,
    ingredientUnit: ingredientCost / sellableUnits,
    laborUnit: laborCost / sellableUnits,
    overheadUnit: (p.overheadPerBatch || 0) / sellableUnits,
    packagingUnit: p.packagingPerUnit || 0,
  };
}

/**
 * Price that leaves targetMarginPercent of profit after the channel fee
 * takes its cut. Returns null when margin + fees leave ≤5 points of the
 * price to cover cost — that price doesn't exist.
 */
export function suggestedPrice(
  unitCost: number,
  defaults: PricingDefaults,
  channelFeePercent: number,
): number | null {
  const denom = 1 - defaults.targetMarginPercent / 100 - channelFeePercent / 100;
  return denom <= 0.05 ? null : unitCost / denom;
}

export function markupPrice(unitCost: number, defaults: PricingDefaults): number {
  return unitCost * (1 + defaults.markupPercent / 100);
}

/** Margin status bands: ≥35% safe · 20–35% caution · <20% danger. */
export function marginBand(marginPercent: number): MarginBand {
  if (marginPercent >= 35) return "safe";
  if (marginPercent >= 20) return "caution";
  return "danger";
}

export function priceCheck(unitCost: number, price: number, channelFeePercent: number): PriceCheck {
  const profit = price * (1 - channelFeePercent / 100) - unitCost;
  const marginPercent = price > 0 ? (profit / price) * 100 : 0;
  return { profit, marginPercent, band: marginBand(marginPercent) };
}

export function computeVariant(
  p: PricingProduct,
  d: PricingDefaults,
  v: Variant,
): VariantMath {
  const m = computeProduct(p, d);
  const unitCost = m.unitCost + (v.batchCostDelta || 0) / m.sellableUnits + (v.packagingDelta || 0);
  return { unitCost, suggestedPrice: suggestedPrice(unitCost, d, p.channelFeePercent) };
}

/** Resolve an order line to a sellable item (base product or one variant). */
export function resolveOrderItem(
  state: PricingState,
  line: OrderLine,
): { label: string; price: number; unitCost: number } | null {
  const p = state.products[line.productIndex];
  if (!p) return null;
  const m = computeProduct(p, state.defaults);
  if (line.variantIndex === null || line.variantIndex === undefined) {
    return { label: p.name, price: p.currentPrice, unitCost: m.unitCost };
  }
  const v = p.variants[line.variantIndex];
  if (!v) return null;
  const vm = computeVariant(p, state.defaults, v);
  return {
    label: `${p.name} — ${v.name}`,
    price: vm.suggestedPrice ?? p.currentPrice,
    unitCost: vm.unitCost,
  };
}

export function computeOrder(state: PricingState): OrderMath {
  let revenue = 0;
  let cost = 0;
  for (const line of state.order) {
    const item = resolveOrderItem(state, line);
    if (!item) continue;
    revenue += item.price * line.qty;
    cost += item.unitCost * line.qty;
  }
  const fees = (revenue * state.defaults.orderFeePercent) / 100 + state.defaults.orderFlatFee;
  const profit = revenue - cost - fees;
  const marginPercent = revenue > 0 ? (profit / revenue) * 100 : 0;
  return { revenue, cost, fees, profit, marginPercent, band: marginBand(marginPercent) };
}

/** Round a suggested price up to a chargeable step ($0.25 / $0.50 / $1). */
export function roundUpTo(price: number, step: number): number {
  return Math.ceil(price / step) * step;
}

export function pricingPlaintext(state: PricingState): string {
  const d = state.defaults;
  const lines: string[] = ["DoughMatrix pricing — what to charge"];
  for (const p of state.products) {
    const m = computeProduct(p, d);
    const sugg = suggestedPrice(m.unitCost, d, p.channelFeePercent);
    const check = priceCheck(m.unitCost, p.currentPrice, p.channelFeePercent);
    lines.push(
      `${p.name}: true cost $${m.unitCost.toFixed(2)}/unit over ${m.sellableUnits.toFixed(1)} sellable — ` +
        (sugg === null
          ? "no price hits the target margin after fees"
          : `charge $${sugg.toFixed(2)} for ${d.targetMarginPercent.toFixed(0)}% margin`) +
        ` · at $${p.currentPrice.toFixed(2)} you keep $${check.profit.toFixed(2)} (${check.marginPercent.toFixed(1)}%)`,
    );
    for (const v of p.variants) {
      const vm = computeVariant(p, d, v);
      lines.push(
        `  ${v.name}: cost $${vm.unitCost.toFixed(2)}` +
          (vm.suggestedPrice === null ? "" : ` — charge $${vm.suggestedPrice.toFixed(2)}`),
      );
    }
  }
  if (state.order.length > 0) {
    const o = computeOrder(state);
    lines.push(
      `Order: $${o.revenue.toFixed(2)} revenue − $${o.cost.toFixed(2)} cost − $${o.fees.toFixed(2)} fees = $${o.profit.toFixed(2)} profit (${o.marginPercent.toFixed(1)}%)`,
    );
  }
  return lines.join("\n");
}
