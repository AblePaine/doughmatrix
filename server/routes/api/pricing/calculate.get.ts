import { defineEventHandler, getQuery, setHeader } from "h3";
import { pricingCalculateQueryPayload } from "../../../utils/pricing-api.ts";

/**
 * GET /api/pricing/calculate
 *
 * The nested pricing state can't ride flat query params, so GET prices
 * the engine's sample products (cookies + sourdough loaf) and lets
 * callers override the business defaults by query param:
 *
 *   /api/pricing/calculate?laborRate=20&targetMarginPercent=45
 *
 * Use POST for your own products. Response shape matches POST.
 */
export default defineEventHandler((event) => {
  const query = getQuery(event) as Record<string, string | undefined>;
  setHeader(event, "content-type", "application/json; charset=utf-8");
  setHeader(event, "cache-control", "public, max-age=300, s-maxage=600");
  return pricingCalculateQueryPayload(query);
});
