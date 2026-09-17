export const SITE_ORIGIN = "https://www.doughmatrix.com";

export const OG_IMAGES = {
  home: "/images/og/home-hub.jpg",
  engine: "/images/og/sourdough-engine.jpg",
  flours: "/images/og/flour-index.jpg",
  crumb: "/images/og/crumb-troubleshooting.jpg",
  starter: "/images/og/starter-kinetics.jpg",
  hydration: "/images/og/hydration-ceiling.jpg",
  autolyse: "/images/og/autolyse-fermentolyse.jpg",
  temp: "/images/og/temp-fermentation.jpg",
} as const;

export function absUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const origin = SITE_ORIGIN.replace(/\/$/, "");
  if (path === "/" || path === "") return `${origin}/`;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function ogCardUrl(opts: {
  title: string;
  category: string;
  detail?: string;
}) {
  const q = [
    `title=${encodeURIComponent(opts.title)}`,
    `category=${encodeURIComponent(opts.category)}`,
  ];
  if (opts.detail) q.push(`detail=${encodeURIComponent(opts.detail)}`);
  return `${SITE_ORIGIN}/api/og?${q.join("&")}`;
}

export function socialHead(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  cardTitle?: string;
  category?: string;
  detail?: string;
}) {
  const url = absUrl(opts.path);
  const image = opts.image
    ? absUrl(opts.image)
    : ogCardUrl({
        title: opts.cardTitle ?? opts.title,
        category: opts.category ?? "BAKING SUITE",
        detail: opts.detail,
      });
  const jpeg = image.endsWith(".jpg") || image.endsWith(".jpeg") || image.endsWith(".png");
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "DoughMatrix" },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: jpeg ? "image/jpeg" : "image/png" },
      { property: "og:image:alt", content: opts.cardTitle ?? opts.title },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
