import { defineEventHandler, setHeader } from "h3";
import { FLOURS } from "../../../../src/lib/sourdough/flours.ts";

/**
 * GET /api/sourdough/flours
 *
 * The flour catalog behind the engine: id, hydration ceiling, sweet spot,
 * protein, family, notes. Agents use `id` as `flourId` (or `blendId`) in
 * /api/sourdough/calculate. `custom` is a pseudo-entry — pass flourId
 * "custom" plus customName/customProtein/customCeiling to use your own mill.
 */
export default defineEventHandler((event) => {
  setHeader(event, "content-type", "application/json; charset=utf-8");
  setHeader(event, "cache-control", "public, max-age=86400, s-maxage=604800");
  return { flours: FLOURS };
});
