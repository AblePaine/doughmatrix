import { defineEventHandler, readBody, setHeader } from "h3";
import {
  computeFormula,
  rescueOverPour,
} from "../../../../src/lib/sourdough/math.ts";
import { normalizeInput } from "../../../utils/sourdough-input.ts";

/**
 * POST /api/sourdough/rescue
 *
 * Over-pour rescue: you added too much water to the bowl — how much flour
 * (and salt) restores the target true hydration?
 *
 * Body: partial BakerInput (same as /calculate) + extraWater (grams).
 *   { "flourWeight": 500, "targetTrueHydration": 72, "extraWater": 40 }
 *
 * Response: { input, formula, rescue: { extraWater, extraFlour, extraSalt,
 *   newDoughWeight, newTrueHydration } }
 */
export default defineEventHandler(async (event) => {
  const body = (await readBody(event).catch(() => ({}))) as Record<
    string,
    unknown
  >;
  const input = normalizeInput(body);
  const extraWater =
    typeof body.extraWater === "number" && Number.isFinite(body.extraWater)
      ? Math.max(0, Math.min(2000, body.extraWater))
      : 0;

  const formula = computeFormula(input);
  const rescue = rescueOverPour(
    formula,
    extraWater,
    input.saltPercent,
    input.targetTrueHydration,
  );

  setHeader(event, "content-type", "application/json; charset=utf-8");
  setHeader(event, "cache-control", "no-store");
  return { input, extraWater, formula, rescue };
});
