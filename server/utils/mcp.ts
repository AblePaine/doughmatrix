import { MCP_SERVER_NAME, MCP_SERVER_VERSION, MCP_TOOLS } from "./mcp-tools.ts";
import { pricingCalculatePayload } from "./pricing-api.ts";
import {
  calculatePayload,
  floursPayload,
  rescuePayload,
} from "./sourdough-api.ts";

/**
 * Minimal stateless MCP (Model Context Protocol) server over streamable
 * HTTP, hand-rolled JSON-RPC 2.0 — the repo carries no MCP SDK, and the
 * surface is tiny: initialize, ping, tools/list, tools/call for the three
 * sourdough tools plus the pricing tool. Tools dispatch to the same payload builders as the REST
 * API (server/utils/sourdough-api.ts), so numbers can never diverge.
 *
 * Stateless by design: no session id, no server-initiated messages. A POST
 * returns one JSON body (or 202 for notifications); GET is rejected by the
 * route with 405, per the streamable-HTTP spec for servers without an SSE
 * stream.
 */

type JsonRpcId = string | number | null;

type JsonRpcRequest = {
  jsonrpc?: unknown;
  id?: JsonRpcId;
  method?: unknown;
  params?: unknown;
};

export type McpHttpResult = {
  status: number;
  /** Undefined body means "no content" (notification acknowledgement). */
  body?: unknown;
};

const DEFAULT_PROTOCOL_VERSION = "2025-03-26";

function resultResponse(id: JsonRpcId, result: unknown) {
  return { jsonrpc: "2.0", id, result };
}

function errorResponse(id: JsonRpcId, code: number, message: string) {
  return { jsonrpc: "2.0", id, error: { code, message } };
}

function isNotification(req: unknown): boolean {
  return (
    !!req &&
    typeof req === "object" &&
    (req as JsonRpcRequest).id === undefined
  );
}

function callTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "sourdough_calculate":
      return calculatePayload(args);
    case "sourdough_flours":
      return floursPayload();
    case "sourdough_rescue":
      return rescuePayload(args);
    case "pricing_calculate":
      return pricingCalculatePayload(args);
    default:
      return null;
  }
}

function handleRequest(req: JsonRpcRequest): unknown | null {
  if (!req || typeof req !== "object" || typeof req.method !== "string") {
    return errorResponse(
      (req as JsonRpcRequest)?.id ?? null,
      -32600,
      "Invalid request: expected a JSON-RPC 2.0 object with a method.",
    );
  }

  const id = req.id ?? null;
  const params = (
    req.params && typeof req.params === "object" ? req.params : {}
  ) as Record<string, unknown>;

  switch (req.method) {
    case "initialize": {
      const requested = params.protocolVersion;
      return resultResponse(id, {
        protocolVersion:
          typeof requested === "string" && requested !== ""
            ? requested
            : DEFAULT_PROTOCOL_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: MCP_SERVER_NAME, version: MCP_SERVER_VERSION },
        instructions:
          "DoughMatrix engines. sourdough_calculate computes a full formula with true hydration; sourdough_flours lists the flour catalog; sourdough_rescue fixes an over-pour; pricing_calculate prices baked goods from true batch cost (ingredients + labor + overhead over sellable units) with margin/markup prices, variant deltas, and order profit. Same math as the free REST API at https://doughmatrix.com/api.",
      });
    }
    case "ping":
      return resultResponse(id, {});
    case "tools/list":
      return resultResponse(id, { tools: MCP_TOOLS });
    case "tools/call": {
      const name = params.name;
      if (typeof name !== "string" || name === "") {
        return errorResponse(id, -32602, "Invalid params: tools/call needs a tool name.");
      }
      if (!MCP_TOOLS.some((t) => t.name === name)) {
        return errorResponse(id, -32602, `Unknown tool: ${name}`);
      }
      const args = (
        params.arguments && typeof params.arguments === "object"
          ? params.arguments
          : {}
      ) as Record<string, unknown>;
      try {
        const payload = callTool(name, args);
        return resultResponse(id, {
          content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
          isError: false,
        });
      } catch (err) {
        return resultResponse(id, {
          content: [
            {
              type: "text",
              text: err instanceof Error ? err.message : String(err),
            },
          ],
          isError: true,
        });
      }
    }
    default:
      if (isNotification(req)) return null;
      return errorResponse(id, -32601, `Method not found: ${req.method}`);
  }
}

/**
 * Handle one HTTP POST body (already JSON-parsed). Returns the HTTP status
 * and the JSON body to send back, if any.
 */
export function handleMcpPost(parsed: unknown): McpHttpResult {
  // Batch: process each entry; notifications contribute no response.
  if (Array.isArray(parsed)) {
    const responses = parsed
      .map((entry) => {
        if (isNotification(entry)) {
          handleRequest(entry as JsonRpcRequest);
          return null;
        }
        return handleRequest(entry as JsonRpcRequest);
      })
      .filter((r) => r !== null);
    if (responses.length === 0) return { status: 202 };
    return { status: 200, body: responses };
  }

  const req = parsed as JsonRpcRequest;
  if (isNotification(req)) {
    handleRequest(req);
    return { status: 202 };
  }
  return { status: 200, body: handleRequest(req) };
}

export function mcpParseError(): McpHttpResult {
  return { status: 400, body: errorResponse(null, -32700, "Parse error: body must be valid JSON.") };
}

export function mcpMethodNotAllowed(): McpHttpResult {
  return {
    status: 405,
    body: errorResponse(
      null,
      -32601,
      "This MCP endpoint is stateless and POST-only; GET (server stream) is not supported.",
    ),
  };
}
