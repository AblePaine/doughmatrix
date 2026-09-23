import type { DangerLevel, FormulaResult } from "@/lib/sourdough/types";
import { cn } from "@/lib/utils";

const START = 180;
const SWEEP = 180;
const MIN_H = 50;
const MAX_H = 120;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function hydrationToAngle(h: number) {
  const t = Math.min(1, Math.max(0, (h - MIN_H) / (MAX_H - MIN_H)));
  return START + t * SWEEP;
}

function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p0 = polar(cx, cy, r, a0);
  const p1 = polar(cx, cy, r, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} 1 ${p1.x} ${p1.y}`;
}

const STATUS: Record<
  DangerLevel,
  { label: string; color: string; glow: string; copy: string }
> = {
  safe: {
    label: "Safe",
    color: "var(--color-safe)",
    glow: "var(--shadow-glow-safe)",
    copy: "Comfortably under your flour's ceiling. The dough should hold together and build strength.",
  },
  caution: {
    label: "Caution",
    color: "var(--color-caution)",
    glow: "var(--shadow-glow-caution)",
    copy: "Close to the ceiling — within 4 points. Expect a slack, sticky dough that needs confident handling.",
  },
  danger: {
    label: "Danger",
    color: "var(--color-danger)",
    glow: "var(--shadow-glow-danger)",
    copy: "At or past the ceiling. Add flour to bring it back, or bake it as a pan loaf and call it a day.",
  },
};

export function HydrationDial({ formula }: { formula: FormulaResult }) {
  const { trueHydration, bakerHydration, ceiling, sweetSpot, danger, margin } =
    formula;
  const status = STATUS[danger];
  const cx = 160;
  const cy = 150;
  const r = 108;
  const hAngle = hydrationToAngle(trueHydration);
  const cAngle = hydrationToAngle(ceiling);
  const s0 = hydrationToAngle(Math.max(MIN_H, sweetSpot - 3));
  const s1 = hydrationToAngle(Math.min(MAX_H, sweetSpot + 3));
  const needle = polar(cx, cy, r - 6, hAngle);
  const hub = polar(cx, cy, 0, 0);

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 20 320 175"
        className="w-full max-w-md"
        role="img"
        aria-label={`True hydration ${trueHydration.toFixed(1)} percent. ${status.label}.`}
      >
        <path
          d={arc(cx, cy, r, START, START + SWEEP)}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d={arc(cx, cy, r, s0, s1)}
          fill="none"
          stroke="var(--color-safe)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d={arc(cx, cy, r, START, hAngle)}
          fill="none"
          stroke={status.color}
          strokeWidth="14"
          strokeLinecap="round"
        />
        <line
          x1={polar(cx, cy, r - 22, cAngle).x}
          y1={polar(cx, cy, r - 22, cAngle).y}
          x2={polar(cx, cy, r + 16, cAngle).x}
          y2={polar(cx, cy, r + 16, cAngle).y}
          stroke="var(--color-danger)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1={hub.x}
          y1={hub.y}
          x2={needle.x}
          y2={needle.y}
          stroke="var(--color-bg)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line
          x1={hub.x}
          y1={hub.y}
          x2={needle.x}
          y2={needle.y}
          stroke="var(--color-fg)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx={needle.x} cy={needle.y} r="4.5" fill="var(--color-fg)" />
        <circle cx={cx} cy={cy} r="7" fill="var(--color-fg)" />
        <circle cx={cx} cy={cy} r="3.2" fill="var(--color-bg)" />
        <text
          x={polar(cx, cy, r + 22, START).x}
          y={polar(cx, cy, r + 22, START).y + 6}
          fill="var(--color-faint)"
          fontSize="11"
          textAnchor="middle"
        >
          50
        </text>
        <text
          x={polar(cx, cy, r + 22, START + SWEEP).x}
          y={polar(cx, cy, r + 22, START + SWEEP).y + 6}
          fill="var(--color-faint)"
          fontSize="11"
          textAnchor="middle"
        >
          120
        </text>
        <text
          x={polar(cx, cy, r + 26, cAngle).x}
          y={polar(cx, cy, r + 26, cAngle).y}
          fill="var(--color-danger)"
          fontSize="10"
          textAnchor={cAngle > 270 ? "start" : "end"}
        >
          ceiling {ceiling.toFixed(0)}
        </text>
      </svg>

      <div className="-mt-4 flex flex-col items-center">
        <div className="font-display text-6xl leading-none tracking-tight text-fg tabular sm:text-7xl">
          {trueHydration.toFixed(1)}
          <span className="ml-1 text-3xl text-muted">%</span>
        </div>
        <p className="mt-2 text-xs font-medium uppercase tracking-widest text-faint">
          True total hydration
        </p>
        <div className="mt-4 flex items-center gap-2.5">
          <span
            className="size-2.5 rounded-full"
            style={{ background: status.color, boxShadow: status.glow }}
            aria-hidden
          />
          <span
            className="text-sm font-medium"
            style={{ color: status.color }}
          >
            {status.label}
          </span>
          <span className="text-muted">·</span>
          <span className="text-sm text-muted tabular">
            {margin >= 0 ? `${margin.toFixed(1)} pt under ceiling` : `${Math.abs(margin).toFixed(1)} pt over`}
          </span>
        </div>
        <p className="mt-2 max-w-sm text-center text-sm text-muted">{status.copy}</p>
        <dl className="mt-5 grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
          <Stat label="Baker’s H" value={`${bakerHydration.toFixed(1)}%`} />
          <Stat label="Sweet spot" value={`${sweetSpot.toFixed(0)}%`} />
          <Stat
            label="Load"
            value={`${Math.round(formula.load * 100)}%`}
            className="col-span-2 sm:col-span-1"
          />
        </dl>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md bg-inset px-3 py-2.5 shadow-[0_0_0_1px_var(--color-border)]",
        className,
      )}
    >
      <div className="text-xs uppercase tracking-widest text-faint">{label}</div>
      <div className="mt-0.5 text-lg font-medium tabular text-fg">{value}</div>
    </div>
  );
}
