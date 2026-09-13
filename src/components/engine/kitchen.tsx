import { useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { computeFormula, formatGrams, formatHours } from "@/lib/sourdough/math";
import { useBaker, useBakerInput } from "@/lib/sourdough/store";
import { cn } from "@/lib/utils";
import { HoldButton } from "./stepper";

type WakeStatus = "off" | "held" | "unsupported" | "error";

function useWakeLock(active: boolean): WakeStatus {
  const [status, setStatus] = useState<WakeStatus>("off");

  useEffect(() => {
    if (!active) {
      setStatus("off");
      return;
    }
    if (typeof navigator === "undefined" || !("wakeLock" in navigator)) {
      setStatus("unsupported");
      return;
    }

    let cancelled = false;
    let sentinel: WakeLockSentinel | null = null;

    const request = async () => {
      try {
        const lock = await navigator.wakeLock.request("screen");
        if (cancelled) {
          await lock.release();
          return;
        }
        sentinel = lock;
        setStatus("held");
        lock.addEventListener("release", () => {
          if (sentinel === lock) {
            sentinel = null;
            setStatus((s) => (s === "held" ? "off" : s));
          }
        });
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    void request();
    const onVis = () => {
      if (document.visibilityState === "visible") void request();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVis);
      void sentinel?.release().catch(() => undefined);
      sentinel = null;
    };
  }, [active]);

  return status;
}

const STATUS_COLOR = {
  safe: "var(--color-safe)",
  caution: "var(--color-caution)",
  danger: "var(--color-danger)",
} as const;

export function KitchenMode({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const input = useBakerInput();
  const bump = useBaker((s) => s.bump);
  const startBulk = useBaker((s) => s.startBulk);
  const clearBulk = useBaker((s) => s.clearBulk);
  const bulkStartedAt = useBaker((s) => s.bulkStartedAt);
  const formula = computeFormula(input);
  const wake = useWakeLock(open);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !bulkStartedAt) return;
    const id = window.setInterval(() => setTick((n) => n + 1), 1000);
    return () => window.clearInterval(id);
  }, [open, bulkStartedAt]);

  if (!open) return null;

  const elapsedMin = bulkStartedAt ? (Date.now() - bulkStartedAt) / 60000 : 0;
  const remainingMin = formula.bulk.targetH * 60 - elapsedMin;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Kitchen mode"
      className="fixed inset-0 z-50 flex flex-col bg-bg px-4 py-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <header className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-faint">
            Kitchen mode
          </p>
          <p className="text-sm text-muted">
            {wake === "held"
              ? "Screen stays on"
              : wake === "unsupported"
                ? "Wake lock not available"
                : wake === "error"
                  ? "Screen may sleep"
                  : "Keeping you on the bench"}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-12 items-center justify-center rounded-md bg-card text-fg shadow-[0_0_0_1px_var(--color-border)] active:scale-[0.96]"
          aria-label="Exit kitchen mode"
        >
          <X className="size-5" />
        </button>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center">
        <div
          className="mb-3 flex items-center gap-2 text-sm font-medium"
          style={{ color: STATUS_COLOR[formula.danger] }}
        >
          <span
            className="size-2.5 rounded-full"
            style={{
              background: STATUS_COLOR[formula.danger],
              boxShadow: `0 0 16px ${STATUS_COLOR[formula.danger]}`,
            }}
          />
          {formula.danger === "safe"
            ? "Safe"
            : formula.danger === "caution"
              ? "Caution"
              : "Danger"}
          <span className="text-muted">· ceiling {formula.ceiling.toFixed(0)}%</span>
        </div>
        <div className="font-display text-[clamp(4.5rem,22vw,8rem)] leading-none tracking-tight tabular text-fg">
          {formula.trueHydration.toFixed(1)}
          <span className="ml-1 text-[0.35em] text-muted">%</span>
        </div>
        <p className="mt-2 text-xs font-medium uppercase tracking-widest text-faint">
          True hydration
        </p>

        <div className="mt-8 grid w-full max-w-md grid-cols-2 gap-3">
          <KStat label="Flour" value={`${formatGrams(formula.flourWeight)} g`} />
          <KStat label="Water" value={`${formatGrams(formula.waterWeight)} g`} />
          <KStat label="Starter" value={`${formatGrams(formula.starterWeight)} g`} />
          <KStat label="Salt" value={`${formatGrams(formula.saltWeight, 1)} g`} />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-md grid-cols-3 gap-3">
        <Paddle
          label="Water"
          unit="5 g"
          onDec={() => bump("targetTrueHydration", waterDelta(formula, -5))}
          onInc={() => bump("targetTrueHydration", waterDelta(formula, 5))}
        />
        <Paddle
          label="Flour"
          unit="10 g"
          onDec={() => bump("flourWeight", -10)}
          onInc={() => bump("flourWeight", 10)}
        />
        <Paddle
          label="Hydration"
          unit="0.5%"
          onDec={() => bump("targetTrueHydration", -0.5)}
          onInc={() => bump("targetTrueHydration", 0.5)}
        />
      </div>

      <div className="mx-auto mt-5 w-full max-w-md rounded-lg bg-card p-4 shadow-[0_0_0_1px_var(--color-border)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-faint">Bulk window</p>
            <p className="mt-1 text-lg font-medium tabular text-fg">
              {formatHours(formula.bulk.minH)}–{formatHours(formula.bulk.maxH)}
              <span className="ml-2 text-sm font-normal text-muted">
                target {formatHours(formula.bulk.targetH)}
              </span>
            </p>
            {bulkStartedAt ? (
              <p className="mt-1 text-sm text-accent">
                {remainingMin > 0
                  ? `${formatHours(remainingMin / 60)} to target`
                  : `Past target by ${formatHours(Math.abs(remainingMin) / 60)}`}
              </p>
            ) : null}
          </div>
          {bulkStartedAt ? (
            <button
              type="button"
              onClick={clearBulk}
              className="h-11 rounded-md px-4 text-sm text-muted hover:text-fg"
            >
              Clear
            </button>
          ) : (
            <button
              type="button"
              onClick={startBulk}
              className="h-11 rounded-md bg-accent px-4 text-sm font-medium text-inverse active:scale-[0.96]"
            >
              Start bulk
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function waterDelta(formula: { totalFlour: number; trueHydration: number }, grams: number) {
  if (formula.totalFlour <= 0) return 0;
  const next = ((formula.trueHydration / 100) * formula.totalFlour + grams) / formula.totalFlour;
  return Number((next * 100 - formula.trueHydration).toFixed(2));
}

function KStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-card px-3 py-3 shadow-[0_0_0_1px_var(--color-border)]">
      <div className="text-xs uppercase tracking-widest text-faint">{label}</div>
      <div className="mt-1 text-xl font-medium tabular text-fg">{value}</div>
    </div>
  );
}

function Paddle({
  label,
  unit,
  onDec,
  onInc,
}: {
  label: string;
  unit: string;
  onDec: () => void;
  onInc: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <HoldButton
        onFire={onInc}
        className="size-20 rounded-lg bg-card text-fg shadow-[0_0_0_1px_var(--color-border)] hover:bg-surface"
        aria-label={`Increase ${label}`}
      >
        <Plus className="size-8" strokeWidth={2} />
      </HoldButton>
      <div className="text-center">
        <div className="text-sm font-medium text-fg">{label}</div>
        <div className="text-xs text-faint">{unit}</div>
      </div>
      <HoldButton
        onFire={onDec}
        className={cn(
          "size-20 rounded-lg bg-inset text-muted shadow-[0_0_0_1px_var(--color-border)] hover:text-fg",
        )}
        aria-label={`Decrease ${label}`}
      >
        <Minus className="size-8" strokeWidth={2} />
      </HoldButton>
    </div>
  );
}
