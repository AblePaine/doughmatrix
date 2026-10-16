import { defineEventHandler, readRawBody, setHeader, setResponseStatus } from "h3";
import { handleMcpPost, mcpParseError } from "../utils/mcp.ts";

/**
 * POST /mcp
 *
 * Stateless MCP (Model Context Protocol) endpoint for the sourdough
 * engine — the live counterpart to the static manifest at /mcp-tools.json.
 * JSON-RPC 2.0: initialize, ping, tools/list, tools/call
 * (sourdough_calculate, sourdough_flours, sourdough_rescue). Tools run the
 * same payload builders as the REST API, so the numbers always match
 * /api/sourdough/*. Free, no auth — same as the REST pilot.
 */
export default defineEventHandler(async (event) => {
  setHeader(event, "content-type", "application/json; charset=utf-8");
  setHeader(event, "cache-control", "no-store");

  const rawBody = await readRawBody(event, "utf8").catch(() => undefined);
  const raw =
    typeof rawBody === "string"
      ? rawBody
      : rawBody
        ? new TextDecoder().decode(rawBody)
        : undefined;
  if (!raw) {
    const { status, body } = mcpParseError();
    setResponseStatus(event, status);
    return body;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    const { status, body } = mcpParseError();
    setResponseStatus(event, status);
    return body;
  }

  const { status, body } = handleMcpPost(parsed);
  setResponseStatus(event, status);
  return body ?? null;
});
