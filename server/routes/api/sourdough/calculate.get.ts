import {
  defineEventHandler,
  getQuery,
  setHeader,
  setResponseStatus,
} from "h3";
import {
  ApiInputError,
  calculatePayload,
} from "../../../utils/sourdough-api.ts";

/**
 * GET /api/sourdough/calculate
 *
 * Same engine as POST, via query params — the zero-friction path for
 * agents and quick checks:
 *
 *   /api/sourdough/calculate?flourWeight=500&targetTrueHydration=75&flourId=bread&doughTempC=24
 *
 * Response: { input, formula, timeline, plaintext }
 * Unknown flourId/blendId → 400 { error, message, details } — the flour
 * catalog is closed, so a bad id is rejected rather than substituted.
 */
export default defineEventHandler((event) => {
  const query = getQuery(event) as Record<string, string | undefined>;
  setHeader(event, "content-type", "application/json; charset=utf-8");
  try {
    const payload = calculatePayload(query);
    setHeader(event, "cache-control", "public, max-age=300, s-maxage=600");
    return payload;
  } catch (err) {
    if (err instanceof ApiInputError) {
      setResponseStatus(event, err.status);
      setHeader(event, "cache-control", "no-store");
      return err.body();
    }
    throw err;
  }
});
