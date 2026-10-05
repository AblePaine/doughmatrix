import { defineEventHandler, getQuery, setHeader } from "h3";
import {
  buildTimeline,
  computeFormula,
  formulaPlaintext,
} from "../../../../src/lib/sourdough/math.ts";
import { normalizeInput } from "../../../utils/sourdough-input.ts";

/**
 * GET /api/sourdough/calculate
 *
 * Same engine as POST, via query params — the zero-friction path for
 * agents and quick checks:
 *
 *   /api/sourdough/calculate?flourWeight=500&targetTrueHydration=75&flourId=bread&doughTempC=24
 *
 * Response: { input, formula, timeline, plaintext }
 */
export default defineEventHandler((event) => {
  const query = getQuery(event) as Record<string, string | undefined>;
  const input = normalizeInput(query);
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
