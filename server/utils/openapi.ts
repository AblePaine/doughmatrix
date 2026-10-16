import { MCP_TOOLS } from "./mcp-tools.ts";

/**
 * OpenAPI 3.0 description of DoughMatrix's public agent surfaces.
 *
 * Served at GET /openapi.json. The BakerInput schema is cloned from the
 * sourdough_calculate tool definition (server/utils/mcp-tools.ts) so the
 * REST spec, the MCP endpoint, and public/mcp-tools.json all describe the
 * same inputs — edit them together.
 */

type JsonSchema = Record<string, unknown>;

function bakerInputSchema(): JsonSchema {
  const tool = MCP_TOOLS.find((t) => t.name === "sourdough_calculate");
  const schema = structuredClone(tool?.inputSchema ?? { type: "object", properties: {} }) as {
    properties: Record<string, JsonSchema>;
    [key: string]: unknown;
  };
  // BakerInput.blendId is `string | null` (null = no blend).
  if (schema.properties.blendId) {
    schema.properties.blendId = { ...schema.properties.blendId, nullable: true };
  }
  return schema;
}

const FLOUR_SCHEMA: JsonSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    short: { type: "string" },
    protein: { type: "number", description: "Protein %" },
    sweetSpot: { type: "number", description: "Hydration sweet spot %" },
    ceiling: { type: "number", description: "Hydration ceiling %" },
    family: {
      type: "string",
      enum: ["white", "whole", "ancient", "rye", "specialty"],
    },
    notes: { type: "string" },
  },
  required: ["id", "name", "protein", "sweetSpot", "ceiling", "family"],
};

const BULK_WINDOW_SCHEMA: JsonSchema = {
  type: "object",
  properties: {
    minH: { type: "number" },
    targetH: { type: "number" },
    maxH: { type: "number" },
    proofH: { type: "number" },
    coldProofMinH: { type: "number" },
    coldProofMaxH: { type: "number" },
    foldEveryMin: { type: "number" },
    foldCount: { type: "number" },
  },
};

const FORMULA_SCHEMA: JsonSchema = {
  type: "object",
  properties: {
    flourWeight: { type: "number" },
    waterWeight: { type: "number" },
    starterWeight: { type: "number" },
    saltWeight: { type: "number" },
    starterFlour: { type: "number" },
    starterWater: { type: "number" },
    totalFlour: { type: "number" },
    totalWater: { type: "number" },
    doughWeight: { type: "number" },
    perLoafWeight: { type: "number" },
    bakerHydration: { type: "number", description: "Baker's % hydration (starter water hidden)" },
    trueHydration: { type: "number", description: "True hydration % — counts the starter's flour and water" },
    inoculation: { type: "number" },
    inoculationOfTotal: { type: "number" },
    ceiling: { type: "number", description: "Effective flour hydration ceiling %" },
    sweetSpot: { type: "number" },
    load: { type: "number" },
    danger: { type: "string", enum: ["safe", "caution", "danger"] },
    margin: { type: "number", description: "Points of true hydration below the ceiling" },
    primary: { $ref: "#/components/schemas/Flour" },
    blend: {
      allOf: [{ $ref: "#/components/schemas/Flour" }],
      nullable: true,
    },
    bulk: { $ref: "#/components/schemas/BulkWindow" },
    waterTempC: { type: "number", description: "DDT water temperature °C" },
    autolyseWater: { type: "number" },
    reserveWater: { type: "number" },
  },
};

const TIMELINE_EVENT_SCHEMA: JsonSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    label: { type: "string" },
    detail: { type: "string" },
    offsetMin: { type: "number" },
    kind: {
      type: "string",
      enum: ["mix", "fold", "shape", "proof", "bake", "cold"],
    },
  },
  required: ["id", "label", "detail", "offsetMin", "kind"],
};

export function buildOpenApiSpec() {
  const bakerInput = bakerInputSchema();
  const properties = (bakerInput.properties ?? {}) as Record<string, JsonSchema>;

  const queryParameters = Object.entries(properties).map(([name, schema]) => ({
    name,
    in: "query",
    required: false,
    description: schema.description,
    schema: {
      type: schema.type,
      ...(Array.isArray(schema.enum) ? { enum: schema.enum } : {}),
    },
  }));

  return {
    openapi: "3.0.3",
    info: {
      title: "DoughMatrix Sourdough API",
      version: "1.0.0",
      description:
        "Free, no-key access to the DoughMatrix sourdough formula engine — the same math as the web calculator. True hydration (counts the starter's flour and water), per-flour hydration ceilings, 4-factor DDT water temperature, bulk fermentation windows, and over-pour rescue. Also available as MCP tools at POST /mcp (see the /mcp path and /mcp-tools.json).",
      contact: { email: "hello@doughmatrix.com" },
    },
    servers: [{ url: "https://doughmatrix.com" }],
    paths: {
      "/api/sourdough/calculate": {
        get: {
          operationId: "sourdoughCalculateGet",
          summary: "Compute a sourdough formula (query params)",
          description:
            "Same engine as POST, via query params. Every field optional; omitted fields use the documented defaults and all values are clamped to the engine's bounds.",
          parameters: queryParameters,
          responses: {
            "200": {
              description: "The computed formula.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/CalculateResponse" },
                },
              },
            },
          },
        },
        post: {
          operationId: "sourdoughCalculatePost",
          summary: "Compute a sourdough formula (JSON body)",
          description:
            "Body is a partial BakerInput — every field optional, merged over the defaults and clamped to the engine's bounds.",
          requestBody: {
            required: false,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/BakerInput" },
                example: {
                  flourWeight: 500,
                  targetTrueHydration: 75,
                  flourId: "bread",
                  doughTempC: 24,
                },
              },
            },
          },
          responses: {
            "200": {
              description: "The computed formula.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/CalculateResponse" },
                },
              },
            },
          },
        },
      },
      "/api/sourdough/flours": {
        get: {
          operationId: "sourdoughFlours",
          summary: "List the flour catalog",
          description:
            "The flour catalog behind the engine. Use an entry's `id` as flourId (or blendId) in calculate. `custom` is a pseudo-entry — pass flourId 'custom' plus customName/customProtein/customCeiling for your own mill.",
          responses: {
            "200": {
              description: "The flour catalog.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/FloursResponse" },
                },
              },
            },
          },
        },
      },
      "/api/sourdough/rescue": {
        post: {
          operationId: "sourdoughRescue",
          summary: "Over-pour rescue",
          description:
            "Too much water went into the bowl: returns how much extra flour and salt restores the target true hydration, plus the new dough weight and true hydration.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RescueRequest" },
                example: { flourWeight: 500, targetTrueHydration: 72, extraWater: 40 },
              },
            },
          },
          responses: {
            "200": {
              description: "The base formula plus the rescue amounts.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/RescueResponse" },
                },
              },
            },
          },
        },
      },
      "/mcp": {
        post: {
          operationId: "mcpEndpoint",
          summary: "MCP endpoint (JSON-RPC 2.0, streamable HTTP)",
          description:
            "Stateless Model Context Protocol endpoint exposing the same three operations as tools: sourdough_calculate, sourdough_flours, sourdough_rescue. Supports initialize, ping, tools/list, and tools/call. Tool results carry the REST response payload as JSON text content. The tool definitions also live in the static manifest at /mcp-tools.json. POST only — GET returns 405 (no server stream). No auth.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/JsonRpcRequest" },
                example: {
                  jsonrpc: "2.0",
                  id: 1,
                  method: "tools/call",
                  params: {
                    name: "sourdough_calculate",
                    arguments: { flourWeight: 500, targetTrueHydration: 75 },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "JSON-RPC response (result or error). Notifications return 202 with no body.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/JsonRpcResponse" },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        BakerInput: bakerInput,
        Flour: FLOUR_SCHEMA,
        BulkWindow: BULK_WINDOW_SCHEMA,
        Formula: FORMULA_SCHEMA,
        TimelineEvent: TIMELINE_EVENT_SCHEMA,
        CalculateResponse: {
          type: "object",
          properties: {
            input: { $ref: "#/components/schemas/BakerInput" },
            formula: { $ref: "#/components/schemas/Formula" },
            timeline: {
              type: "array",
              items: { $ref: "#/components/schemas/TimelineEvent" },
            },
            plaintext: { type: "string", description: "Human-readable formula summary" },
          },
          required: ["input", "formula", "timeline", "plaintext"],
        },
        FloursResponse: {
          type: "object",
          properties: {
            flours: {
              type: "array",
              items: { $ref: "#/components/schemas/Flour" },
            },
          },
          required: ["flours"],
        },
        RescueRequest: {
          allOf: [
            { $ref: "#/components/schemas/BakerInput" },
            {
              type: "object",
              properties: {
                extraWater: {
                  type: "number",
                  description: "Extra water accidentally added, in grams (0-2000). Required.",
                },
              },
              required: ["extraWater"],
            },
          ],
        },
        RescueResponse: {
          type: "object",
          properties: {
            input: { $ref: "#/components/schemas/BakerInput" },
            extraWater: { type: "number" },
            formula: { $ref: "#/components/schemas/Formula" },
            rescue: {
              type: "object",
              properties: {
                extraWater: { type: "number" },
                extraFlour: { type: "number" },
                extraSalt: { type: "number" },
                newDoughWeight: { type: "number" },
                newTrueHydration: { type: "number" },
              },
              required: ["extraWater", "extraFlour", "extraSalt", "newDoughWeight", "newTrueHydration"],
            },
          },
          required: ["input", "extraWater", "formula", "rescue"],
        },
        JsonRpcRequest: {
          type: "object",
          description: "A JSON-RPC 2.0 request. Omit `id` for a notification (no response).",
          properties: {
            jsonrpc: { type: "string", enum: ["2.0"] },
            id: { description: "Request id (string or number). Omit for notifications." },
            method: {
              type: "string",
              enum: ["initialize", "ping", "tools/list", "tools/call"],
            },
            params: { type: "object" },
          },
          required: ["jsonrpc", "method"],
        },
        JsonRpcResponse: {
          type: "object",
          properties: {
            jsonrpc: { type: "string", enum: ["2.0"] },
            id: { description: "Echoes the request id." },
            result: { description: "Method result (present on success)." },
            error: {
              type: "object",
              properties: {
                code: { type: "integer" },
                message: { type: "string" },
              },
            },
          },
          required: ["jsonrpc"],
        },
      },
    },
  };
}
