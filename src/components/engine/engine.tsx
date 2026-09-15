import { useMemo, useState, type ReactNode } from "react";
import {
  ChefHat,
  Copy,
  Droplets,
  RotateCcw,
  Scale,
  Thermometer,
  Timer,
} from "lucide-react";
import { FLOURS } from "@/lib/sourdough/flours";
import {
  buildTimeline,
  computeFormula,
  formatClock,
  formatGrams,
  formatHours,
  formulaPlaintext,
} from "@/lib/sourdough/math";
import { PRESETS } from "@/lib/sourdough/presets";
import { useBaker, useBakerInput } from "@/lib/sourdough/store";
import type { FormulaResult, Maturity, MixMode } from "@/lib/sourdough/types";
import { Button } from "@/components/ui/button";
import { GuidesFooter } from "@/components/guides-footer";
import { SiteHeader } from "@/components/site-header";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { HydrationDial } from "./dial";
import { KitchenMode } from "./kitchen";
import { OverPourRescue } from "./rescue";
import { Stepper } from "./stepper";

export function Engine() {
  const input = useBakerInput();
  const formula = useMemo(() => computeFormula(input), [input]);
  const reset = useBaker((s) => s.reset);
  const [kitchen, setKitchen] = useState(false);
  const [rescue, setRescue] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(formulaPlaintext(formula, input));
      setCopied(true);
      track("copy_formula");
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <div className="min-h-dvh" {...(kitchen ? { inert: true, "aria-hidden": true } : {})}>
        <SiteHeader
          home
          actions={
            <>
              <Button variant="ghost" size="icon" onClick={() => void copy()} aria-label="Copy formula">
                <Copy className="size-4" />
                <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={reset}
                aria-label="Reset formula"
              >
                <RotateCcw className="size-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setRescue(true);
                  track("rescue");
                }}
              >
                Rescue
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  if (typeof navigator !== "undefined" && "wakeLock" in navigator) {
                    void navigator.wakeLock.request("screen").catch(() => undefined);
                  }
                  setKitchen(true);
                  track("kitchen");
                }}
              >
                <ChefHat className="size-4" />
                <span className="hidden sm:inline">Kitchen</span>
              </Button>
            </>
          }
        />
        <main className="mx-auto flex max-w-6xl flex-col gap-5 px-4 pb-16">
          <PresetsRow />
          <div className="grid items-start gap-5 lg:grid-cols-12">
            <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
              <ReadoutCard formula={formula} />
            </div>
            <div className="order-2 lg:order-1 flex flex-col gap-5 lg:col-span-5 lg:col-start-1 lg:row-span-2">
              <FormulaCard formula={formula} />
              <FlourCard />
            </div>
            <div className="order-3 flex flex-col gap-5 lg:col-span-7 lg:col-start-6">
              <ScaleCard formula={formula} />
              <FermentCard formula={formula} />
              <div className="grid gap-5 md:grid-cols-2">
                <LevainCard formula={formula} />
                <DdtCard formula={formula} />
              </div>
              <TimelineCard formula={formula} />
            </div>
          </div>
          <GuidesFooter className="pt-4" />
        </main>
      </div>
      <KitchenMode open={kitchen} onClose={() => setKitchen(false)} />
      <OverPourRescue open={rescue} onOpenChange={setRescue} formula={formula} />
    </>
  );
}

function PresetsRow() {
  const applyPreset = useBaker((s) => s.applyPreset);

  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {PRESETS.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => {
            applyPreset(p);
            track("preset", { id: p.id });
          }}
          className="shrink-0 rounded-full bg-transparent px-3.5 py-2 text-sm text-muted shadow-[0_0_0_1px_var(--color-border)] transition-colors duration-150 hover:bg-card hover:text-fg"
        >
          {p.name}
        </button>
      ))}
    </div>
  );
}

function Card({
  title,
  icon,
  children,
  className,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-lg bg-card p-4 shadow-[0_0_0_1px_var(--color-border)] sm:p-5",
        className,
      )}
    >
      <header className="mb-4 flex items-center gap-2">
        {icon ? <span className="text-accent">{icon}</span> : null}
        <h2 className="text-sm font-medium tracking-wide text-muted uppercase">
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}

function FormulaCard({ formula }: { formula: FormulaResult }) {
  const mixMode = useBaker((s) => s.mixMode);
  const set = useBaker((s) => s.set);
  const bump = useBaker((s) => s.bump);
  const flourWeight = useBaker((s) => s.flourWeight);
  const doughWeightTarget = useBaker((s) => s.doughWeightTarget);
  const loafCount = useBaker((s) => s.loafCount);
  const hydration = useBaker((s) => s.targetTrueHydration);
  const starterWeight = useBaker((s) => s.starterWeight);
  const starterHydration = useBaker((s) => s.starterHydration);
  const saltPercent = useBaker((s) => s.saltPercent);

  return (
    <Card title="Formula" icon={<Scale className="size-4" />}>
      <Segmented<MixMode>
        value={mixMode}
        onChange={(v) => {
          if (v === "dough") {
            set({ mixMode: v, doughWeightTarget: Math.round(formula.doughWeight) });
          } else {
            set({
              mixMode: v,
              flourWeight: Math.round(formula.flourWeight),
              starterWeight: Math.round(formula.starterWeight),
            });
          }
        }}
        options={[
          { id: "flour", label: "By flour" },
          { id: "dough", label: "By dough" },
        ]}
      />
      <div className="mt-4 grid grid-cols-2 gap-3">
        {mixMode === "flour" ? (
          <Stepper
            label="Flour"
            value={formatGrams(flourWeight)}
            unit="g"
            onDec={() => bump("flourWeight", -10)}
            onInc={() => bump("flourWeight", 10)}
          />
        ) : (
          <Stepper
            label="Dough"
            value={formatGrams(doughWeightTarget)}
            unit="g"
            onDec={() => bump("doughWeightTarget", -25)}
            onInc={() => bump("doughWeightTarget", 25)}
          />
        )}
        <Stepper
          label="Loaves"
          value={String(loafCount)}
          onDec={() => bump("loafCount", -1)}
          onInc={() => bump("loafCount", 1)}
        />
        <Stepper
          label="True hydration"
          hint={`baker’s ${formula.bakerHydration.toFixed(1)}%`}
          value={hydration.toFixed(1)}
          unit="%"
          onDec={() => bump("targetTrueHydration", -0.5)}
          onInc={() => bump("targetTrueHydration", 0.5)}
        />
        <Stepper
          label="Salt"
          hint={`${formatGrams(formula.saltWeight, 1)} g`}
          value={saltPercent.toFixed(1)}
          unit="%"
          onDec={() => bump("saltPercent", -0.1)}
          onInc={() => bump("saltPercent", 0.1)}
        />
        <Stepper
          label="Starter"
          hint={`${formatGrams(formula.starterFlour)} g flour`}
          value={formatGrams(starterWeight)}
          unit="g"
          onDec={() => bump("starterWeight", -5)}
          onInc={() => bump("starterWeight", 5)}
        />
        <Stepper
          label="Starter hydration"
          hint="1:1 is 100%"
          value={formatGrams(starterHydration)}
          unit="%"
          onDec={() => bump("starterHydration", -5)}
          onInc={() => bump("starterHydration", 5)}
        />
      </div>
      <p className="mt-4 text-xs leading-relaxed text-faint">
        True hydration counts the {formatGrams(formula.starterFlour)} g flour and{" "}
        {formatGrams(formula.starterWater)} g water inside the starter, not just bowl water
        over bowl flour.
      </p>
    </Card>
  );
}

function FlourCard() {
  const flourId = useBaker((s) => s.flourId);
  const blendId = useBaker((s) => s.blendId);
  const blendPercent = useBaker((s) => s.blendPercent);
  const customName = useBaker((s) => s.customName);
  const customProtein = useBaker((s) => s.customProtein);
  const customCeiling = useBaker((s) => s.customCeiling);
  const set = useBaker((s) => s.set);
  const bump = useBaker((s) => s.bump);

  const visible = FLOURS.filter((f) => f.id !== "custom" || flourId === "custom");

  return (
    <Card title="Flour & ceiling">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {visible.map((f) => {
          const active = f.id === flourId;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => set({ flourId: f.id })}
              className={cn(
                "rounded-md px-3 py-2.5 text-left transition-colors duration-150",
                "shadow-[0_0_0_1px_var(--color-border)] hover:bg-inset",
                active && "bg-inset shadow-[0_0_0_1px_var(--color-accent)]",
              )}
            >
              <div className="text-sm font-medium text-fg">{f.short}</div>
              <div className="mt-0.5 text-xs text-faint tabular">
                {f.protein.toFixed(1)}% · ceil {f.ceiling}%
              </div>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => set({ flourId: "custom" })}
          className={cn(
            "rounded-md px-3 py-2.5 text-left transition-colors duration-150",
            "shadow-[0_0_0_1px_var(--color-border)] hover:bg-inset",
            flourId === "custom" && "bg-inset shadow-[0_0_0_1px_var(--color-accent)]",
          )}
        >
          <div className="text-sm font-medium text-fg">Custom</div>
          <div className="mt-0.5 text-xs text-faint">Your bag</div>
        </button>
      </div>

      {flourId === "custom" ? (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="col-span-2 flex flex-col gap-1.5">
            <span className="text-sm font-medium">Name</span>
            <input
              value={customName}
              onChange={(e) => set({ customName: e.target.value })}
              className="h-11 rounded-md bg-inset px-3 text-sm text-fg shadow-[0_0_0_1px_var(--color-border)] outline-none focus:shadow-[0_0_0_2px_var(--color-accent)]"
            />
          </label>
          <Stepper
            label="Protein"
            value={customProtein.toFixed(1)}
            unit="%"
            onDec={() => bump("customProtein", -0.1)}
            onInc={() => bump("customProtein", 0.1)}
          />
          <Stepper
            label="Ceiling"
            value={customCeiling.toFixed(0)}
            unit="%"
            onDec={() => bump("customCeiling", -1)}
            onInc={() => bump("customCeiling", 1)}
          />
        </div>
      ) : null}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium">Second flour</span>
        <button
          type="button"
          onClick={() =>
            set({
              blendId: blendId ? null : "ww",
              blendPercent: blendId ? 0 : 20,
            })
          }
          className="text-sm text-accent hover:text-accent-hover"
        >
          {blendId ? "Remove blend" : "Add blend"}
        </button>
      </div>
      {blendId ? (
        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Blend</span>
            <select
              value={blendId}
              onChange={(e) => set({ blendId: e.target.value })}
              className="h-11 rounded-md bg-inset px-3 text-sm text-fg shadow-[0_0_0_1px_var(--color-border)] outline-none focus:shadow-[0_0_0_2px_var(--color-accent)]"
            >
              {FLOURS.filter((f) => f.id !== "custom" && f.id !== flourId).map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </label>
          <Stepper
            label="Percent"
            value={String(blendPercent)}
            unit="%"
            onDec={() => bump("blendPercent", -5)}
            onInc={() => bump("blendPercent", 5)}
          />
        </div>
      ) : null}
    </Card>
  );
}

function ReadoutCard({ formula }: { formula: FormulaResult }) {
  return (
    <section className="rounded-lg bg-card px-4 pt-4 pb-6 shadow-[0_0_0_1px_var(--color-border)] sm:px-6">
      <HydrationDial formula={formula} />
    </section>
  );
}

function ScaleCard({ formula }: { formula: FormulaResult }) {
  const loafCount = useBaker((s) => s.loafCount);
  const rows = [
    { label: "Flour", g: formula.flourWeight, note: formula.blend ? "blend total" : formula.primary.short },
    { label: "Water", g: formula.waterWeight, note: "bowl" },
    { label: "Starter", g: formula.starterWeight, note: `${formatGrams(formula.starterFlour)}/${formatGrams(formula.starterWater)}` },
    { label: "Salt", g: formula.saltWeight, note: "on total flour", digits: 1 },
  ] as const;

  return (
    <Card title="Scale-out" icon={<Droplets className="size-4" />}>
      <ul className="divide-y divide-border">
        {rows.map((row) => (
          <li key={row.label} className="flex items-baseline justify-between gap-3 py-2.5">
            <div>
              <div className="text-sm text-fg">{row.label}</div>
              <div className="text-xs text-faint">{row.note}</div>
            </div>
            <div className="text-xl font-medium tabular text-fg">
              {formatGrams(row.g, "digits" in row ? row.digits : 0)}
              <span className="ml-1 text-xs font-normal text-muted">g</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-baseline justify-between rounded-md bg-inset px-3 py-3">
        <span className="text-sm text-muted">
          Dough{loafCount > 1 ? ` · ${loafCount} loaves` : ""}
        </span>
        <span className="text-lg font-medium tabular text-accent">
          {formatGrams(formula.doughWeight)} g
          {loafCount > 1 ? (
            <span className="ml-2 text-sm font-normal text-muted">
              {formatGrams(formula.perLoafWeight)} g each
            </span>
          ) : null}
        </span>
      </div>
    </Card>
  );
}

function FermentCard({ formula }: { formula: FormulaResult }) {
  const doughTempC = useBaker((s) => s.doughTempC);
  const maturity = useBaker((s) => s.maturity);
  const bump = useBaker((s) => s.bump);
  const set = useBaker((s) => s.set);
  const bulk = formula.bulk;

  return (
    <Card title="Bulk fermentation" icon={<Timer className="size-4" />}>
      <div className="grid grid-cols-2 gap-3">
        <Stepper
          label="Dough temp"
          value={doughTempC.toFixed(1)}
          unit="°C"
          onDec={() => bump("doughTempC", -0.5)}
          onInc={() => bump("doughTempC", 0.5)}
        />
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Levain</span>
          <Segmented<Maturity>
            value={maturity}
            onChange={(v) => set({ maturity: v })}
            options={[
              { id: "young", label: "Young" },
              { id: "peak", label: "Peak" },
              { id: "late", label: "Late" },
            ]}
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <TimeStat label="Earliest" value={formatHours(bulk.minH)} />
        <TimeStat label="Target" value={formatHours(bulk.targetH)} accent />
        <TimeStat label="Latest" value={formatHours(bulk.maxH)} />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-faint">
        t(T) = 5.0h · 2^((24 − T) / 8.5) · (20% / inoculation) · maturity. Inoculation{" "}
        {(formula.inoculation * 100).toFixed(0)}% of flour. Folds every {bulk.foldEveryMin} min
        × {bulk.foldCount}. Warm proof ~{formatHours(bulk.proofH)}, or retard{" "}
        {bulk.coldProofMinH}–{bulk.coldProofMaxH} h at 4°C.
      </p>
    </Card>
  );
}

function TimeStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-md bg-inset px-3 py-3 shadow-[0_0_0_1px_var(--color-border)]">
      <div className="text-xs uppercase tracking-widest text-faint">{label}</div>
      <div
        className={
          accent
            ? "mt-1 font-display text-2xl tabular text-accent"
            : "mt-1 font-display text-2xl tabular text-fg"
        }
      >
        {value}
      </div>
    </div>
  );
}

function LevainCard({ formula }: { formula: FormulaResult }) {
  const starterHydration = useBaker((s) => s.starterHydration);
  const doughTempC = useBaker((s) => s.doughTempC);
  const need = formula.starterWeight;
  const seed = need / 5;
  const flour = (need - seed) * (100 / (100 + starterHydration));
  const water = need - seed - flour;
  const readyH = 5 * Math.pow(2, (24 - doughTempC) / 8.5);

  return (
    <Card title="Build the levain">
      <p className="text-sm text-muted">
        1:2:2 from seed to make {formatGrams(need)} g at {formatGrams(starterHydration)}% H.
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        <Li k="Ripe seed" v={`${formatGrams(seed, 1)} g`} />
        <Li k="Flour" v={`${formatGrams(flour)} g`} />
        <Li k="Water" v={`${formatGrams(water)} g`} />
        <Li k="Ready" v={`~${formatHours(readyH)} at ${doughTempC.toFixed(0)}°C`} />
      </ul>
    </Card>
  );
}

function DdtCard({ formula }: { formula: FormulaResult }) {
  const roomTempC = useBaker((s) => s.roomTempC);
  const flourTempC = useBaker((s) => s.flourTempC);
  const starterTempC = useBaker((s) => s.starterTempC);
  const frictionC = useBaker((s) => s.frictionC);
  const bump = useBaker((s) => s.bump);
  const warn = formula.waterTempC < 3 || formula.waterTempC > 38;

  return (
    <Card title="Desired dough temp" icon={<Thermometer className="size-4" />}>
      <div className="font-display text-3xl tabular text-fg">
        {formula.waterTempC.toFixed(0)}
        <span className="ml-1 text-base text-muted">°C water</span>
      </div>
      <p className="mt-1 text-xs text-faint">
        4-factor: 4×DDT − flour − room − starter − friction
      </p>
      {warn ? (
        <p className="mt-2 text-sm text-caution">
          Water temp is outside 3–38°C. Shift room or friction, or accept a different DDT.
        </p>
      ) : null}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Stepper
          size="sm"
          label="Room"
          value={roomTempC.toFixed(0)}
          unit="°C"
          onDec={() => bump("roomTempC", -1)}
          onInc={() => bump("roomTempC", 1)}
        />
        <Stepper
          size="sm"
          label="Flour"
          value={flourTempC.toFixed(0)}
          unit="°C"
          onDec={() => bump("flourTempC", -1)}
          onInc={() => bump("flourTempC", 1)}
        />
        <Stepper
          size="sm"
          label="Starter"
          value={starterTempC.toFixed(0)}
          unit="°C"
          onDec={() => bump("starterTempC", -1)}
          onInc={() => bump("starterTempC", 1)}
        />
        <Stepper
          size="sm"
          label="Friction"
          hint="0 hand, 6 mixer"
          value={frictionC.toFixed(0)}
          unit="°C"
          onDec={() => bump("frictionC", -1)}
          onInc={() => bump("frictionC", 1)}
        />
      </div>
    </Card>
  );
}

function TimelineCard({ formula }: { formula: FormulaResult }) {
  const bulkStartedAt = useBaker((s) => s.bulkStartedAt);
  const startBulk = useBaker((s) => s.startBulk);
  const clearBulk = useBaker((s) => s.clearBulk);
  const events = useMemo(() => buildTimeline(formula), [formula]);
  const origin = bulkStartedAt ?? null;

  return (
    <Card title="Bench timeline">
      <div className="mb-3 flex gap-2">
        {origin ? (
          <Button size="sm" onClick={clearBulk}>
            Clear start
          </Button>
        ) : (
          <Button size="sm" variant="primary" onClick={startBulk}>
            Start from now
          </Button>
        )}
      </div>
      <ol className="space-y-0">
        {events
          .filter((e) => e.kind !== "cold")
          .map((e, i, arr) => (
            <li key={e.id} className="flex gap-3">
              <div className="flex w-16 shrink-0 flex-col items-end pt-0.5">
                <span className="text-xs tabular text-muted">
                  {origin
                    ? formatClock(origin, e.offsetMin)
                    : e.offsetMin === 0
                      ? "now"
                      : `+${formatHours(e.offsetMin / 60)}`}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="mt-1 size-2 rounded-full bg-accent" />
                {i < arr.length - 1 ? (
                  <span className="w-px flex-1 bg-border" />
                ) : null}
              </div>
              <div className="pb-4">
                <div className="text-sm font-medium text-fg">{e.label}</div>
                <div className="text-xs text-muted">{e.detail}</div>
              </div>
            </li>
          ))}
      </ol>
      <p className="text-xs text-faint">
        Cold retard after shaping: {formula.bulk.coldProofMinH}–{formula.bulk.coldProofMaxH} hours
        at 4°C, then bake from cold.
      </p>
    </Card>
  );
}

function Li({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex items-baseline justify-between gap-3">
      <span className="text-muted">{k}</span>
      <span className="tabular text-fg">{v}</span>
    </li>
  );
}

function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
}) {
  return (
    <div className="grid auto-cols-fr grid-flow-col gap-1 rounded-md bg-inset p-1 shadow-[0_0_0_1px_var(--color-border)]">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={cn(
            "h-9 rounded-sm px-2 text-sm transition-colors duration-150",
            value === o.id ? "bg-card text-fg" : "text-muted hover:text-fg",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
