import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { formatGrams, rescueOverPour } from "@/lib/sourdough/math";
import type { FormulaResult } from "@/lib/sourdough/types";
import { useBaker } from "@/lib/sourdough/store";
import { Button } from "@/components/ui/button";
import { Stepper } from "./stepper";

export function OverPourRescue({
  open,
  onOpenChange,
  formula,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formula: FormulaResult;
}) {
  const [extra, setExtra] = useState(20);
  const saltPercent = useBaker((s) => s.saltPercent);
  const target = useBaker((s) => s.targetTrueHydration);
  const set = useBaker((s) => s.set);
  const flourWeight = useBaker((s) => s.flourWeight);
  const mixMode = useBaker((s) => s.mixMode);

  const rescue = useMemo(
    () => rescueOverPour(formula, extra, saltPercent, target),
    [formula, extra, saltPercent, target],
  );

  const apply = () => {
    if (mixMode === "dough") {
      // In dough mode flourWeight is derived from doughWeightTarget, so
      // apply the rescue through the target (setting flourWeight is a dead click).
      set({ doughWeightTarget: Math.round(rescue.newDoughWeight) });
    } else {
      set({
        flourWeight: Number((flourWeight + rescue.extraFlour).toFixed(1)),
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-overlay" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-border),0_24px_80px_rgb(0_0_0_/_0.5)] focus:outline-none">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Dialog.Title className="font-display text-2xl tracking-tight text-fg">
                Over-pour rescue
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">
                Extra water went in. Add flour and salt to restore {target.toFixed(1)}% true hydration.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-sm text-muted hover:bg-card hover:text-fg"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-5">
            <Stepper
              label="Extra water in the bowl"
              value={String(extra)}
              unit="g"
              onDec={() => setExtra((n) => Math.max(1, n - 5))}
              onInc={() => setExtra((n) => Math.min(500, n + 5))}
            />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <RescueStat
              label="Add flour"
              value={`${formatGrams(rescue.extraFlour, 1)} g`}
              accent
            />
            <RescueStat
              label="Add salt"
              value={`${formatGrams(rescue.extraSalt, 1)} g`}
            />
            <RescueStat
              label="New dough"
              value={`${formatGrams(rescue.newDoughWeight)} g`}
            />
            <RescueStat
              label="Restored H"
              value={`${rescue.newTrueHydration.toFixed(1)}%`}
            />
          </div>

          <p className="mt-4 text-xs leading-relaxed text-faint">
            More flour pulls the extra water back into balance — same hydration,
            same seasoning. Salt is added only for the new flour (
            {saltPercent.toFixed(1)}%), since the rest of the dough is already
            seasoned. Your starter stays as-is.
          </p>

          <div className="mt-5 flex gap-2">
            <Button variant="primary" className="flex-1" onClick={apply}>
              Apply to formula
            </Button>
            <Dialog.Close asChild>
              <Button className="flex-1">Close</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function RescueStat({
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
            ? "mt-1 text-xl font-medium tabular text-accent"
            : "mt-1 text-xl font-medium tabular text-fg"
        }
      >
        {value}
      </div>
    </div>
  );
}
