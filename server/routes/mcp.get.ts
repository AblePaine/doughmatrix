import { defineEventHandler, setHeader, setResponseStatus } from "h3";
import { mcpMethodNotAllowed } from "../utils/mcp.ts";

/**
 * GET /mcp — the endpoint is stateless and POST-only; there is no
 * server-initiated SSE stream to open. Returns 405 with a JSON-RPC error
 * body so MCP clients can tell this apart from a missing endpoint.
 */
export default defineEventHandler((event) => {
  setHeader(event, "content-type", "application/json; charset=utf-8");
  setHeader(event, "cache-control", "no-store");
  const { status, body } = mcpMethodNotAllowed();
  setResponseStatus(event, status);
  return body;
});
