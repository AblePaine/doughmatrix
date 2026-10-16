import { ARTISAN_FLOURS } from "../../src/lib/flour-catalog.ts";
import { PUBLISHED_GUIDES } from "../../src/lib/guides.ts";
import { absUrl } from "../../src/lib/og/meta.ts";

/**
 * Sitemap source of truth: static routes are listed once here; guide and
 * flour URLs are derived from the same data modules the pages render from
 * (PUBLISHED_GUIDES / ARTISAN_FLOURS), so new guides and flours appear in
 * the sitemap automatically. Served by server/routes/sitemap.xml.get.ts.
 */

type SitemapEntry = {
  path: string;
  changefreq: "weekly" | "monthly";
  priority: string;
};

const STATIC_ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/engines/sourdough", changefreq: "weekly", priority: "0.9" },
  { path: "/engines/pizza", changefreq: "weekly", priority: "0.9" },
  { path: "/flours", changefreq: "monthly", priority: "0.8" },
  { path: "/guides", changefreq: "weekly", priority: "0.8" },
];

export function sitemapEntries(): SitemapEntry[] {
  return [
    ...STATIC_ENTRIES,
    ...PUBLISHED_GUIDES.map((g): SitemapEntry => ({
      path: g.to,
      changefreq: "monthly",
      priority: "0.7",
    })),
    ...ARTISAN_FLOURS.map((f): SitemapEntry => ({
      path: `/flours/${f.id}`,
      changefreq: "monthly",
      priority: "0.6",
    })),
  ];
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildSitemapXml(): string {
  const urls = sitemapEntries()
    .map(
      (e) =>
        `  <url>\n    <loc>${escapeXml(absUrl(e.path))}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
