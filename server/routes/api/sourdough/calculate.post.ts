import { defineEventHandler, readBody, setHeader } from "h3";
import {
  buildTimeline,
  computeFormula,
  formulaPlaintext,
} from "../../../../src/lib/sourdough/math.ts";
import { normalizeInput } from "../../../utils/sourdough-input.ts";

/**
 * POST /api/sourdough/calculate
 *
 * Agent-consumable sourdough formula engine. Body is a partial BakerInput —
 * every field optional, merged over the UI defaults and clamped to the
 * same bounds the web engine enforces.
 *
 * Example body:
 *   { "flourWeight": 500, "targetTrueHydration": 75, "flourId": "bread",
 *     "doughTempC": 24, "maturity": "peak" }
 *
 * Response: { input, formula, timeline, plaintext }
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}));
  const input = normalizeInput(body);
  const formula = computeFormula(input);
  const timeline = buildTimeline(formula);

  setHeader(event, "content-type", "application/json; charset=utf-8");
  setHeader(event, "cache-control", "public, max-age=300, s-maxage=600");
  return {
    input,
    formula,
    timeline,
    plaintext: formulaPlaintext(formula, input),
  };
});
