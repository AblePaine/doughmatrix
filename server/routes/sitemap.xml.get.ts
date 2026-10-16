import { defineEventHandler, setHeader } from "h3";
import { buildSitemapXml } from "../utils/sitemap.ts";

/**
 * GET /sitemap.xml
 *
 * Generated per request from the app's route data (static routes +
 * PUBLISHED_GUIDES + ARTISAN_FLOURS — see server/utils/sitemap.ts), so it
 * stays correct as guides and flours are added. CDN-cacheable for a day.
 */
export default defineEventHandler((event) => {
  setHeader(event, "content-type", "application/xml; charset=utf-8");
  setHeader(event, "cache-control", "public, max-age=3600, s-maxage=86400");
  return buildSitemapXml();
});
