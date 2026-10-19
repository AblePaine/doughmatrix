import { defineEventHandler, readBody, setHeader } from "h3";
import { pricingCalculatePayload } from "../../../utils/pricing-api.ts";

/**
 * POST /api/pricing/calculate
 *
 * Agent-consumable pricing engine. Body is a partial pricing state —
 * { defaults?, products?, order? } — every field optional, merged over
 * the sample products and clamped to the same bounds the web engine
 * enforces. A product carries its ingredient rows and variant deltas;
 * order lines reference products/variants by index.
 *
 * Response: { input, products: [{ product, math, suggestedPrice,
 *   markupPrice, atCurrentPrice, variants }], order, plaintext }
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}));
  setHeader(event, "content-type", "application/json; charset=utf-8");
  setHeader(event, "cache-control", "public, max-age=300, s-maxage=600");
  return pricingCalculatePayload(body);
});
