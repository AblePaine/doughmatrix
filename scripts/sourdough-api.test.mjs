import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { computeFormula } from "../src/lib/sourdough/math.ts";
import {
  ApiInputError,
  calculatePayload,
  rescuePayload,
} from "../server/utils/sourdough-api.ts";
import {
  normalizeInput,
  validateSourdoughInput,
  VALID_FLOUR_IDS,
} from "../server/utils/sourdough-input.ts";
import { handleMcpPost } from "../server/utils/mcp.ts";

/**
 * The agent-facing sourdough surface (REST payload builders + the MCP
 * tools that dispatch to them). Two contracts under test:
 *
 * 1. The API runs the site's own engine — the payload for the worked
 *    example must equal computeFormula's output for the same normalized
 *    input, down to the gram (500 g bread flour, 75% true hydration).
 * 2. Honest validation — numeric fields clamp to the UI's bounds, but an
 *    unknown flourId/blendId is a closed-catalog error (HTTP 400 shape on
 *    REST, isError on MCP), never a silent substitution of bread flour.
 */

const EXAMPLE = {
  flourWeight: 500,
  targetTrueHydration: 75,
  flourId: "bread",
  doughTempC: 24,
};

describe("sourdough API payload — engine parity", () => {
  it("worked example matches the engine's numbers exactly", () => {
    const { formula } = calculatePayload(EXAMPLE);
    assert.equal(formula.flourWeight, 500);
    assert.equal(formula.starterFlour, 50);
    assert.equal(formula.starterWater, 50);
    assert.equal(formula.totalFlour, 550);
    assert.equal(formula.totalWater, 412.5);
    assert.equal(formula.waterWeight, 362.5);
    assert.equal(formula.saltWeight, 11);
    assert.equal(formula.doughWeight, 973.5);
    assert.equal(formula.trueHydration, 75);
    assert.equal(formula.bakerHydration, 72.5);
  });

  it("payload formula is computeFormula over the normalized input", () => {
    const { formula } = calculatePayload(EXAMPLE);
    assert.deepEqual(formula, computeFormula(normalizeInput(EXAMPLE)));
  });

  it("GET-style string values coerce like query params", () => {
    const { input, formula } = calculatePayload({
      flourWeight: "500",
      targetTrueHydration: "75",
      flourId: "bread",
    });
    assert.equal(input.flourWeight, 500);
    assert.equal(formula.waterWeight, 362.5);
  });

  it("out-of-range numerics clamp to the UI bounds instead of erroring", () => {
    const { input } = calculatePayload({ flourWeight: 999999 });
    assert.equal(input.flourWeight, 10000);
  });
});

describe("sourdough API validation — closed flour catalog", () => {
  it("the catalog includes the custom pseudo-entry", () => {
    assert.ok(VALID_FLOUR_IDS.includes("bread"));
    assert.ok(VALID_FLOUR_IDS.includes("custom"));
  });

  it("validateSourdoughInput flags only unknown non-empty ids", () => {
    assert.deepEqual(validateSourdoughInput({ flourId: "bread" }), []);
    assert.deepEqual(validateSourdoughInput({ flourId: "" }), []);
    assert.deepEqual(validateSourdoughInput({}), []);
    assert.deepEqual(validateSourdoughInput(null), []);
    assert.equal(validateSourdoughInput({ flourId: "nosuchflour" }).length, 1);
    assert.equal(
      validateSourdoughInput({ flourId: "bread", blendId: "alsonotreal" })
        .length,
      1,
    );
  });

  it("unknown flourId throws an ApiInputError with the 400 body shape", () => {
    assert.throws(
      () => calculatePayload({ flourId: "nosuchflour" }),
      (err) => {
        assert.ok(err instanceof ApiInputError);
        assert.equal(err.status, 400);
        assert.equal(err.code, "invalid_input");
        const body = err.body();
        assert.equal(body.error, "invalid_input");
        assert.match(body.message, /nosuchflour/);
        assert.match(body.message, /bread/);
        assert.equal(body.details.length, 1);
        return true;
      },
    );
  });

  it("unknown blendId throws too", () => {
    assert.throws(
      () => calculatePayload({ blendId: "nosuchflour", blendPercent: 20 }),
      ApiInputError,
    );
  });

  it("flourId 'custom' is accepted and resolves as the custom flour", () => {
    const { formula } = calculatePayload({ flourId: "custom" });
    assert.equal(formula.primary.id, "custom");
  });

  it("rescue applies the same validation", () => {
    assert.throws(
      () => rescuePayload({ flourId: "nosuchflour", extraWater: 40 }),
      ApiInputError,
    );
    const ok = rescuePayload({ extraWater: 40 });
    assert.ok(ok.rescue.extraFlour > 0);
  });
});

describe("MCP surface — validation errors stay in-band", () => {
  function callTool(name, args) {
    const res = handleMcpPost({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: { name, arguments: args },
    });
    assert.equal(res.status, 200);
    return res.body.result;
  }

  it("sourdough_calculate returns the engine payload as JSON text", () => {
    const result = callTool("sourdough_calculate", EXAMPLE);
    assert.equal(result.isError, false);
    const payload = JSON.parse(result.content[0].text);
    assert.equal(payload.formula.waterWeight, 362.5);
  });

  it("unknown flourId comes back as an isError tool result, not a formula", () => {
    const result = callTool("sourdough_calculate", {
      flourId: "nosuchflour",
    });
    assert.equal(result.isError, true);
    assert.match(result.content[0].text, /Unknown flourId/);
  });
});
