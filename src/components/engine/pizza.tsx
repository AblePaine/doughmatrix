import { useMemo, useState, type ReactNode } from "react";
import { AlertTriangle, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GuidesFooter } from "@/components/guides-footer";
import { SiteHeader } from "@/components/site-header";
import { Stepper } from "@/components/engine/stepper";
import {
  computePizza,
  formatYeast,
  pizzaPlaintext,
  yeastTsp,
} from "@/lib/pizza/math";
import { PIZZA_STYLES } from "@/lib/pizza/styles";
import { usePizza, usePizzaInput } from "@/lib/pizza/store";
import type { PizzaStyle, SizeMode, YeastType } from "@/lib/pizza/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string; hint?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-fg">{label}</span>
      <div
        role="radiogroup"
        aria-label={label}
        className="grid gap-1 rounded-md bg-inset p-1 shadow-[0_0_0_1px_var(--color-border)]"
        style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
      >
        {options.map((o) => (
          <button
            key={o.value}
            role="radio"
            aria-checked={value === o.value}
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-sm px-2 py-2 text-center transition-colors",
              value === o.value
                ? "bg-card text-fg shadow-[0_0_0_1px_var(--color-border-strong)]"
                : "text-muted hover:text-fg",
            )}
          >
            <span className="block text-sm font-medium">{o.label}</span>
            {o.hint ? (
              <span className="mt-0.5 block text-[11px] leading-tight text-faint">
                {o.hint}
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}

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

export function PizzaEngine() {
  const input = usePizzaInput();
  const set = usePizza((s) => s.set);
  const bump = usePizza((s) => s.bump);
  const applyStyle = usePizza((s) => s.applyStyle);
  const reset = usePizza((s) => s.reset);
  const result = useMemo(() => computePizza(input), [input]);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pizzaPlaintext(result, input));
      setCopied(true);
      track("copy_pizza_formula");
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  const activeStyle = PIZZA_STYLES.find((s) => s.id === input.style)!;
  const tsp = yeastTsp(result.yeastWeight, input.yeastType);

  return (
    <>
      <div className="min-h-dvh">
        <SiteHeader
          actions={
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => void copy()}
                aria-label="Copy formula"
              >
                <Copy className="size-4" />
                <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={reset} aria-label="Reset">
                <RotateCcw className="size-4" />
              </Button>
            </>
          }
        />
        <main className="mx-auto max-w-6xl px-4 pt-6 pb-10">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Pizza calculator
          </p>
          <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
            Pizza dough, worked out.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            Pick a style, size your dough, set your fermentation — the yeast,
            water, and bake are calculated. Hydration is matched to the heat
            you actually own.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_380px]">
            <div className="flex flex-col gap-4">
              <Section
                title="Style"
                blurb="Sets hydration, salt, oil, and the bake. You can still tune everything below."
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  {PIZZA_STYLES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        applyStyle(s.id as PizzaStyle);
                        track("pizza_style", { style: s.id });
                      }}
                      aria-pressed={input.style === s.id}
                      className={cn(
                        "rounded-md p-4 text-left shadow-[0_0_0_1px_var(--color-border)] transition-shadow",
                        input.style === s.id
                          ? "bg-accent-dim shadow-[0_0_0_1px_rgb(229_169_98_/_0.5)]"
                          : "bg-inset hover:shadow-[0_0_0_1px_var(--color-border-strong)]",
                      )}
                    >
                      <span className="font-medium text-fg">{s.name}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted">
                        {s.tagline}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-xs leading-relaxed text-faint">
                  Flour: {activeStyle.flourNote}
                </p>
              </Section>

              <Section title="Dough size">
                <Segmented<SizeMode>
                  label="Size by"
                  value={input.sizeMode}
                  onChange={(v) => set({ sizeMode: v })}
                  options={[
                    { value: "balls", label: "Dough balls", hint: "round pies" },
                    { value: "pan", label: "Pan size", hint: "Detroit / sheet" },
                  ]}
                />
                {input.sizeMode === "balls" ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Stepper
                      label="Balls"
                      value={String(input.ballCount)}
                      onDec={() => bump("ballCount", -1)}
                      onInc={() => bump("ballCount", 1)}
                    />
                    <Stepper
                      label="Ball weight"
                      hint="260–280 g for a 12 in pie"
                      value={String(input.ballWeight)}
                      unit="g"
                      onDec={() => bump("ballWeight", -10)}
                      onInc={() => bump("ballWeight", 10)}
                    />
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Stepper
                      label="Pan length"
                      value={String(input.panLengthIn)}
                      unit="in"
                      onDec={() => bump("panLengthIn", -1)}
                      onInc={() => bump("panLengthIn", 1)}
                    />
                    <Stepper
                      label="Pan width"
                      value={String(input.panWidthIn)}
                      unit="in"
                      onDec={() => bump("panWidthIn", -1)}
                      onInc={() => bump("panWidthIn", 1)}
                    />
                  </div>
                )}
                <p className="text-sm text-muted">
                  Dough weight:{" "}
                  <span className="font-medium text-fg tabular-nums">
                    {result.doughWeight.toFixed(0)} g
                  </span>
                  {result.panAreaIn2 ? (
                    <span className="text-faint">
                      {" "}
                      ({result.panAreaIn2.toFixed(0)} in² pan)
                    </span>
                  ) : (
                    <span className="text-faint">
                      {" "}
                      ({result.ballCount} × {result.perBallWeight.toFixed(0)} g)
                    </span>
                  )}
                </p>
              </Section>

              <Section title="Hydration">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-medium text-fg">Hydration</span>
                    <span className="text-xl font-medium tracking-tight text-fg tabular-nums">
                      {input.hydration.toFixed(0)}
                      <span className="text-xs text-muted"> %</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={85}
                    step={0.5}
                    value={input.hydration}
                    onChange={(e) => set({ hydration: Number(e.target.value) })}
                    aria-label="Hydration percent"
                    className="w-full accent-[var(--color-accent)]"
                  />
                  <div className="flex justify-between text-[11px] text-faint">
                    <span>50% — stiff</span>
                    <span>85% — soup</span>
                  </div>
                </div>
                {result.warning !== "ok" && (
                  <p
                    role="alert"
                    className={cn(
                      "flex gap-2 rounded-md p-3 text-sm leading-relaxed",
                      result.warning === "danger"
                        ? "bg-red-950/40 text-red-200"
                        : "bg-amber-950/40 text-amber-200",
                    )}
                  >
                    <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                    {result.warningText}
                  </p>
                )}
              </Section>

              <Section title="Salt & oil">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Stepper
                    label="Salt"
                    hint="% of flour"
                    value={input.saltPercent.toFixed(1)}
                    unit="%"
                    onDec={() => bump("saltPercent", -0.1)}
                    onInc={() => bump("saltPercent", 0.1)}
                  />
                  <Stepper
                    label="Olive oil"
                    hint="% of flour, optional"
                    value={input.oilPercent.toFixed(1)}
                    unit="%"
                    onDec={() => bump("oilPercent", -0.5)}
                    onInc={() => bump("oilPercent", 0.5)}
                  />
                </div>
              </Section>

              <Section
                title="Yeast & fermentation"
                blurb="Yeast is dosed from your schedule — long cold ferments need surprisingly little."
              >
                <Segmented<YeastType>
                  label="Leavening"
                  value={input.yeastType}
                  onChange={(v) => set({ yeastType: v })}
                  options={[
                    { value: "idy", label: "Instant dry" },
                    { value: "ady", label: "Active dry" },
                    { value: "fresh", label: "Fresh" },
                    { value: "sourdough", label: "Sourdough", hint: "starter" },
                  ]}
                />
                {input.yeastType === "sourdough" && (
                  <Stepper
                    label="Starter hydration"
                    value={String(input.starterHydration)}
                    unit="%"
                    onDec={() => bump("starterHydration", -5)}
                    onInc={() => bump("starterHydration", 5)}
                  />
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Stepper
                    label="Cold ferment"
                    hint="fridge, hours"
                    value={String(input.coldHours)}
                    unit="h"
                    onDec={() => bump("coldHours", -4)}
                    onInc={() => bump("coldHours", 4)}
                  />
                  <Stepper
                    label="Room time"
                    hint="before/after fridge"
                    value={String(input.roomHours)}
                    unit="h"
                    onDec={() => bump("roomHours", -0.5)}
                    onInc={() => bump("roomHours", 0.5)}
                  />
                </div>
                <Stepper
                  label="Room temp"
                  value={input.roomTempC.toFixed(1)}
                  unit="°C"
                  onDec={() => bump("roomTempC", -0.5)}
                  onInc={() => bump("roomTempC", 0.5)}
                />
                <p className="text-sm text-muted">
                  {result.yeastLabel}:{" "}
                  <span className="font-medium text-fg">
                    {input.yeastType === "sourdough"
                      ? `${result.starterWeight.toFixed(0)} g`
                      : `${formatYeast(result.yeastWeight)}${tsp ? ` ${tsp}` : ""}`}
                  </span>{" "}
                  <span className="text-faint">
                    ({result.coldEquivHours.toFixed(0)} h cold-equivalent
                    fermentation)
                  </span>
                </p>
              </Section>

              <Section title="Water temperature">
                <div className="grid gap-4 sm:grid-cols-3">
                  <Stepper
                    label="Target dough"
                    value={input.doughTempC.toFixed(1)}
                    unit="°C"
                    onDec={() => bump("doughTempC", -0.5)}
                    onInc={() => bump("doughTempC", 0.5)}
                  />
                  <Stepper
                    label="Flour temp"
                    value={input.flourTempC.toFixed(1)}
                    unit="°C"
                    onDec={() => bump("flourTempC", -0.5)}
                    onInc={() => bump("flourTempC", 0.5)}
                  />
                  <Stepper
                    label="Mixer friction"
                    hint="0 for hand mix"
                    value={input.frictionC.toFixed(1)}
                    unit="°C"
                    onDec={() => bump("frictionC", -0.5)}
                    onInc={() => bump("frictionC", 0.5)}
                  />
                </div>
              </Section>
            </div>

            <div className="flex flex-col gap-4">
              <section className="rounded-lg bg-card p-5 shadow-[0_0_0_1px_var(--color-border)] lg:sticky lg:top-4">
                <h2 className="font-display text-xl tracking-tight text-fg">
                  Formula
                </h2>
                <dl className="mt-4 space-y-2.5 text-sm">
                  <div className="flex items-baseline justify-between gap-2">
                    <dt className="text-muted">Flour</dt>
                    <dd className="font-medium text-fg tabular-nums">
                      {result.flourWeight.toFixed(0)} g
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <dt className="text-muted">
                      Water
                      <span className="block text-xs text-faint">
                        at ~{result.waterTempC.toFixed(0)}°C
                      </span>
                    </dt>
                    <dd className="font-medium text-fg tabular-nums">
                      {result.waterWeight.toFixed(0)} g
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <dt className="text-muted">Salt</dt>
                    <dd className="font-medium text-fg tabular-nums">
                      {result.saltWeight.toFixed(1)} g
                    </dd>
                  </div>
                  {result.oilWeight > 0.05 && (
                    <div className="flex items-baseline justify-between gap-2">
                      <dt className="text-muted">Olive oil</dt>
                      <dd className="font-medium text-fg tabular-nums">
                        {result.oilWeight.toFixed(1)} g
                      </dd>
                    </div>
                  )}
                  <div className="flex items-baseline justify-between gap-2 border-t border-border/70 pt-2.5">
                    <dt className="text-muted">{result.yeastLabel}</dt>
                    <dd className="text-right font-medium text-fg tabular-nums">
                      {input.yeastType === "sourdough"
                        ? `${result.starterWeight.toFixed(0)} g`
                        : formatYeast(result.yeastWeight)}
                      {tsp && (
                        <span className="block text-xs font-normal text-faint">
                          {tsp}
                          {result.yeastWeight < 1 &&
                            " — you want a 0.1 g scale"}
                        </span>
                      )}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-2 border-t border-border/70 pt-2.5">
                    <dt className="text-muted">Total dough</dt>
                    <dd className="font-medium text-fg tabular-nums">
                      {result.doughWeight.toFixed(0)} g
                    </dd>
                  </div>
                </dl>
                <div className="mt-4 rounded-md bg-inset p-3 text-xs leading-relaxed text-muted shadow-[0_0_0_1px_var(--color-border)]">
                  True hydration {result.hydration.toFixed(1)}% — counts the
                  starter's water and flour, same as the sourdough engine.
                </div>
                <Button
                  className="mt-4 w-full"
                  variant="secondary"
                  onClick={() => void copy()}
                >
                  <Copy className="size-4" />
                  {copied ? "Copied" : "Copy formula"}
                </Button>
              </section>

              <section className="rounded-lg bg-card p-5 shadow-[0_0_0_1px_var(--color-border)]">
                <h2 className="font-display text-xl tracking-tight text-fg">
                  Bake
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-fg">
                  <span className="font-medium tabular-nums">
                    {result.bake.tempF}°F
                  </span>{" "}
                  · {result.bake.surface}
                </p>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex gap-2">
                    <dt className="w-16 shrink-0 text-faint">Preheat</dt>
                    <dd className="text-muted">{result.bake.preheat}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-16 shrink-0 text-faint">Time</dt>
                    <dd className="text-muted">{result.bake.bakeTime}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {result.bake.notes}
                </p>
              </section>

              <section className="rounded-lg bg-card p-5 shadow-[0_0_0_1px_var(--color-border)]">
                <h2 className="font-display text-xl tracking-tight text-fg">
                  Timeline
                </h2>
                <ol className="mt-4 space-y-3">
                  {result.timeline.map((e, i) => (
                    <li key={e.id} className="flex gap-3">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-inset text-[11px] font-medium text-muted shadow-[0_0_0_1px_var(--color-border)]">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-fg">{e.label}</p>
                        <p className="text-sm leading-relaxed text-muted">
                          {e.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </div>
        </main>
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <GuidesFooter />
        </div>
      </div>
    </>
  );
}
