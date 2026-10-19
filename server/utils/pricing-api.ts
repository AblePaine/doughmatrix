import {
  computeOrder,
  computeProduct,
  computeVariant,
  markupPrice,
  priceCheck,
  pricingPlaintext,
  suggestedPrice,
} from "../../src/lib/pricing/math.ts";
import { normalizePricingInput, pricingStateFromQuery } from "./pricing-input.ts";

/**
 * Shared payload builder for the pricing engine's public surfaces.
 *
 * The REST routes (/api/pricing/calculate) and the MCP endpoint (/mcp)
 * both call this, so every agent-facing surface returns numbers from the
 * exact same normalize → compute pipeline as the web engine. No math
 * lives here — this only wires src/lib/pricing/math.ts to transports.
 */

function payloadForState(state: ReturnType<typeof normalizePricingInput>) {
  const products = state.products.map((product) => {
    const math = computeProduct(product, state.defaults);
    return {
      product,
      math,
      suggestedPrice: suggestedPrice(math.unitCost, state.defaults, product.channelFeePercent),
      markupPrice: markupPrice(math.unitCost, state.defaults),
      atCurrentPrice: priceCheck(math.unitCost, product.currentPrice, product.channelFeePercent),
      variants: product.variants.map((variant) => ({
        variant,
        ...computeVariant(product, state.defaults, variant),
      })),
    };
  });
  return {
    input: state,
    products,
    order: state.order.length > 0 ? computeOrder(state) : null,
    plaintext: pricingPlaintext(state),
  };
}

/** POST /api/pricing/calculate and the pricing_calculate MCP tool. */
export function pricingCalculatePayload(raw: unknown) {
  return payloadForState(normalizePricingInput(raw));
}

/** GET /api/pricing/calculate — sample products, defaults overridable. */
export function pricingCalculateQueryPayload(query: Record<string, unknown>) {
  return payloadForState(pricingStateFromQuery(query));
}
