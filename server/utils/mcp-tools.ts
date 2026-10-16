/**
 * MCP tool definitions for the live /mcp endpoint.
 *
 * These MUST stay identical (name, description, inputSchema) to the static
 * manifest in public/mcp-tools.json — scripts/mcp-manifest.test.mjs enforces
 * that the two never drift. Edit both together.
 *
 * Pure data, erasable-syntax only, so plain Node can import this file
 * directly from the manifest test without a build step.
 */

export type McpToolDef = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
};

export const MCP_SERVER_NAME = "doughmatrix-sourdough";
export const MCP_SERVER_VERSION = "1.0.0";

export const MCP_TOOLS: McpToolDef[] = [
  {
    name: "sourdough_calculate",
    description:
      "Compute a complete sourdough formula: flour/water/starter/salt weights, true vs baker's hydration, flour-ceiling safety margin, DDT water temperature, bulk fermentation window with fold schedule, and a step-by-step timeline. All inputs optional — omitted fields use sensible defaults (500g bread flour, 72% true hydration, 20% inoculation, 24°C dough).",
    inputSchema: {
      properties: {
        blendId: {
          description:
            "Optional second flour blended in; set blendPercent > 0 to activate.",
          type: "string",
        },
        blendPercent: {
          description: "Blend flour as % of flour weight (0-80). Default: 0.",
          type: "number",
        },
        customCeiling: {
          description: "Hydration ceiling % for flourId 'custom'. Default: 76.",
          type: "number",
        },
        customName: {
          description: "Name for flourId 'custom'. Default: 'Bag flour'.",
          type: "string",
        },
        customProtein: {
          description: "Protein % for flourId 'custom'. Default: 12.2.",
          type: "number",
        },
        doughTempC: {
          description:
            "Desired dough temperature °C — drives DDT water temp and bulk timing. Range 10-34. Default: 24.",
          type: "number",
        },
        doughWeightTarget: {
          description:
            "Target dough weight in grams; only used when mixMode is 'dough'. Default: 900.",
          type: "number",
        },
        flourId: {
          description:
            "Flour from the catalog — see sourdough_flours. Unknown IDs fall back to bread flour. Use 'custom' with customName/customProtein/customCeiling for your own mill. Default: bread.",
          type: "string",
        },
        flourTempC: {
          description: "Flour temperature °C, for DDT calc. Default: 21.",
          type: "number",
        },
        flourWeight: {
          description: "Flour weight in grams (50-10000). Default: 500.",
          type: "number",
        },
        frictionC: {
          description: "Mixer friction factor °C (0 for hand mixing). Default: 1.",
          type: "number",
        },
        loafCount: {
          description: "Number of loaves; splits dough weight per loaf. Default: 1.",
          type: "number",
        },
        maturity: {
          description:
            "Starter maturity — young needs a longer bulk, late a shorter one. Default: peak.",
          enum: ["young", "peak", "late"],
          type: "string",
        },
        mixMode: {
          description: "Mix by flour weight or target dough weight. Default: flour.",
          enum: ["flour", "dough"],
          type: "string",
        },
        roomTempC: {
          description: "Room temperature °C, for DDT calc. Default: 22.",
          type: "number",
        },
        saltPercent: {
          description: "Salt as % of total flour. Range 0.5-4. Default: 2.",
          type: "number",
        },
        starterHydration: {
          description:
            "Starter hydration % (100 = equal weights flour and water). Default: 100.",
          type: "number",
        },
        starterTempC: {
          description: "Starter temperature °C, for DDT calc. Default: 23.",
          type: "number",
        },
        starterWeight: {
          description: "Ripe starter/levain weight in grams. Default: 100.",
          type: "number",
        },
        targetTrueHydration: {
          description:
            "Target TRUE hydration % — total water / total flour including the starter's flour and water. This is the headline number; baker's % is also returned. Range 50-110. Default: 72.",
          type: "number",
        },
      },
      type: "object",
    },
  },
  {
    name: "sourdough_flours",
    description:
      "List the flour catalog behind the engine: id, name, protein %, hydration sweet spot and ceiling %, family, and notes. Use an id as flourId/blendId in sourdough_calculate.",
    inputSchema: {
      properties: {},
      type: "object",
    },
  },
  {
    name: "sourdough_rescue",
    description:
      "Over-pour rescue: too much water went into the bowl. Given the same inputs as sourdough_calculate plus extraWater (grams), returns how much extra flour and salt restores the target true hydration, plus the new dough weight and true hydration.",
    inputSchema: {
      properties: {
        extraWater: {
          description: "Extra water accidentally added, in grams (0-2000). Required.",
          type: "number",
        },
      },
      type: "object",
    },
  },
];
