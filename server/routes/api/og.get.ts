import { defineEventHandler, getQuery, setHeader } from "h3";
import { OG_CARDS, renderOgSvg } from "../../../src/lib/og/card.mjs";

/**
 * Dynamic OG fallback: /api/og?title=...&category=...
 * Known cards also accept ?file=engine-sourdough (no extension).
 * Scrapers should use the static 1200×630 JPEGs; this SVG is the live renderer.
 */
export default defineEventHandler((event) => {
  const q = getQuery(event) as Record<string, string | undefined>;
  const file = String(q.file ?? "").replace(/\.jpg$/i, "");
  const mapped = file
    ? OG_CARDS.find((c) => c.file.replace(/\.jpg$/i, "") === file)
    : undefined;
  const svg = renderOgSvg({
    title: mapped?.title ?? q.title ?? "DoughMatrix",
    category: mapped?.category ?? q.category ?? "Suite",
  });
  setHeader(event, "content-type", "image/svg+xml; charset=utf-8");
  setHeader(event, "cache-control", "public, max-age=86400");
  return svg;
});
