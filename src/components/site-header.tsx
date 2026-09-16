import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { LIVE_ENGINE, UPCOMING_ENGINES } from "@/lib/engines";
import { cn } from "@/lib/utils";

export function SiteHeader({
  home = false,
  actions,
}: {
  home?: boolean;
  actions?: ReactNode;
}) {
  const Title = home ? "h1" : "p";

  return (
    <header className="mx-auto flex max-w-6xl flex-col gap-3 px-4 pt-6 pb-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-3 text-fg">
          <BrandMark />
          <div className="min-w-0">
            <Title className="font-display text-2xl leading-none tracking-tight">
              DoughMatrix
            </Title>
            <p className="mt-1 text-xs leading-snug text-faint">
              Smarter Baking Tools
            </p>
          </div>
        </Link>
        {actions ? (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        ) : null}
      </div>
      <nav
        aria-label="Primary"
        className="flex flex-wrap items-center gap-1 text-sm"
      >
        <EnginesMenu />
        <NavLink to="/flours">Flour Index</NavLink>
        <NavLink to="/guides">Guides</NavLink>
      </nav>
    </header>
  );
}

function NavLink({
  to,
  children,
}: {
  to: "/flours" | "/guides" | "/";
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      activeOptions={to === "/" ? { exact: true } : undefined}
      className="inline-flex h-9 items-center rounded-sm px-3 text-muted hover:bg-card hover:text-fg"
      activeProps={{ className: "text-accent hover:text-accent" }}
    >
      {children}
    </Link>
  );
}

function EnginesMenu() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const sourdoughActive = pathname.startsWith("/engines/sourdough");

  return (
    <details className="relative">
      <summary
        className={cn(
          "inline-flex h-9 cursor-pointer list-none items-center gap-1 rounded-sm px-3 text-muted hover:bg-card hover:text-fg [&::-webkit-details-marker]:hidden",
          sourdoughActive && "text-accent hover:text-accent",
        )}
      >
        Engines
        <ChevronDown className="size-3.5" />
      </summary>
      <div className="absolute top-full left-0 z-30 mt-1 min-w-56 rounded-md bg-card py-1 shadow-[0_0_0_1px_var(--color-border)]">
        <Link
          to={LIVE_ENGINE.to}
          className={cn(
            "flex items-center justify-between gap-3 px-3 py-2 text-sm hover:bg-inset",
            sourdoughActive ? "text-accent" : "text-fg",
          )}
        >
          {LIVE_ENGINE.short}
          <span className="text-xs text-faint">{LIVE_ENGINE.badge}</span>
        </Link>
        {UPCOMING_ENGINES.map((engine) => (
          <p
            key={engine.id}
            className="flex items-center justify-between gap-3 px-3 py-2 text-sm text-faint"
          >
            {engine.short}
            <span className="text-xs">{engine.badge}</span>
          </p>
        ))}
      </div>
    </details>
  );
}
