import { useCallback, useRef, type ComponentProps, type PointerEvent } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  hint?: string;
  value: string;
  unit?: string;
  onDec: () => void;
  onInc: () => void;
  className?: string;
  size?: "sm" | "md";
};

export function Stepper({
  label,
  hint,
  value,
  unit,
  onDec,
  onInc,
  className,
  size = "md",
}: Props) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-fg">{label}</span>
        {hint ? <span className="text-xs text-faint">{hint}</span> : null}
      </div>
      <div
        className={cn(
          "flex items-center gap-1 rounded-md bg-inset p-1 shadow-[0_0_0_1px_var(--color-border)]",
          size === "sm" && "p-0.5",
        )}
      >
        <HoldButton onFire={onDec} aria-label={`Decrease ${label}`}>
          <Minus className="size-4" strokeWidth={2.25} />
        </HoldButton>
        <div className="flex min-w-0 flex-1 items-baseline justify-center gap-1 tabular">
          <span
            className={cn(
              "font-medium tracking-tight text-fg",
              size === "md" ? "text-xl" : "text-base",
            )}
          >
            {value}
          </span>
          {unit ? <span className="text-xs text-muted">{unit}</span> : null}
        </div>
        <HoldButton onFire={onInc} aria-label={`Increase ${label}`}>
          <Plus className="size-4" strokeWidth={2.25} />
        </HoldButton>
      </div>
    </div>
  );
}

export function HoldButton({
  onFire,
  className,
  children,
  ...rest
}: ComponentProps<"button"> & { onFire: () => void }) {
  const fnRef = useRef(onFire);
  fnRef.current = onFire;

  const onPointerDown = useCallback((e: PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    e.preventDefault();
    fnRef.current();
    try {
      navigator.vibrate?.(8);
    } catch {
      /* ignore */
    }
    let interval = 0;
    const delay = window.setTimeout(() => {
      interval = window.setInterval(() => fnRef.current(), 68);
    }, 380);
    const stop = () => {
      window.clearTimeout(delay);
      window.clearInterval(interval);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
  }, []);

  return (
    <button
      type="button"
      onPointerDown={onPointerDown}
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-sm text-muted",
        "transition-[background-color,color,transform] duration-150 ease-out",
        "hover:bg-card hover:text-fg active:scale-[0.96]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
