import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  computeOrder,
  computeProduct,
  computeVariant,
  markupPrice,
  priceCheck,
  roundUpTo,
  rowCost,
  suggestedPrice,
} from "../src/lib/pricing/math.ts";
import { normalizePricingState } from "../src/lib/pricing/normalize.ts";
import {
  DEFAULT_PRICING_DEFAULTS,
  SAMPLE_PRODUCTS,
  samplePricingState,
} from "../src/lib/pricing/presets.ts";
import {
  decodePricingState,
  encodePricingState,
} from "../src/lib/pricing/share.ts";
import { pricingCalculatePayload } from "../server/utils/pricing-api.ts";

/**
 * The pricing engine's math contract is SPEC §3/§4 of the Dojo prototype
 * (dojo/staging/doughmatrix-pricing-engine/SPEC.md). These are its
 * hand-checked examples, ported 1:1 — if a number here changes, the spec
 * or the math is wrong, never the test.
 */

const EPS = 0.005;
function close(actual, expected, label) {
  assert.ok(
    Math.abs(actual - expected) <= EPS,
    `${label}: expected ${expected}, got ${actual}`,
  );
}

const defaults = DEFAULT_PRICING_DEFAULTS;
const [cookies, loaf] = SAMPLE_PRODUCTS;

describe("pricing math — Example 1: chocolate chip cookies", () => {
  const m = computeProduct(cookies, defaults);

  it("ingredient rows cost amountUsed × price ÷ qty", () => {
    close(rowCost(cookies.ingredients[0]), 1.0, "flour");
    close(rowCost(cookies.ingredients[1]), 0.9, "brown sugar");
    close(rowCost(cookies.ingredients[2]), 3.0, "butter");
    close(rowCost(cookies.ingredients[3]), 1.0, "eggs");
    close(rowCost(cookies.ingredients[4]), 2.7, "chips");
    close(rowCost(cookies.ingredients[5]), 0.4, "staples");
  });

  it("batch cost counts labor and overhead, not just ingredients", () => {
    close(m.ingredientCost, 9.0, "ingredient total");
    close(m.laborCost, 13.5, "45 min @ $18/hr");
    close(m.batchCost, 28.5, "batch cost");
  });

  it("unit cost divides by sellable units and adds packaging", () => {
    close(m.sellableUnits, 22.8, "24 × (1 − 5% waste)");
    close(m.unitCost, 1.6, "unit cost");
  });

  it("suggested price hits the target margin after fees", () => {
    close(suggestedPrice(m.unitCost, defaults, cookies.channelFeePercent), 2.91, "1.60 ÷ 0.55");
  });

  it("at $3.00 the cookie keeps $1.25 at 41.7% margin", () => {
    const check = priceCheck(m.unitCost, 3.0, cookies.channelFeePercent);
    close(check.profit, 1.25, "profit");
    assert.ok(Math.abs(check.marginPercent - 41.7) <= 0.05, `margin ${check.marginPercent}`);
    assert.equal(check.band, "safe");
  });

  it("variants price from per-batch deltas at the same margin", () => {
    const dc = computeVariant(cookies, defaults, cookies.variants[0]);
    close(dc.unitCost, 1.66, "double chocolate unit cost");
    close(dc.suggestedPrice, 3.02, "double chocolate price");
    const gf = computeVariant(cookies, defaults, cookies.variants[1]);
    close(gf.unitCost, 1.7, "gluten-free unit cost");
    close(gf.suggestedPrice, 3.09, "gluten-free price");
  });
});

describe("pricing math — Example 2: sourdough loaf", () => {
  const m = computeProduct(loaf, defaults);

  it("ingredient total is $2.30 and flour alone is $1.15 of unit cost", () => {
    close(m.ingredientCost, 2.3, "ingredient total");
    close(m.batchCost, 15.3, "2.30 + 9.00 labor + 4.00 overhead");
    close(m.unitCost, 8.15, "unit cost");
  });

  it("at $14.00 the loaf keeps $5.43 at 38.8% margin", () => {
    const check = priceCheck(m.unitCost, 14.0, loaf.channelFeePercent);
    close(check.profit, 5.43, "14 × 0.97 − 8.15");
    assert.ok(Math.abs(check.marginPercent - 38.8) <= 0.05, `margin ${check.marginPercent}`);
  });
});

describe("pricing math — Example 3: market order", () => {
  it("12 cookies + 1 loaf: $20.90 profit at 41.8% after the Square fee", () => {
    const order = computeOrder(samplePricingState());
    close(order.revenue, 50.0, "revenue");
    close(order.cost, 27.35, "12 × 1.60 + 8.15");
    close(order.fees, 1.75, "50 × 2.9% + $0.30");
    close(order.profit, 20.9, "profit");
    assert.ok(Math.abs(order.marginPercent - 41.8) <= 0.05, `margin ${order.marginPercent}`);
  });
});

describe("pricing math — guards and frames", () => {
  it("no suggested price exists when margin + fees consume the price", () => {
    assert.equal(suggestedPrice(1.6, { ...defaults, targetMarginPercent: 92 }, 5), null);
  });

  it("markup frame is cost × (1 + markup%)", () => {
    close(markupPrice(1.6, defaults), 3.2, "100% markup on $1.60");
  });

  it("roundUpTo charges the next step up", () => {
    close(roundUpTo(2.91, 0.25), 3.0, "to quarters");
    close(roundUpTo(2.91, 0.5), 3.0, "to halves");
    close(roundUpTo(2.91, 1), 3.0, "to dollars");
  });
});

describe("pricing state — normalize, share, API", () => {
  it("normalize clamps out-of-range values and keeps valid ones", () => {
    const s = normalizePricingState({
      defaults: { laborRate: 9999, targetMarginPercent: 40 },
      products: [{ name: "X", yieldUnits: 10, wastePercent: 500 }],
    });
    assert.equal(s.defaults.laborRate, 200);
    assert.equal(s.defaults.targetMarginPercent, 40);
    assert.equal(s.products[0].wastePercent, 90);
  });

  it("share encoding round-trips a full state", () => {
    const state = samplePricingState();
    const decoded = decodePricingState(encodePricingState(state));
    assert.deepEqual(decoded, state);
  });

  it("API payload prices the samples with the same numbers as the web math", () => {
    const payload = pricingCalculatePayload({});
    close(payload.products[0].math.unitCost, 1.6, "cookie unit cost via API");
    close(payload.products[0].suggestedPrice, 2.91, "cookie suggested via API");
    close(payload.products[1].math.unitCost, 8.15, "loaf unit cost via API");
    close(payload.order.profit, 20.9, "order profit via API");
  });
});
