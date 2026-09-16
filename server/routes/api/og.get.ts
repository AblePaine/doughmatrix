import { defineEventHandler, getQuery, setHeader, setResponseStatus } from "h3";
import { renderOgPng } from "../../../src/lib/og/render-og.ts";

export default defineEventHandler((event) => {
  const q = getQuery(event) as Record<string, string | undefined>;
  const png = renderOgPng({
    title: q.title || "DoughMatrix",
    category: q.category || "BAKING SUITE",
    detail: q.detail,
  });
  setHeader(event, "content-type", "image/png");
  setHeader(event, "cache-control", "public, max-age=86400, s-maxage=604800");
  setHeader(event, "content-length", String(png.length));
  setResponseStatus(event, 200);
  return png;
});
