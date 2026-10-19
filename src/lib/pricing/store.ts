import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import { normalizePricingState } from "./normalize.ts";
import { samplePricingState } from "./presets.ts";
import type {
  Ingredient,
  OrderLine,
  PricingDefaults,
  PricingProduct,
  PricingState,
  Variant,
} from "./types.ts";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));
}

type PricingStore = PricingState & {
  setDefaults: (patch: Partial<PricingDefaults>) => void;
  setActiveProduct: (index: number) => void;
  addProduct: () => void;
  removeProduct: (index: number) => void;
  setProduct: (index: number, patch: Partial<PricingProduct>) => void;
  addIngredient: (productIndex: number) => void;
  setIngredient: (productIndex: number, i: number, patch: Partial<Ingredient>) => void;
  removeIngredient: (productIndex: number, i: number) => void;
  addVariant: (productIndex: number) => void;
  setVariant: (productIndex: number, i: number, patch: Partial<Variant>) => void;
  removeVariant: (productIndex: number, i: number) => void;
  addOrderLine: () => void;
  setOrderLine: (i: number, patch: Partial<OrderLine>) => void;
  removeOrderLine: (i: number) => void;
  replaceState: (state: PricingState) => void;
  reset: () => void;
};

function patchProduct(
  state: PricingState,
  index: number,
  patch: Partial<PricingProduct>,
): PricingProduct[] {
  return state.products.map((p, i) => (i === index ? { ...p, ...patch } : p));
}

export const usePricing = create<PricingStore>()(
  persist(
    (set, get) => ({
      ...samplePricingState(),
      setDefaults: (patch) =>
        set({ defaults: normalizeDefaultsPatch(get().defaults, patch) }),
      setActiveProduct: (index) =>
        set({ activeProduct: clamp(Math.floor(index), 0, get().products.length - 1) }),
      addProduct: () => {
        const products = [
          ...get().products,
          {
            name: `Product ${get().products.length + 1}`,
            yieldUnits: 12,
            ingredients: [{ name: "Main ingredient", amountUsed: 100, purchaseQty: 1000, purchasePrice: 5 }],
            laborMinutes: 30,
            overheadPerBatch: 2,
            wastePercent: 0,
            packagingPerUnit: 0.25,
            channelFeePercent: 0,
            currentPrice: 0,
            variants: [],
          } satisfies PricingProduct,
        ];
        set({ products, activeProduct: products.length - 1 });
      },
      removeProduct: (index) => {
        const products = get().products.filter((_, i) => i !== index);
        if (products.length === 0) return;
        set({
          products,
          activeProduct: Math.min(get().activeProduct, products.length - 1),
          order: get().order.filter((l) => l.productIndex !== index),
        });
      },
      setProduct: (index, patch) => set({ products: patchProduct(get(), index, patch) }),
      addIngredient: (productIndex) => {
        const p = get().products[productIndex];
        if (!p) return;
        set({
          products: patchProduct(get(), productIndex, {
            ingredients: [
              ...p.ingredients,
              { name: "New ingredient", amountUsed: 100, purchaseQty: 1000, purchasePrice: 5 },
            ],
          }),
        });
      },
      setIngredient: (productIndex, i, patch) => {
        const p = get().products[productIndex];
        if (!p) return;
        set({
          products: patchProduct(get(), productIndex, {
            ingredients: p.ingredients.map((ing, j) => (j === i ? { ...ing, ...patch } : ing)),
          }),
        });
      },
      removeIngredient: (productIndex, i) => {
        const p = get().products[productIndex];
        if (!p) return;
        set({
          products: patchProduct(get(), productIndex, {
            ingredients: p.ingredients.filter((_, j) => j !== i),
          }),
        });
      },
      addVariant: (productIndex) => {
        const p = get().products[productIndex];
        if (!p) return;
        set({
          products: patchProduct(get(), productIndex, {
            variants: [...p.variants, { name: "New variant", batchCostDelta: 0, packagingDelta: 0 }],
          }),
        });
      },
      setVariant: (productIndex, i, patch) => {
        const p = get().products[productIndex];
        if (!p) return;
        set({
          products: patchProduct(get(), productIndex, {
            variants: p.variants.map((v, j) => (j === i ? { ...v, ...patch } : v)),
          }),
        });
      },
      removeVariant: (productIndex, i) => {
        const p = get().products[productIndex];
        if (!p) return;
        set({
          products: patchProduct(get(), productIndex, {
            variants: p.variants.filter((_, j) => j !== i),
          }),
        });
      },
      addOrderLine: () =>
        set({ order: [...get().order, { productIndex: 0, variantIndex: null, qty: 1 }] }),
      setOrderLine: (i, patch) =>
        set({ order: get().order.map((l, j) => (j === i ? { ...l, ...patch } : l)) }),
      removeOrderLine: (i) => set({ order: get().order.filter((_, j) => j !== i) }),
      replaceState: (state) => set(normalizePricingState(state)),
      reset: () => set(samplePricingState()),
    }),
    {
      name: "doughmatrix-pricing-v1",
      partialize: (s) => ({
        defaults: s.defaults,
        activeProduct: s.activeProduct,
        products: s.products,
        order: s.order,
      }),
    },
  ),
);

function normalizeDefaultsPatch(
  current: PricingDefaults,
  patch: Partial<PricingDefaults>,
): PricingDefaults {
  const next = { ...current, ...patch };
  return {
    laborRate: clamp(next.laborRate, 0, 200),
    targetMarginPercent: clamp(next.targetMarginPercent, 0, 95),
    markupPercent: clamp(next.markupPercent, 0, 1000),
    orderFeePercent: clamp(next.orderFeePercent, 0, 30),
    orderFlatFee: clamp(next.orderFlatFee, 0, 50),
  };
}

export function usePricingState(): PricingState {
  return usePricing(
    useShallow((s) => ({
      defaults: s.defaults,
      activeProduct: s.activeProduct,
      products: s.products,
      order: s.order,
    })),
  );
}
