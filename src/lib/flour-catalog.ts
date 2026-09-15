export type FlourCategory = "bread" | "whole" | "tipo00" | "extraction";

export type ArtisanFlour = {
  id: string;
  brand: string;
  name: string;
  protein: number;
  ash: number;
  safeHydration: number;
  maxHydration: number;
  malted: boolean;
  description: string;
  recommendedUse: string;
  category: FlourCategory;
  wheatType: string;
  extraction: string;
  enzymaticActivity: string;
  handlingNotes: string;
  bestStyles: string[];
};

export const FLOUR_CATEGORIES = [
  { id: "all" as const, label: "All" },
  { id: "bread" as const, label: "Bread" },
  { id: "whole" as const, label: "Whole Grain" },
  { id: "tipo00" as const, label: "Tipo 00" },
  { id: "extraction" as const, label: "High Extraction" },
];

export const CATEGORY_LABEL: Record<FlourCategory, string> = {
  bread: "Bread",
  whole: "Whole Grain",
  tipo00: "Tipo 00",
  extraction: "High Extraction",
};

/** Typical bag specs — protein/ash from mill sheets; hydration is DoughMatrix true-hydration. */
export const ARTISAN_FLOURS: ArtisanFlour[] = [
  {
    id: "ka-bread",
    brand: "King Arthur",
    name: "Bread Flour",
    protein: 12.7,
    ash: 0.52,
    safeHydration: 72,
    maxHydration: 78,
    malted: true,
    description:
      "Unbleached hard-red spring wheat. The default American high-gluten bag — malted, strong, and predictable in a taut skin.",
    recommendedUse: "Country loaves, baguettes, pan bread",
    category: "bread",
    wheatType: "Hard Red Spring",
    extraction: "72% (Patent)",
    enzymaticActivity: "Standard Malted",
    handlingNotes:
      "Elastic more than extensible. A 20–30 min autolyse is enough; longer does not buy much. At 72% true hydration the dough skins and coils. Push toward 78% only with strong development and a coil-fold series — past that the gluten net shears and the mix becomes a puddle, not an open crumb.",
    bestStyles: ["Open-Crumb Sourdough", "Baguettes", "Long Cold Retard"],
  },
  {
    id: "ka-ap",
    brand: "King Arthur",
    name: "Unbleached All-Purpose",
    protein: 11.7,
    ash: 0.48,
    safeHydration: 68,
    maxHydration: 74,
    malted: true,
    description:
      "Softer than KA bread. Fine for sandwich loaves; a 75% “high hydration” mix here is already into caution.",
    recommendedUse: "Sandwich loaves, enriched doughs, pie-adjacent breads",
    category: "bread",
    wheatType: "Hard Red Winter / Spring blend",
    extraction: "72% (Patent)",
    enzymaticActivity: "Standard Malted",
    handlingNotes:
      "More extensible than KA bread, less tolerant of water. Autolyse 20 min, then mix to a moderate window. At 68% it pans and shapes cleanly. 74% is the last honest boule — above that you are fighting a slack AP dough, not unlocking crumb.",
    bestStyles: ["Sandwich Loaves", "Enriched Doughs", "Weeknight Sourdough"],
  },
  {
    id: "ka-ww",
    brand: "King Arthur",
    name: "Whole Wheat",
    protein: 13.8,
    ash: 1.55,
    safeHydration: 78,
    maxHydration: 86,
    malted: true,
    description:
      "Hard red winter wheat, bran intact. Drinks more than the protein number suggests; autolyse 30–45 min.",
    recommendedUse: "100% whole-wheat boules, 10–30% blends",
    category: "whole",
    wheatType: "Hard Red Winter",
    extraction: "100% (Whole Grain)",
    enzymaticActivity: "Standard Malted",
    handlingNotes:
      "Bran cuts gluten even when protein looks high. Autolyse 30–45 min so bran hydrates before you develop. 100% loaves want 78%+ true hydration and a tight shape; 10–30% blends into a white base add flavor without wrecking the net. Past 86% the dough weeps and will not hold a score.",
    bestStyles: ["100% Whole Wheat", "Country Blends", "Hearty Boules"],
  },
  {
    id: "ka-white-ww",
    brand: "King Arthur",
    name: "White Whole Wheat",
    protein: 13.0,
    ash: 1.4,
    safeHydration: 76,
    maxHydration: 84,
    malted: true,
    description:
      "Hard white wheat, bran intact, milder than red whole wheat. A whole-grain loaf that still tastes like bread.",
    recommendedUse: "Mild whole-grain boules, 20–40% blends",
    category: "whole",
    wheatType: "Hard White Wheat",
    extraction: "100% (Whole Grain)",
    enzymaticActivity: "Standard Malted",
    handlingNotes:
      "Same bran physics as red whole wheat, less tannin. Autolyse 30 min. It takes water like a whole grain but shapes closer to a white blend. Stay near 76% for a skin; 84% is the ceiling before the loaf spreads in the oven.",
    bestStyles: ["Mild Whole-Grain Loaves", "Blended Country", "Sandwich Wheat"],
  },
  {
    id: "cm-abc",
    brand: "Central Milling",
    name: "Organic Artisan Bakers Craft",
    protein: 11.5,
    ash: 0.5,
    safeHydration: 68,
    maxHydration: 74,
    malted: false,
    description:
      "Unmalted organic bread flour. Extensible, quiet enzyme profile — baguette and ciabatta flour, not a wet country mix.",
    recommendedUse: "Baguettes, ciabatta, lean doughs",
    category: "bread",
    wheatType: "Hard Red Winter",
    extraction: "72% (Patent)",
    enzymaticActivity: "Unmalted / Slow Ferment",
    handlingNotes:
      "Low diastatic activity — long bulk and cold retard without going slack-sweet. Extensible: a short mix and folds beat a long machine development. Keep true hydration near 68% for baguettes. 74% is ciabatta territory; past that the dough has no skin to score.",
    bestStyles: ["Baguettes", "Ciabatta", "Long Cold Retard"],
  },
  {
    id: "cm-abc-plus",
    brand: "Central Milling",
    name: "Organic Artisan Bakers Craft Plus",
    protein: 12.8,
    ash: 0.52,
    safeHydration: 72,
    maxHydration: 78,
    malted: true,
    description:
      "Malted ABC. The mill’s daily sourdough flour — color, oven spring, and a ceiling that matches KA bread.",
    recommendedUse: "Daily sourdough, country loaves",
    category: "bread",
    wheatType: "Hard Red Winter / Spring blend",
    extraction: "72% (Patent)",
    enzymaticActivity: "Standard Malted",
    handlingNotes:
      "Malt restores color and spring that unmalted ABC withholds. Treat it like KA bread: 20–30 min autolyse, moderate mix, coil folds. 72% is the daily loaf. 78% needs full development. Do not run a 6-hour warm bulk at 78% — malt plus heat will chew the net.",
    bestStyles: ["Open-Crumb Sourdough", "Country Loaves", "Daily Mix"],
  },
  {
    id: "cm-type-82",
    brand: "Central Milling",
    name: "Organic Type 82",
    protein: 12.2,
    ash: 0.82,
    safeHydration: 74,
    maxHydration: 80,
    malted: false,
    description:
      "High-extraction cream flour. More ash and flavor than white, still a gluten net — pain au levain territory.",
    recommendedUse: "Pain au levain, rustic bâtards",
    category: "extraction",
    wheatType: "Hard Red Winter",
    extraction: "82% (High Extraction)",
    enzymaticActivity: "Unmalted / Slow Ferment",
    handlingNotes:
      "Bran specks without whole-grain density. Autolyse 30 min so the extra ash hydrates. Slightly more extensible than patent; it wants folds more than intensive mix. 74% is campagne. 80% is the last loaf that still stands — above that you have porridge with flavor.",
    bestStyles: ["Pain au Levain", "Rustic Bâtards", "Long Cold Retard"],
  },
  {
    id: "cm-high-mountain",
    brand: "Central Milling",
    name: "High Mountain",
    protein: 13.8,
    ash: 0.54,
    safeHydration: 74,
    maxHydration: 82,
    malted: true,
    description:
      "High-protein organic. Built for open crumb at hydration that would puddle a weaker bag.",
    recommendedUse: "Open-crumb country, bagels",
    category: "bread",
    wheatType: "Hard Red Spring",
    extraction: "72% (Patent)",
    enzymaticActivity: "Standard Malted",
    handlingNotes:
      "Elastic, high W. It will take a long mix and still have a window. Open-crumb bakers can live at 74–78% if they fold. 82% is a structured wet dough, not a pour. Bagel hydration sits far below the ceiling — do not read max as a bagel target.",
    bestStyles: ["Open-Crumb Sourdough", "Bagels", "High-Hydration Rustic"],
  },
  {
    id: "brm-artisan-bread",
    brand: "Bob's Red Mill",
    name: "Artisan Bread Flour",
    protein: 12.5,
    ash: 0.5,
    safeHydration: 71,
    maxHydration: 77,
    malted: true,
    description:
      "Unbleached hard red wheat, grocery-aisle available. Treat it like a slightly milder KA bread.",
    recommendedUse: "Home sourdough, pizza, pan loaves",
    category: "bread",
    wheatType: "Hard Red Wheat",
    extraction: "72% (Patent)",
    enzymaticActivity: "Standard Malted",
    handlingNotes:
      "Balanced elasticity. Autolyse 20–30 min. It does not love being pushed to “internet 80%.” 71% is a clean home boule. 77% is the last mix that still coils. A notch less tolerant than KA bread or ABC Plus.",
    bestStyles: ["Home Sourdough", "Pan Loaves", "Weeknight Pizza"],
  },
  {
    id: "brm-dark-rye",
    brand: "Bob's Red Mill",
    name: "Dark Rye Flour",
    protein: 10.5,
    ash: 1.7,
    safeHydration: 80,
    maxHydration: 100,
    malted: false,
    description:
      "Whole-grain rye. Protein here is not gluten — pentosans drink the water and the dough is sticky by nature, not by mistake.",
    recommendedUse: "Rye loaves, 10–30% blends, pumpernickel-adjacent",
    category: "whole",
    wheatType: "Whole Grain Rye",
    extraction: "100% (Whole Grain)",
    enzymaticActivity: "High Pentosans / Non-Gluten Forming",
    handlingNotes:
      "Do not mix rye like wheat. Pentosans gel; overmixing makes paste. Hydrate high, handle wet, and use a scraper — a windowpane is the wrong test. 10–20% in a wheat loaf adds flavor and moisture; 100% rye wants a pan, a sour, and 80–100% water. The danger light is about pourability, not gluten collapse.",
    bestStyles: ["Rye Loaves", "Wheat–Rye Blends", "Pan Rye"],
  },
  {
    id: "brm-whole-wheat",
    brand: "Bob's Red Mill",
    name: "Whole Wheat Flour",
    protein: 13.8,
    ash: 1.5,
    safeHydration: 76,
    maxHydration: 84,
    malted: false,
    description:
      "Stone-ground whole wheat. Bran cuts gluten; blend 15–25% into a white base or hydrate like a whole-grain loaf.",
    recommendedUse: "Whole-grain loaves, 15–30% blends",
    category: "whole",
    wheatType: "Hard Red Wheat",
    extraction: "100% (Whole Grain)",
    enzymaticActivity: "Unmalted / Slow Ferment",
    handlingNotes:
      "Coarser than KA whole wheat — bran shards are sharper on the net. Autolyse 40 min. Unmalted, so bulk can run long without turning slack-sweet. 76% for a stand-up loaf; 84% if you are blending or panning. Do not chase an open crumb at 100% with this grind.",
    bestStyles: ["Whole-Grain Loaves", "15–30% Blends", "Hearty Sandwich"],
  },
  {
    id: "caputo-tipo-00-chef",
    brand: "Caputo",
    name: "00 Chef's Flour (Red)",
    protein: 13.0,
    ash: 0.55,
    safeHydration: 64,
    maxHydration: 70,
    malted: false,
    description:
      "Stronger 00 for longer ferments. Still a tipo 00 ash cap — do not chase sourdough-boule hydration.",
    recommendedUse: "Roman pizza, high-hydration focaccia",
    category: "tipo00",
    wheatType: "Soft Wheat / High-W blend",
    extraction: "Tipo 00 (≤0.55% ash)",
    enzymaticActivity: "Unmalted / Slow Ferment",
    handlingNotes:
      "Extensible, fine mill, long W. It wants a 24–72 h cold ferment, not a wet country mix. 64% is a workable Roman or focaccia dough. 70% is the ceiling for a dough you can still stretch. 75% “Tartine” hydration here is a sticky puddle — the 00 ash cap is not a bread-flour ceiling.",
    bestStyles: ["Roman Pizza", "Focaccia", "Long Cold Retard"],
  },
  {
    id: "caputo-pizzeria",
    brand: "Caputo",
    name: "00 Pizzeria (Blue)",
    protein: 12.5,
    ash: 0.55,
    safeHydration: 62,
    maxHydration: 68,
    malted: false,
    description:
      "Classic Neapolitan 00. Extensible, fine mill, low ceiling — a 75% “country” mix here is a puddle, not a pie.",
    recommendedUse: "Neapolitan pizza, focaccia",
    category: "tipo00",
    wheatType: "Soft Wheat",
    extraction: "Tipo 00 (≤0.55% ash)",
    enzymaticActivity: "Unmalted / Slow Ferment",
    handlingNotes:
      "Built for 60–65% pizza dough and a 400°C oven, not a Dutch oven. Short mix, long cold. 62% is Neapolitan. 68% is already a wet pie dough. Do not autolyse like bread — you will make soup. Extensibility is the feature; elasticity is not.",
    bestStyles: ["Neapolitan Pizza", "Wood-Fired Pies", "Thin Focaccia"],
  },
  {
    id: "caputo-manitoba",
    brand: "Caputo",
    name: "Manitoba",
    protein: 14.5,
    ash: 0.55,
    safeHydration: 70,
    maxHydration: 78,
    malted: false,
    description:
      "High-W Canadian wheat, Italian mill. Panettone and long-ferment strength without American malt.",
    recommendedUse: "Panettone, long-ferment pizza, strong lean doughs",
    category: "bread",
    wheatType: "Hard Red Spring (Manitoba)",
    extraction: "Tipo 0 / high-W patent",
    enzymaticActivity: "Unmalted / Slow Ferment",
    handlingNotes:
      "Very elastic. It will take a long mix and a long, cool ferment without collapsing. For lean bread, 70% is a structured loaf; 78% is possible after full development. For panettone, ignore the bread ceiling — egg and fat change the matrix. Unmalted: color comes from time, not diastase.",
    bestStyles: ["Panettone", "Long-Ferment Pizza", "High-Strength Lean"],
  },
  {
    id: "gm-bread",
    brand: "General Mills",
    name: "Gold Medal Better for Bread",
    protein: 12.0,
    ash: 0.5,
    safeHydration: 70,
    maxHydration: 76,
    malted: true,
    description:
      "Widely available malted bread flour. A notch below KA bread; stay near 70% true hydration for a skin.",
    recommendedUse: "Sandwich loaves, weeknight sourdough",
    category: "bread",
    wheatType: "Hard Red Winter",
    extraction: "72% (Patent)",
    enzymaticActivity: "Standard Malted",
    handlingNotes:
      "Grocery-aisle malted bread. It pans beautifully at 70%. Autolyse 20 min; do not overmix — the protein is real but not KA-strong. 76% is the last boule. Internet 80% on this bag is how you get a sticky puddle and blame your starter.",
    bestStyles: ["Sandwich Loaves", "Weeknight Sourdough", "Pan Bread"],
  },
  {
    id: "giustos-peak-performer",
    brand: "Giusto's",
    name: "Peak Performer",
    protein: 13.5,
    ash: 0.52,
    safeHydration: 73,
    maxHydration: 80,
    malted: true,
    description:
      "Bay Area bakery staple. Strong enough for an open country loaf without jumping to hi-gluten.",
    recommendedUse: "Country sourdough, baguettes",
    category: "bread",
    wheatType: "Hard Red Spring",
    extraction: "72% (Patent)",
    enzymaticActivity: "Standard Malted",
    handlingNotes:
      "Elastic with enough extensibility for a baguette if you do not overmix. 30 min autolyse, then folds. 73% is the country loaf. 80% is an open-crumb mix that still has a skin if developed. A reliable daily flour for bakers who want more than AP and less than bagel flour.",
    bestStyles: ["Country Sourdough", "Baguettes", "Open-Crumb Sourdough"],
  },
];

/** Previous catalog ids → current slug, so ?flour= and old links still resolve. */
export const FLOUR_ALIASES: Record<string, string> = {
  "ka-sir-lancelot": "ka-bread",
  "cm-type-85": "cm-type-82",
  "brm-artisan": "brm-artisan-bread",
  "brm-ww": "brm-whole-wheat",
  "caputo-00-pizzaria": "caputo-pizzeria",
  "caputo-00-chefs": "caputo-tipo-00-chef",
  "gm-better-bread": "gm-bread",
  "giustos-ultimate": "giustos-peak-performer",
};

export const ARTISAN_BY_ID: Record<string, ArtisanFlour> = Object.fromEntries(
  ARTISAN_FLOURS.map((f) => [f.id, f]),
);

export function resolveArtisanFlour(id: string): ArtisanFlour | undefined {
  return ARTISAN_BY_ID[id] ?? ARTISAN_BY_ID[FLOUR_ALIASES[id] ?? ""];
}

export function filterArtisanFlours(
  query: string,
  category: FlourCategory | "all",
): ArtisanFlour[] {
  const q = query.trim().toLowerCase();
  return ARTISAN_FLOURS.filter((f) => {
    if (category !== "all" && f.category !== category) return false;
    if (!q) return true;
    return (
      f.brand.toLowerCase().includes(q) ||
      f.name.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q) ||
      f.recommendedUse.toLowerCase().includes(q) ||
      f.wheatType.toLowerCase().includes(q) ||
      f.bestStyles.some((s) => s.toLowerCase().includes(q))
    );
  });
}
