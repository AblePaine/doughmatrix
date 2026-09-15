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
};

export const FLOUR_CATEGORIES = [
  { id: "all" as const, label: "All" },
  { id: "bread" as const, label: "Bread" },
  { id: "whole" as const, label: "Whole Grain" },
  { id: "tipo00" as const, label: "Tipo 00" },
  { id: "extraction" as const, label: "High Extraction" },
];

/** Typical bag specs — protein/ash as published or mill sheets; hydration is DoughMatrix true-hydration. */
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
  },
  {
    id: "ka-sir-lancelot",
    brand: "King Arthur",
    name: "Sir Lancelot Hi-Gluten",
    protein: 14.2,
    ash: 0.52,
    safeHydration: 74,
    maxHydration: 82,
    malted: true,
    description:
      "Professional high-gluten. Holds a high-hydration rustic loaf and a bagel the same week.",
    recommendedUse: "Bagels, high-hydration rustic, New York pizza",
    category: "bread",
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
  },
  {
    id: "cm-type-85",
    brand: "Central Milling",
    name: "Organic Type 85",
    protein: 12.5,
    ash: 0.85,
    safeHydration: 74,
    maxHydration: 80,
    malted: false,
    description:
      "High-extraction cream flour. More ash and flavor than white, still a gluten net — pain au levain territory.",
    recommendedUse: "Pain au levain, rustic bâtards",
    category: "extraction",
  },
  {
    id: "brm-artisan",
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
  },
  {
    id: "brm-ww",
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
  },
  {
    id: "caputo-00-pizzaria",
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
  },
  {
    id: "caputo-00-chefs",
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
  },
  {
    id: "gm-better-bread",
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
  },
  {
    id: "gm-all-trumps",
    brand: "General Mills",
    name: "All Trumps",
    protein: 14.2,
    ash: 0.54,
    safeHydration: 74,
    maxHydration: 82,
    malted: true,
    description:
      "The bagel-shop high-gluten. Patent flour with real chew — hydration can climb if the mix is developed.",
    recommendedUse: "Bagels, New York pizza, rustic",
    category: "bread",
  },
  {
    id: "giustos-ultimate",
    brand: "Giusto's",
    name: "Ultimate Performer",
    protein: 13.5,
    ash: 0.52,
    safeHydration: 73,
    maxHydration: 80,
    malted: true,
    description:
      "Bay Area bakery staple. Strong enough for an open country loaf without jumping to hi-gluten.",
    recommendedUse: "Country sourdough, baguettes",
    category: "bread",
  },
  {
    id: "giustos-t80",
    brand: "Giusto's",
    name: "Organic High Extraction (T80)",
    protein: 12.2,
    ash: 0.8,
    safeHydration: 74,
    maxHydration: 80,
    malted: false,
    description:
      "Cream high-extraction mill. More flavor and ash than white, still a gluten net — campagne, not 100% whole wheat.",
    recommendedUse: "Pain de campagne, naturally leavened bâtards",
    category: "extraction",
  },
];

export const ARTISAN_BY_ID: Record<string, ArtisanFlour> = Object.fromEntries(
  ARTISAN_FLOURS.map((f) => [f.id, f]),
);

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
      f.recommendedUse.toLowerCase().includes(q)
    );
  });
}
