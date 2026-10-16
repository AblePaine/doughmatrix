import assert from "node:assert/strict";
import { describe, it } from "node:test";
import manifest from "../public/mcp-tools.json" with { type: "json" };
import {
  MCP_SERVER_NAME,
  MCP_SERVER_VERSION,
  MCP_TOOLS,
} from "../server/utils/mcp-tools.ts";

/**
 * The static manifest (public/mcp-tools.json) and the live MCP endpoint
 * (server/routes/mcp.post.ts, fed by server/utils/mcp-tools.ts) must
 * describe the SAME tools. If you edit one, edit the other — this test is
 * the tripwire.
 */
describe("mcp manifest ↔ live endpoint tool parity", () => {
  it("server identity matches the manifest", () => {
    assert.equal(MCP_SERVER_NAME, manifest.name);
    assert.equal(MCP_SERVER_VERSION, manifest.version);
  });

  it("exposes the same tools in the same order", () => {
    assert.deepEqual(
      MCP_TOOLS.map((t) => t.name),
      manifest.tools.map((t) => t.name),
    );
  });

  it("tool descriptions and input schemas are identical", () => {
    for (const [i, tool] of MCP_TOOLS.entries()) {
      const published = manifest.tools[i];
      assert.equal(tool.description, published.description, tool.name);
      assert.deepEqual(tool.inputSchema, published.inputSchema, tool.name);
    }
  });
});
