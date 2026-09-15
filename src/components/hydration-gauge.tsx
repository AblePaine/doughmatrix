import { cn } from "@/lib/utils";

export function HydrationGauge({
  safe,
  max,
  size = "sm",
}: {
  safe: number;
  max: number;
  size?: "sm" | "lg";
}) {
  const lo = 50;
  const hi = 110;
  const pct = (n: number) =>
    Math.min(100, Math.max(0, ((n - lo) / (hi - lo)) * 100));

  return (
    <div className={size === "lg" ? "mt-2" : "mt-4"}>
      <div className="flex items-baseline justify-between gap-2 text-xs">
        <span className="text-safe">Safe {safe}%</span>
        <span className="text-caution">Ceiling {max}%</span>
        <span className="text-danger">Failure</span>
      </div>
      <div
        className={cn(
          "relative mt-2 overflow-hidden rounded-full bg-inset",
          size === "lg" ? "h-2.5" : "h-1.5",
        )}
      >
        <div
          className="absolute inset-y-0 left-0 bg-danger/25"
          style={{ width: "100%" }}
        />
        <div
          className="absolute inset-y-0 left-0 bg-caution/70"
          style={{ width: `${pct(max)}%` }}
        />
        <div
          className="absolute inset-y-0 left-0 bg-safe"
          style={{ width: `${pct(safe)}%` }}
        />
      </div>
      {size === "lg" ? (
        <p className="mt-2 text-xs leading-relaxed text-faint">
          Green is the working loaf. Gold is the last mix that still has a
          gluten net. Red past the ceiling is a sticky puddle.
        </p>
      ) : null}
    </div>
  );
}
