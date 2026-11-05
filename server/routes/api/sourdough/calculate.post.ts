import {
  defineEventHandler,
  readBody,
  setHeader,
  setResponseStatus,
} from "h3";
import {
  ApiInputError,
  calculatePayload,
} from "../../../utils/sourdough-api.ts";

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
 * Unknown flourId/blendId → 400 { error, message, details } — the flour
 * catalog is closed, so a bad id is rejected rather than substituted.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}));
  setHeader(event, "content-type", "application/json; charset=utf-8");
  try {
    const payload = calculatePayload(body);
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
