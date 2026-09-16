import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";
import { OG_CARDS, renderOgSvg } from "../src/lib/og/card.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public/images/og");
const FONT_OUTFIT = join(
  ROOT,
  "node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2",
);
const FONT_FRAUNCES = join(
  ROOT,
  "node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2",
);

function cardHtml({ category, title }) {
  const lines = title.split("\n").map(
    (line) => `<div>${line.replaceAll("&", "&")}</div>`,
  );
  const outfit = pathToFileURL(FONT_OUTFIT).href;
  const fraunces = pathToFileURL(FONT_FRAUNCES).href;
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<style>
@font-face { font-family: Outfit; src: url("${outfit}") format("woff2"); font-weight: 100 900; }
@font-face { font-family: Fraunces; src: url("${fraunces}") format("woff2"); font-weight: 100 900; }
html, body { margin: 0; width: 1200px; height: 630px; background: #121316; color: #f4f4f6; }
body {
  font-family: Outfit, ui-sans-serif, system-ui, sans-serif;
  background:
    radial-gradient(ellipse 80% 55% at 50% -10%, rgb(229 169 98 / 0.16), transparent 55%),
    #121316;
  overflow: hidden;
}
.wrap { position: relative; width: 1200px; height: 630px; box-sizing: border-box; padding: 72px; }
.badge {
  display: inline-block;
  color: #e5a962;
  background: rgb(229 169 98 / 0.14);
  box-shadow: 0 0 0 1px rgb(229 169 98 / 0.35);
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
h1 {
  margin: 36px 0 0;
  font-family: Fraunces, Georgia, serif;
  font-size: 58px;
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.02em;
  max-width: 820px;
}
.brand { position: absolute; left: 72px; bottom: 64px; }
.brand strong {
  display: block;
  font-family: Fraunces, Georgia, serif;
  font-size: 28px;
  font-weight: 600;
}
.brand span { display: block; margin-top: 8px; color: #6d7380; font-size: 18px; }
.mark { position: absolute; right: 64px; top: 56px; opacity: 0.28; }
</style>
</head>
<body>
  <div class="wrap">
    <div class="badge">${category}</div>
    <h1>${lines.join("")}</h1>
    <div class="brand">
      <strong>DoughMatrix</strong>
      <span>doughmatrix.com · Precision grain craft</span>
    </div>
    <svg class="mark" viewBox="0 0 40 40" width="240" height="240" fill="none">
      <circle cx="20" cy="21" r="13" stroke="#e5a962" stroke-width="1.6"/>
      <path d="M12.5 18c3.5-6 8-9 14-8" stroke="#e5a962" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M18 11.5c1.2 4.5.2 9-1.5 13.5" stroke="#e5a962" stroke-width="1.4" stroke-linecap="round"/>
    </svg>
  </div>
</body>
</html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await mkdir(OUT, { recursive: true });

for (const card of OG_CARDS) {
  await writeFile(
    join(OUT, card.file.replace(/\.jpg$/, ".svg")),
    renderOgSvg(card),
  );
  await page.setContent(cardHtml(card), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: join(OUT, card.file),
    type: "jpeg",
    quality: 88,
  });
  console.log("wrote", card.file);
}

const hub = OG_CARDS.find((c) => c.file === "hub.jpg");
if (hub) {
  await page.setContent(cardHtml(hub), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
}
await page.screenshot({
  path: join(ROOT, "public/og.jpg"),
  type: "jpeg",
  quality: 88,
});
await browser.close();
