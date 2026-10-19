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

function pricingInputSchema(): JsonSchema {
  const tool = MCP_TOOLS.find((t) => t.name === "pricing_calculate");
  return structuredClone(
    tool?.inputSchema ?? { type: "object", properties: {} },
  ) as JsonSchema;
}

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
      title: "DoughMatrix API",
      version: "1.0.0",
      description:
        "Free, no-key access to the DoughMatrix engines — the same math as the web calculators. Sourdough: true hydration (counts the starter's flour and water), per-flour hydration ceilings, 4-factor DDT water temperature, bulk fermentation windows, and over-pour rescue. Pricing: true batch cost (ingredients + labor + overhead over sellable units) turned into margin/markup prices, variant deltas, and order profit. Also available as MCP tools at POST /mcp (see the /mcp path and /mcp-tools.json).",
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
      "/api/pricing/calculate": {
        get: {
          operationId: "pricingCalculateGet",
          summary: "Price the sample products (query params)",
          description:
            "The nested pricing state can't ride flat query params, so GET prices the engine's sample products (chocolate chip cookies + a sourdough loaf). The business defaults — laborRate, targetMarginPercent, markupPercent, orderFeePercent, orderFlatFee — can be overridden by query param. Use POST for your own products.",
          parameters: [
            "laborRate",
            "targetMarginPercent",
            "markupPercent",
            "orderFeePercent",
            "orderFlatFee",
          ].map((name) => ({
            name,
            in: "query",
            required: false,
            schema: { type: "number" },
          })),
          responses: {
            "200": {
              description: "Per-product pricing results plus order profit.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/PricingResponse" },
                },
              },
            },
          },
        },
        post: {
          operationId: "pricingCalculatePost",
          summary: "Price baked goods from true batch cost (JSON body)",
          description:
            "Body is a partial pricing state — every field optional, merged over the sample products and clamped to the engine's bounds. Returns unit cost, suggested margin price, markup price, profit at the current price, variant prices, and whole-order profit after card fees.",
          requestBody: {
            required: false,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/PricingState" },
                example: {
                  defaults: { laborRate: 18, targetMarginPercent: 40 },
                  products: [
                    {
                      name: "Classic Chocolate Chip Cookies",
                      yieldUnits: 24,
                      wastePercent: 5,
                      laborMinutes: 45,
                      overheadPerBatch: 6,
                      packagingPerUnit: 0.35,
                      channelFeePercent: 5,
                      currentPrice: 3,
                      ingredients: [
                        { name: "Flour", amountUsed: 500, purchaseQty: 5000, purchasePrice: 10 },
                        { name: "Butter", amountUsed: 250, purchaseQty: 1000, purchasePrice: 12 },
                      ],
                    },
                  ],
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Per-product pricing results plus order profit.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/PricingResponse" },
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
            "Stateless Model Context Protocol endpoint exposing the same operations as tools: sourdough_calculate, sourdough_flours, sourdough_rescue, pricing_calculate. Supports initialize, ping, tools/list, and tools/call. Tool results carry the REST response payload as JSON text content. The tool definitions also live in the static manifest at /mcp-tools.json. POST only — GET returns 405 (no server stream). No auth.",
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
        PricingState: pricingInputSchema(),
        PricingResponse: {
          type: "object",
          properties: {
            input: {
              type: "object",
              description: "The normalized pricing state that was priced.",
            },
            products: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  product: { type: "object" },
                  math: {
                    type: "object",
                    properties: {
                      ingredientCost: { type: "number" },
                      laborCost: { type: "number" },
                      batchCost: { type: "number" },
                      sellableUnits: { type: "number" },
                      unitCost: { type: "number" },
                      ingredientUnit: { type: "number" },
                      laborUnit: { type: "number" },
                      overheadUnit: { type: "number" },
                      packagingUnit: { type: "number" },
                    },
                  },
                  suggestedPrice: {
                    type: ["number", "null"],
                    description:
                      "Price hitting the target margin after channel fees; null when margin + fees leave no viable price.",
                  },
                  markupPrice: { type: "number" },
                  atCurrentPrice: {
                    type: "object",
                    properties: {
                      profit: { type: "number" },
                      marginPercent: { type: "number" },
                      band: { type: "string", enum: ["safe", "caution", "danger"] },
                    },
                  },
                  variants: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        variant: { type: "object" },
                        unitCost: { type: "number" },
                        suggestedPrice: { type: ["number", "null"] },
                      },
                    },
                  },
                },
              },
            },
            order: {
              allOf: [
                {
                  type: "object",
                  properties: {
                    revenue: { type: "number" },
                    cost: { type: "number" },
                    fees: { type: "number" },
                    profit: { type: "number" },
                    marginPercent: { type: "number" },
                    band: { type: "string", enum: ["safe", "caution", "danger"] },
                  },
                },
              ],
              nullable: true,
            },
            plaintext: { type: "string", description: "Human-readable pricing summary" },
          },
          required: ["input", "products", "order", "plaintext"],
        },
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
