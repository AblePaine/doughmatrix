import { FLOURS } from "../../src/lib/sourdough/flours.ts";
import {
  buildTimeline,
  computeFormula,
  formulaPlaintext,
  rescueOverPour,
} from "../../src/lib/sourdough/math.ts";
import {
  normalizeInput,
  validateSourdoughInput,
} from "./sourdough-input.ts";

/**
 * Shared payload builders for the sourdough engine's public surfaces.
 *
 * The REST routes (/api/sourdough/*) and the MCP endpoint (/mcp) both call
 * these functions, so every agent-facing surface returns numbers from the
 * exact same normalize → compute pipeline. No math lives here — this only
 * wires the engine (src/lib/sourdough/math.ts) to transport-shaped inputs.
 */

/**
 * Caller-error validation failure. The REST routes map it to HTTP 400
 * with `body()` as the response; the MCP layer already surfaces a thrown
 * error's message as an `isError` tool result, so one throw serves both
 * transports honestly.
 */
export class ApiInputError extends Error {
  readonly status = 400;
  readonly code = "invalid_input";
  readonly details: string[];

  constructor(details: string[]) {
    super(details.join(" "));
    this.name = "ApiInputError";
    this.details = details;
  }

  body() {
    return { error: this.code, message: this.message, details: this.details };
  }
}

function assertValidInput(raw: unknown) {
  const errors = validateSourdoughInput(raw);
  if (errors.length > 0) throw new ApiInputError(errors);
}

/** POST/GET /api/sourdough/calculate and the sourdough_calculate MCP tool. */
export function calculatePayload(raw: unknown) {
  assertValidInput(raw);
  const input = normalizeInput(raw);
  const formula = computeFormula(input);
  return {
    input,
    formula,
    timeline: buildTimeline(formula),
    plaintext: formulaPlaintext(formula, input),
  };
}

/** GET /api/sourdough/flours and the sourdough_flours MCP tool. */
export function floursPayload() {
  return { flours: FLOURS };
}

/** POST /api/sourdough/rescue and the sourdough_rescue MCP tool. */
export function rescuePayload(raw: unknown) {
  assertValidInput(raw);
  const body = (
    raw && typeof raw === "object" ? raw : {}
  ) as Record<string, unknown>;
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

  return { input, extraWater, formula, rescue };
}
