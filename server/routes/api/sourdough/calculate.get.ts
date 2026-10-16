import { defineEventHandler, getQuery, setHeader } from "h3";
import { calculatePayload } from "../../../utils/sourdough-api.ts";

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
  setHeader(event, "content-type", "application/json; charset=utf-8");
  setHeader(event, "cache-control", "public, max-age=300, s-maxage=600");
  return calculatePayload(query);
});
