export const SITE_ORIGIN = "https://www.doughmatrix.com";

export const OG_IMAGES = {
  hub: "/images/og/hub.jpg",
  engine: "/images/og/engine-sourdough.jpg",
  flours: "/images/og/flour-index.jpg",
  guides: "/images/og/guides-hub.jpg",
  crumb: "/images/og/guide-crumb-forensics.jpg",
  starter: "/images/og/guide-starter-kinetics.jpg",
  hydration: "/images/og/guide-hydration-ceiling.jpg",
  temp: "/images/og/guide-temp-matrix.jpg",
  autolyse: "/images/og/guide-autolyse.jpg",
} as const;

export function absUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const origin = SITE_ORIGIN.replace(/\/$/, "");
  if (path === "/" || path === "") return `${origin}/`;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function socialHead(opts: {
  title: string;
  description: string;
  path: string;
  image: string;
}) {
  const url = absUrl(opts.path);
  const image = absUrl(opts.image);
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
      { property: "og:image:alt", content: opts.title },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
