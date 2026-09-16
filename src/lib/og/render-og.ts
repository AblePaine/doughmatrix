import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { SANS_BOLD_B64 } from "./font-sans-bold.ts";
import { SANS_REGULAR_B64 } from "./font-sans-regular.ts";

export type OgCardInput = {
  title: string;
  category: string;
  detail?: string;
};

const WIDTH = 1200;
const HEIGHT = 630;

function clip(value: string, max: number) {
  const chars = [...String(value ?? "")];
  if (chars.length <= max) return chars.join("");
  return `${chars.slice(0, max - 1).join("")}…`;
}

function wrapLines(text: string, maxChars: number, maxLines: number) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const word of words) {
    const next = cur ? `${cur} ${word}` : word;
    if (next.length > maxChars && cur) {
      lines.push(cur);
      cur = word;
      if (lines.length === maxLines) break;
    } else {
      cur = next;
    }
  }
  if (lines.length < maxLines && cur) lines.push(cur);
  return lines.slice(0, maxLines);
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "\x26amp;")
    .replaceAll("<", "\x26lt;")
    .replaceAll(">", "\x26gt;")
    .replaceAll('"', "\x26quot;");
}

function titleFontSize(title: string) {
  if (title.length > 90) return 40;
  if (title.length > 70) return 46;
  if (title.length > 48) return 54;
  return 64;
}

const MARK = `<g fill="none" stroke="#e5a962" stroke-width="1.7">
  <circle cx="20" cy="21" r="13"/>
  <path d="M12.5 18c3.5-6 8-9 14-8" stroke-linecap="round"/>
  <path d="M18 11.5c1.2 4.5.2 9-1.5 13.5" stroke-width="1.5" stroke-linecap="round"/>
</g>`;

export function renderOgSvg({ title, category, detail }: OgCardInput) {
  const safeTitle = clip(title || "DoughMatrix", 140);
  const safeCategory = clip((category || "SUITE").toUpperCase(), 32);
  const safeDetail = clip(detail ?? "", 90);
  const size = titleFontSize(safeTitle);
  const maxChars = size >= 60 ? 28 : size >= 50 ? 34 : 42;
  const lines = wrapLines(safeTitle, maxChars, 4);
  const lineH = Math.round(size * 1.12);
  const titleBlock = lines
    .map(
      (line, i) =>
        `<text x="64" y="${228 + i * lineH}" fill="#f4f4f6" font-family="Liberation Sans" font-size="${size}" font-weight="700">${escapeXml(line)}</text>`,
    )
    .join("");
  const detailY = 228 + lines.length * lineH + 28;
  const badgeW = Math.max(168, safeCategory.length * 16 + 48);

  const grid = Array.from({ length: 16 }, (_, i) => {
    const x = 64 + i * 72;
    return `<line x1="${x}" y1="560" x2="${x}" y2="590" stroke="#e5a962" stroke-opacity="0.12" stroke-width="1"/>`;
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#121316"/>
  <defs>
    <radialGradient id="glow" cx="78%" cy="8%" r="60%">
      <stop offset="0%" stop-color="#e5a962" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#121316" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
  <rect x="0" y="0" width="8" height="${HEIGHT}" fill="#e5a962"/>
  <g transform="translate(64 52) scale(1.35)">${MARK}</g>
  <text x="128" y="86" fill="#f4f4f6" font-family="Liberation Sans" font-size="22" font-weight="700" letter-spacing="0.22em">DOUGHMATRIX</text>
  <rect x="${1200 - 64 - badgeW}" y="56" width="${badgeW}" height="40" rx="8" fill="rgba(229,169,98,0.14)" stroke="rgba(229,169,98,0.45)"/>
  <text x="${1200 - 64 - badgeW / 2}" y="83" text-anchor="middle" fill="#e5a962" font-family="Liberation Sans" font-size="15" font-weight="700" letter-spacing="0.16em">${escapeXml(safeCategory)}</text>
  ${titleBlock}
  ${
    safeDetail
      ? `<text x="64" y="${detailY}" fill="#9aa0ab" font-family="Liberation Sans" font-size="22" font-weight="400">${escapeXml(safeDetail)}</text>`
      : ""
  }
  <rect x="64" y="548" width="1072" height="1" fill="#e5a962" fill-opacity="0.28"/>
  ${grid}
  <text x="64" y="582" fill="#6d7380" font-family="Liberation Sans" font-size="18" font-weight="400">doughmatrix.com</text>
  <text x="1136" y="582" text-anchor="end" fill="#6d7380" font-family="Liberation Sans" font-size="16" font-weight="400">Precision grain craft</text>
</svg>`;
}

let fontDir: string | undefined;

function materializeFonts(): string[] {
  if (!fontDir) {
    const dir = join(tmpdir(), "doughmatrix-og-fonts");
    mkdirSync(dir, { recursive: true });
    const files: Array<[string, string]> = [
      ["sans-bold.ttf", SANS_BOLD_B64],
      ["sans-regular.ttf", SANS_REGULAR_B64],
    ];
    for (const [name, b64] of files) {
      const path = join(dir, name);
      if (!existsSync(path)) writeFileSync(path, Buffer.from(b64, "base64"));
    }
    fontDir = dir;
  }
  return [join(fontDir, "sans-bold.ttf"), join(fontDir, "sans-regular.ttf")];
}

export function renderOgPng(input: OgCardInput): Buffer {
  const svg = renderOgSvg(input);
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH },
    font: {
      fontFiles: materializeFonts(),
      loadSystemFonts: false,
      defaultFontFamily: "Liberation Sans",
    },
  });
  return Buffer.from(resvg.render().asPng());
}

export function parseOgQuery(url: URL): OgCardInput {
  return {
    title: url.searchParams.get("title") || "DoughMatrix",
    category: url.searchParams.get("category") || "SUITE",
    detail: url.searchParams.get("detail") || undefined,
  };
}

export function ogPngResponse(input: OgCardInput): Response {
  const png = renderOgPng(input);
  return new Response(Uint8Array.from(png), {
    headers: {
      "content-type": "image/png",
      "cache-control": "public, max-age=86400, s-maxage=604800",
      "content-length": String(png.length),
    },
  });
}
