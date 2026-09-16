/** Shared OG card copy — used by the JPEG generator and /api/og SVG fallback. */

export const OG_CARDS = [
  {
    file: "hub.jpg",
    category: "Suite",
    title: "Computational Tools &\nScience for Modern Bakers",
  },
  {
    file: "engine-sourdough.jpg",
    category: "Engine",
    title: "Sourdough Hydration &\nFermentation Matrix",
  },
  {
    file: "flour-index.jpg",
    category: "Reference",
    title: "Artisan Flour Absorption\nIndex & Specs",
  },
  {
    file: "guides-hub.jpg",
    category: "Library",
    title: "Field Guides for\nPrecision Grain Craft",
  },
  {
    file: "guide-crumb-forensics.jpg",
    category: "Diagnosis",
    title: "Sourdough Crumb\nForensics",
  },
  {
    file: "guide-starter-kinetics.jpg",
    category: "Levain",
    title: "Starter Feeding Kinetics\n& Levain Scaling",
  },
  {
    file: "guide-hydration-ceiling.jpg",
    category: "Hydration",
    title: "The Flour Hydration\nCeiling",
  },
  {
    file: "guide-temp-matrix.jpg",
    category: "Fermentation",
    title: "Ambient Temp vs.\nStarter % Matrix",
  },
  {
    file: "guide-autolyse.jpg",
    category: "Mix",
    title: "Autolyse vs.\nFermentolyse",
  },
];

const MARK = `<svg viewBox="0 0 40 40" width="220" height="220" fill="none" aria-hidden="true">
  <circle cx="20" cy="21" r="13" stroke="#e5a962" stroke-width="1.6"/>
  <path d="M12.5 18c3.5-6 8-9 14-8" stroke="#e5a962" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M18 11.5c1.2 4.5.2 9-1.5 13.5" stroke="#e5a962" stroke-width="1.4" stroke-linecap="round"/>
</svg>`;

/** @param {string} value */
export function escapeXml(value) {
  return String(value)
    .replaceAll("&", "\x26amp;")
    .replaceAll("<", "\x26lt;")
    .replaceAll(">", "\x26gt;")
    .replaceAll('"', "\x26quot;");
}

/**
 * @param {{ title?: string, category?: string }} [opts]
 */
export function renderOgSvg({
  title = "DoughMatrix",
  category = "Suite",
} = {}) {
  const lines = String(title)
    .split(/\n| — | \| /)
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 3);
  const tspans = lines
    .map(
      (line, i) =>
        `<tspan x="72" dy="${i === 0 ? 0 : 62}">${escapeXml(line)}</tspan>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#121316"/>
  <defs>
    <radialGradient id="g" cx="50%" cy="0%" r="70%">
      <stop offset="0%" stop-color="#e5a962" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#121316" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g transform="translate(900 70)" opacity="0.28">${MARK}</g>
  <rect x="72" y="78" rx="8" width="${Math.max(120, category.length * 13 + 36)}" height="36" fill="rgba(229,169,98,0.14)" stroke="rgba(229,169,98,0.35)"/>
  <text x="90" y="102" fill="#e5a962" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" font-weight="600" letter-spacing="0.14em">${escapeXml(String(category).toUpperCase())}</text>
  <text x="72" y="200" fill="#f4f4f6" font-family="Georgia, 'Iowan Old Style', serif" font-size="52" font-weight="600">${tspans}</text>
  <text x="72" y="560" fill="#f4f4f6" font-family="Georgia, serif" font-size="28">DoughMatrix</text>
  <text x="72" y="592" fill="#6d7380" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18">doughmatrix.com · Precision grain craft</text>
</svg>`;
}
