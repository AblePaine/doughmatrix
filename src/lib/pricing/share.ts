import { normalizePricingState } from "./normalize.ts";
import type { PricingState } from "./types.ts";

/**
 * Share-link encoding for the pricing engine.
 *
 * The other engines share flat scalar state through short query params
 * (see src/lib/engine-search.ts). Pricing state is nested — products with
 * ingredient and variant lists, plus an order — so the state travels as
 * one flat `s` query param holding base64url(JSON), keeping the shared
 * URL a single canonical query string like the other engines. (The Dojo
 * prototype used a `#s=` URL hash instead; the repo's share convention
 * is query params, so this follows the repo.)
 */

export function encodePricingState(state: PricingState): string {
  const json = JSON.stringify(state);
  const bytes = new TextEncoder().encode(json);
  let bin = "";
  bytes.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodePricingState(param: string): PricingState | null {
  try {
    const b64 = param.replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(b64);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    return normalizePricingState(JSON.parse(json));
  } catch {
    return null;
  }
}
