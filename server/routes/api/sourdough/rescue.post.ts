import {
  defineEventHandler,
  readBody,
  setHeader,
  setResponseStatus,
} from "h3";
import {
  ApiInputError,
  rescuePayload,
} from "../../../utils/sourdough-api.ts";

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
 * Unknown flourId/blendId → 400 { error, message, details } (same as
 * /calculate — the flour catalog is closed).
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}));
  setHeader(event, "content-type", "application/json; charset=utf-8");
  setHeader(event, "cache-control", "no-store");
  try {
    return rescuePayload(body);
  } catch (err) {
    if (err instanceof ApiInputError) {
      setResponseStatus(event, err.status);
      return err.body();
    }
    throw err;
  }
});
