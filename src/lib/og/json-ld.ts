import { absUrl, SITE_ORIGIN } from "./meta";

/**
 * JSON-LD builders for the basics pass. Passed to `socialHead({ jsonLd })`,
 * which serializes them into <script type="application/ld+json"> head tags.
 * Keep shapes conservative: only facts the pages themselves state.
 */

const PUBLISHER = {
  "@type": "Organization",
  name: "DoughMatrix",
  url: `${SITE_ORIGIN}/`,
} as const;

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DoughMatrix",
    url: `${SITE_ORIGIN}/`,
    description:
      "Precision baking calculators and field guides — true hydration, dough temperature, and fermentation timing from real flour data.",
    publisher: PUBLISHER,
  };
}

export function calculatorJsonLd(opts: {
  name: string;
  path: string;
  description: string;
  featureList: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.name,
    url: absUrl(opts.path),
    description: opts.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: opts.featureList,
    publisher: PUBLISHER,
  };
}

export function articleJsonLd(opts: { headline: string; description: string; path: string }) {
  const url = absUrl(opts.path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    // Guide TITLE consts occasionally bake in the site suffix ("| DoughMatrix");
    // an Article headline should be the bare title.
    headline: opts.headline.replace(/\s*[|—–-]\s*DoughMatrix$/, ""),
    description: opts.description,
    url,
    mainEntityOfPage: url,
    author: PUBLISHER,
    publisher: PUBLISHER,
  };
}
