import { defineEventHandler, readBody, setHeader } from "h3";
import { rescuePayload } from "../../../utils/sourdough-api.ts";

/**
 * POST /api/sourdough/rescue
 *
 * Over-pour rescue: you added too much water to the bowl — how much flour
 * (and salt) restores the target true hydration?
 *
 * Body: partial BakerInput (same as /calculate) + extraWater (grams).
 *   { "flourWeight": 500, "targetTrueHydration": 72, "extraWater": 40 }
 *
 * Response: { input, extraWater, formula, rescue: { extraWater, extraFlour,
 *   extraSalt, newDoughWeight, newTrueHydration } }
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}));
  setHeader(event, "content-type", "application/json; charset=utf-8");
  setHeader(event, "cache-control", "no-store");
  return rescuePayload(body);
});
