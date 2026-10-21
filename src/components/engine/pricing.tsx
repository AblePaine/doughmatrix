import { useMemo, useState, type ReactNode } from "react";
import { Copy, Link2, Plus, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GuidesFooter } from "@/components/guides-footer";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { SiteHeader } from "@/components/site-header";
import { pricingShareParams } from "@/lib/engine-search";
import {
  computeOrder,
  computeProduct,
  computeVariant,
  markupPrice,
  priceCheck,
  pricingPlaintext,
  resolveOrderItem,
  roundUpTo,
  rowCost,
  suggestedPrice,
} from "@/lib/pricing/math";
import { AFFILIATE_SLOTS } from "@/lib/pricing/presets";
import { usePricing, usePricingState } from "@/lib/pricing/store";
import type { MarginBand } from "@/lib/pricing/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const money = (n: number) => `$${(Math.round(n * 100) / 100).toFixed(2)}`;

const BAND_CLASS: Record<MarginBand, string> = {
  safe: "text-[#34d399]",
  caution: "text-[#fbbf24]",
  danger: "text-[#f87171]",
};

function Section({
  title,
  blurb,
  children,
}: {
  title: string;
  blurb?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg bg-card p-5 shadow-[0_0_0_1px_var(--color-border)]">
      <h2 className="font-display text-xl tracking-tight text-fg">{title}</h2>
      {blurb ? (
        <p className="mt-1 text-sm leading-relaxed text-muted">{blurb}</p>
      ) : null}
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  );
}

const inputClass =
  "w-full rounded-md bg-inset px-2.5 py-2 text-sm text-fg tabular-nums shadow-[0_0_0_1px_var(--color-border-strong)] focus:outline-2 focus:outline-accent/40";

function NumField({
  label,
  value,
  onChange,
  step = 0.05,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  step?: number;
  min?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-fg">{label}</span>
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        step={step}
        min={min}
        onChange={(e) => onChange(Number(e.target.value))}
        className={inputClass}
      />
    </label>
  );
}

function PriceLine({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-2 border-b border-dashed border-border/70 py-1.5 last:border-0">
      <span className="text-sm text-muted">{k}</span>
      <span className="text-sm font-medium text-fg tabular-nums">{children}</span>
    </div>
  );
}

export function PricingEngine() {
  const state = usePricingState();
  const setDefaults = usePricing((s) => s.setDefaults);
  const setActiveProduct = usePricing((s) => s.setActiveProduct);
  const addProduct = usePricing((s) => s.addProduct);
  const removeProduct = usePricing((s) => s.removeProduct);
  const setProduct = usePricing((s) => s.setProduct);
  const addIngredient = usePricing((s) => s.addIngredient);
  const setIngredient = usePricing((s) => s.setIngredient);
  const removeIngredient = usePricing((s) => s.removeIngredient);
  const addVariant = usePricing((s) => s.addVariant);
  const setVariant = usePricing((s) => s.setVariant);
  const removeVariant = usePricing((s) => s.removeVariant);
  const addOrderLine = usePricing((s) => s.addOrderLine);
  const setOrderLine = usePricing((s) => s.setOrderLine);
  const removeOrderLine = usePricing((s) => s.removeOrderLine);
  const reset = usePricing((s) => s.reset);

  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const active = Math.min(state.activeProduct, state.products.length - 1);
  const product = state.products[active];
  const math = useMemo(
    () => computeProduct(product, state.defaults),
    [product, state.defaults],
  );
  const sugg = suggestedPrice(math.unitCost, state.defaults, product.channelFeePercent);
  const current = priceCheck(math.unitCost, product.currentPrice, product.channelFeePercent);
  const order = useMemo(() => computeOrder(state), [state]);

  const orderOptions = useMemo(() => {
    const opts: { key: string; label: string }[] = [];
    state.products.forEach((p, pi) => {
      opts.push({ key: `${pi}:`, label: p.name });
      p.variants.forEach((v, vi) => opts.push({ key: `${pi}:${vi}`, label: `${p.name} — ${v.name}` }));
    });
    return opts;
  }, [state.products]);

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(pricingPlaintext(state));
      setCopied(true);
      track("copy_pricing_summary");
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  const shareLink = async () => {
    try {
      const qs = new URLSearchParams(pricingShareParams(state)).toString();
      const url = `${window.location.origin}/engines/pricing${qs ? `?${qs}` : ""}`;
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      track("share_link", { engine: "pricing" });
      window.setTimeout(() => setLinkCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  const breakdown = [
    { label: "Ingredients", value: math.ingredientUnit, color: "#e5a962" },
    { label: "Labor", value: math.laborUnit, color: "#34d399" },
    { label: "Overhead", value: math.overheadUnit, color: "#7dd3fc" },
    { label: "Packaging", value: math.packagingUnit, color: "#c4b5fd" },
  ];
  const breakdownTotal = breakdown.reduce((s, x) => s + x.value, 0) || 1;

  return (
    <div className="min-h-dvh">
      <SiteHeader
        actions={
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => void shareLink()}
              aria-label="Copy link to this pricing"
            >
              <Link2 className="size-4" />
              <span className="sr-only">{linkCopied ? "Link copied" : "Copy link"}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => void copySummary()}
              aria-label="Copy pricing summary"
            >
              <Copy className="size-4" />
              <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={reset} aria-label="Reset to samples">
              <RotateCcw className="size-4" />
            </Button>
          </>
        }
      />
      <main className="mx-auto max-w-6xl px-4 pt-6 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Pricing calculator
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Costing is not pricing.
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Cost the batch honestly — ingredients, packaging, <em>your</em>{" "}
          labor, overhead, and the ones that don&apos;t sell — then set a
          price with the profit already in it. Per item, per flavor, per
          whole market order.
        </p>

        <div className="mt-8">
          <Section
            title="Your numbers"
            blurb="These apply to everything below. The labor rate is the one most bakers accidentally leave at $0."
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <NumField
                label="Your labor rate ($/hr)"
                value={state.defaults.laborRate}
                step={0.5}
                onChange={(n) => setDefaults({ laborRate: n })}
              />
              <NumField
                label="Target margin (%)"
                value={state.defaults.targetMarginPercent}
                step={1}
                onChange={(n) => setDefaults({ targetMarginPercent: n })}
              />
              <NumField
                label="Markup shown (%)"
                value={state.defaults.markupPercent}
                step={5}
                onChange={(n) => setDefaults({ markupPercent: n })}
              />
              <div className="grid grid-cols-2 gap-2">
                <NumField
                  label="Order card fee (%)"
                  value={state.defaults.orderFeePercent}
                  step={0.1}
                  onChange={(n) => setDefaults({ orderFeePercent: n })}
                />
                <NumField
                  label="Order fee flat ($)"
                  value={state.defaults.orderFlatFee}
                  step={0.05}
                  onChange={(n) => setDefaults({ orderFlatFee: n })}
                />
              </div>
            </div>
          </Section>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {state.products.map((p, i) => (
            <button
              key={`${p.name}-${i}`}
              onClick={() => setActiveProduct(i)}
              aria-pressed={i === active}
              className={cn(
                "rounded-full px-4 py-2 text-sm shadow-[0_0_0_1px_var(--color-border-strong)]",
                i === active
                  ? "bg-accent font-semibold text-[#121316]"
                  : "bg-card text-muted hover:text-fg",
              )}
            >
              {p.name}
            </button>
          ))}
          <Button variant="secondary" size="sm" onClick={addProduct}>
            <Plus className="size-4" /> Add product
          </Button>
          {state.products.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeProduct(active)}
            >
              Remove “{product.name}”
            </Button>
          )}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-4">
            <Section
              title="Recipe / batch"
              blurb="What one batch costs to make. Amount used and purchase qty just need the same unit (g/g, eggs/eggs)."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-fg">Product name</span>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => setProduct(active, { name: e.target.value })}
                    className={inputClass}
                  />
                </label>
                <NumField
                  label="Yield (units per batch)"
                  value={product.yieldUnits}
                  step={1}
                  min={1}
                  onChange={(n) => setProduct(active, { yieldUnits: n })}
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] tracking-wide text-faint uppercase">
                      <th className="py-1 pr-2 font-medium">Ingredient</th>
                      <th className="py-1 pr-2 text-right font-medium">Used</th>
                      <th className="py-1 pr-2 text-right font-medium">Buy qty</th>
                      <th className="py-1 pr-2 text-right font-medium">Buy price $</th>
                      <th className="py-1 pr-2 text-right font-medium">Cost</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {product.ingredients.map((ing, i) => (
                      <tr key={i}>
                        <td className="py-1 pr-2">
                          <input
                            type="text"
                            value={ing.name}
                            aria-label="Ingredient name"
                            onChange={(e) =>
                              setIngredient(active, i, { name: e.target.value })
                            }
                            className={inputClass}
                          />
                        </td>
                        <td className="py-1 pr-2">
                          <input
                            type="number"
                            value={ing.amountUsed}
                            aria-label="Amount used"
                            onChange={(e) =>
                              setIngredient(active, i, { amountUsed: Number(e.target.value) })
                            }
                            className={inputClass}
                          />
                        </td>
                        <td className="py-1 pr-2">
                          <input
                            type="number"
                            value={ing.purchaseQty}
                            aria-label="Purchase quantity"
                            onChange={(e) =>
                              setIngredient(active, i, { purchaseQty: Number(e.target.value) })
                            }
                            className={inputClass}
                          />
                        </td>
                        <td className="py-1 pr-2">
                          <input
                            type="number"
                            value={ing.purchasePrice}
                            aria-label="Purchase price"
                            onChange={(e) =>
                              setIngredient(active, i, { purchasePrice: Number(e.target.value) })
                            }
                            className={inputClass}
                          />
                        </td>
                        <td className="py-1 pr-2 text-right font-medium text-fg tabular-nums">
                          {money(rowCost(ing))}
                        </td>
                        <td className="py-1">
                          <button
                            onClick={() => removeIngredient(active, i)}
                            aria-label={`Remove ${ing.name}`}
                            className="p-1 text-faint hover:text-[#f87171]"
                          >
                            <X className="size-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <Button variant="secondary" size="sm" onClick={() => addIngredient(active)}>
                  <Plus className="size-4" /> Add ingredient
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <NumField
                  label="Hands-on minutes / batch"
                  value={product.laborMinutes}
                  step={1}
                  onChange={(n) => setProduct(active, { laborMinutes: n })}
                />
                <NumField
                  label="Overhead $ / batch"
                  value={product.overheadPerBatch}
                  step={0.25}
                  onChange={(n) => setProduct(active, { overheadPerBatch: n })}
                />
                <NumField
                  label="Waste / unsold (%)"
                  value={product.wastePercent}
                  step={1}
                  onChange={(n) => setProduct(active, { wastePercent: n })}
                />
                <NumField
                  label="Packaging $ / unit"
                  value={product.packagingPerUnit}
                  step={0.05}
                  onChange={(n) => setProduct(active, { packagingPerUnit: n })}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <NumField
                  label="Channel fee for this product (%)"
                  value={product.channelFeePercent}
                  step={0.5}
                  onChange={(n) => setProduct(active, { channelFeePercent: n })}
                />
                <NumField
                  label="Price you're charging now ($)"
                  value={product.currentPrice}
                  step={0.25}
                  onChange={(n) => setProduct(active, { currentPrice: n })}
                />
              </div>
            </Section>

            <Section
              title="Flavors & variants"
              blurb="A variant is a delta on the base batch — “double chocolate,” “gluten-free” — priced at the same target margin."
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] tracking-wide text-faint uppercase">
                      <th className="py-1 pr-2 font-medium">Variant</th>
                      <th className="py-1 pr-2 text-right font-medium">Batch Δ $</th>
                      <th className="py-1 pr-2 text-right font-medium">Pkg Δ $</th>
                      <th className="py-1 pr-2 text-right font-medium">Unit cost</th>
                      <th className="py-1 pr-2 text-right font-medium">Suggested</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {product.variants.map((v, i) => {
                      const vm = computeVariant(product, state.defaults, v);
                      return (
                        <tr key={i}>
                          <td className="py-1 pr-2">
                            <input
                              type="text"
                              value={v.name}
                              aria-label="Variant name"
                              onChange={(e) => setVariant(active, i, { name: e.target.value })}
                              className={inputClass}
                            />
                          </td>
                          <td className="py-1 pr-2">
                            <input
                              type="number"
                              value={v.batchCostDelta}
                              aria-label="Batch cost delta"
                              onChange={(e) =>
                                setVariant(active, i, { batchCostDelta: Number(e.target.value) })
                              }
                              className={inputClass}
                            />
                          </td>
                          <td className="py-1 pr-2">
                            <input
                              type="number"
                              value={v.packagingDelta}
                              aria-label="Packaging delta"
                              onChange={(e) =>
                                setVariant(active, i, { packagingDelta: Number(e.target.value) })
                              }
                              className={inputClass}
                            />
                          </td>
                          <td className="py-1 pr-2 text-right font-medium text-fg tabular-nums">
                            {money(vm.unitCost)}
                          </td>
                          <td className="py-1 pr-2 text-right font-medium text-fg tabular-nums">
                            {vm.suggestedPrice === null ? "—" : money(vm.suggestedPrice)}
                          </td>
                          <td className="py-1">
                            <button
                              onClick={() => removeVariant(active, i)}
                              aria-label={`Remove ${v.name}`}
                              className="p-1 text-faint hover:text-[#f87171]"
                            >
                              <X className="size-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div>
                <Button variant="secondary" size="sm" onClick={() => addVariant(active)}>
                  <Plus className="size-4" /> Add variant
                </Button>
              </div>
            </Section>
          </div>

          <div className="flex flex-col gap-4">
            <Section title="What one really costs">
              <div>
                <div className="flex h-3 overflow-hidden rounded-full shadow-[0_0_0_1px_var(--color-border)]">
                  {breakdown.map((part) => (
                    <div
                      key={part.label}
                      style={{
                        width: `${(part.value / breakdownTotal) * 100}%`,
                        background: part.color,
                      }}
                    />
                  ))}
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                  {breakdown.map((part) => (
                    <span key={part.label}>
                      <span
                        className="mr-1.5 inline-block size-2 rounded-full"
                        style={{ background: part.color }}
                      />
                      {part.label} {money(part.value)}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <PriceLine k="Ingredients / unit">{money(math.ingredientUnit)}</PriceLine>
                <PriceLine k="Labor / unit">{money(math.laborUnit)}</PriceLine>
                <PriceLine k="Overhead / unit">{money(math.overheadUnit)}</PriceLine>
                <PriceLine k="Packaging / unit">{money(math.packagingUnit)}</PriceLine>
                <PriceLine k="True unit cost">
                  <span className="text-accent">{money(math.unitCost)}</span>
                </PriceLine>
              </div>
              <p className="text-xs leading-relaxed text-faint">
                Batch cost {money(math.batchCost)} over{" "}
                {math.sellableUnits.toFixed(1)} sellable units (yield{" "}
                {product.yieldUnits}, {product.wastePercent}% waste).
              </p>
            </Section>

            <Section title="What to charge">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl text-fg">
                  {sugg === null ? "—" : money(sugg)}
                </span>
                <span className="rounded-full px-2.5 py-1 text-xs text-muted shadow-[0_0_0_1px_var(--color-border-strong)]">
                  {sugg === null
                    ? "margin + fees ≥ 95% — impossible"
                    : `at ${state.defaults.targetMarginPercent}% margin, ${product.channelFeePercent}% fees`}
                </span>
              </div>
              <PriceLine k={`At markup instead (${state.defaults.markupPercent}%)`}>
                {money(markupPrice(math.unitCost, state.defaults))}
              </PriceLine>
              {sugg !== null && (
                <div className="flex flex-wrap gap-2">
                  {[0.25, 0.5, 1].map((step) => (
                    <Button
                      key={step}
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        setProduct(active, { currentPrice: roundUpTo(sugg, step) })
                      }
                    >
                      Charge {money(roundUpTo(sugg, step))} (round to{" "}
                      {step === 1 ? "$1" : `¢${step * 100}`})
                    </Button>
                  ))}
                </div>
              )}
              <div>
                <PriceLine k="At your current price">{money(product.currentPrice)}</PriceLine>
                <PriceLine k="Profit / unit">
                  <span className={BAND_CLASS[current.band]}>{money(current.profit)}</span>
                </PriceLine>
                <PriceLine k="Real margin">
                  <span className={BAND_CLASS[current.band]}>
                    {current.marginPercent.toFixed(1)}%
                  </span>
                </PriceLine>
              </div>
            </Section>

            <Section
              title="Gear that pays for itself"
              blurb="The short list behind honest costing."
            >
              <ul className="flex flex-col gap-2">
                {AFFILIATE_SLOTS.map((slot) => (
                  <li key={slot.id}>
                    <a
                      href={slot.href}
                      data-affiliate-slot={slot.id}
                      rel="sponsored nofollow"
                      className="block rounded-md bg-inset p-3 shadow-[0_0_0_1px_var(--color-border)] hover:shadow-[0_0_0_1px_var(--color-border-strong)]"
                    >
                      <span className="text-sm font-medium text-fg">{slot.label}</span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-muted">
                        {slot.blurb}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-faint">
                <span className="font-medium">Affiliate disclosure:</span> Some links on
                this page are affiliate links. If you buy through them, DoughMatrix may
                earn a small commission at no extra cost to you.
                <br />
                As an Amazon Associate I earn from qualifying purchases.
              </p>
            </Section>
          </div>
        </div>

        <div className="mt-4">
          <Section
            title="Profit per order"
            blurb="Market day math: a whole order, with the real card fee taken out — not the per-item guess."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] tracking-wide text-faint uppercase">
                    <th className="py-1 pr-2 font-medium">Item</th>
                    <th className="py-1 pr-2 text-right font-medium">Qty</th>
                    <th className="py-1 pr-2 text-right font-medium">Price</th>
                    <th className="py-1 pr-2 text-right font-medium">Revenue</th>
                    <th className="py-1 pr-2 text-right font-medium">Cost</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {state.order.map((line, li) => {
                    const item = resolveOrderItem(state, line);
                    const key = `${line.productIndex}:${line.variantIndex ?? ""}`;
                    return (
                      <tr key={li}>
                        <td className="py-1 pr-2">
                          <select
                            value={key}
                            aria-label="Order item"
                            onChange={(e) => {
                              const [pi, vi] = e.target.value.split(":");
                              setOrderLine(li, {
                                productIndex: Number(pi),
                                variantIndex: vi === "" ? null : Number(vi),
                              });
                            }}
                            className={inputClass}
                          >
                            {orderOptions.map((o) => (
                              <option key={o.key} value={o.key}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-1 pr-2">
                          <input
                            type="number"
                            value={line.qty}
                            min={0}
                            step={1}
                            aria-label="Quantity"
                            onChange={(e) =>
                              setOrderLine(li, { qty: Number(e.target.value) })
                            }
                            className={inputClass}
                          />
                        </td>
                        <td className="py-1 pr-2 text-right text-fg tabular-nums">
                          {item ? money(item.price) : "—"}
                        </td>
                        <td className="py-1 pr-2 text-right text-fg tabular-nums">
                          {item ? money(item.price * line.qty) : "—"}
                        </td>
                        <td className="py-1 pr-2 text-right text-fg tabular-nums">
                          {item ? money(item.unitCost * line.qty) : "—"}
                        </td>
                        <td className="py-1">
                          <button
                            onClick={() => removeOrderLine(li)}
                            aria-label="Remove order line"
                            className="p-1 text-faint hover:text-[#f87171]"
                          >
                            <X className="size-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <Button variant="secondary" size="sm" onClick={addOrderLine}>
                <Plus className="size-4" /> Add line
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
              {(
                [
                  ["Revenue", money(order.revenue), ""],
                  ["Product cost", money(order.cost), ""],
                  ["Card fees", money(order.fees), ""],
                  ["Profit", money(order.profit), BAND_CLASS[order.band]],
                  ["Order margin", `${order.marginPercent.toFixed(1)}%`, BAND_CLASS[order.band]],
                ] as const
              ).map(([label, value, cls]) => (
                <div key={label}>
                  <p className="text-xs text-faint">{label}</p>
                  <p className={cn("mt-1 text-xl font-semibold text-fg tabular-nums", cls)}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <NewsletterSignup />
      </main>
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <GuidesFooter />
      </div>
    </div>
  );
}
