import { defineEventHandler, setHeader } from "h3";
import { buildOpenApiSpec } from "../utils/openapi.ts";

/**
 * GET /openapi.json
 *
 * OpenAPI 3.0 for the public agent surfaces: the sourdough REST API
 * (/api/sourdough/calculate GET+POST, /flours, /rescue) and the MCP
 * endpoint (/mcp). Built per request from the same tool definitions the
 * MCP endpoint serves, so the documents cannot drift from the tools.
 */
export default defineEventHandler((event) => {
  setHeader(event, "content-type", "application/json; charset=utf-8");
  setHeader(event, "cache-control", "public, max-age=3600, s-maxage=86400");
  return buildOpenApiSpec();
});
