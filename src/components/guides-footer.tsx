import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export const GUIDE_LINKS = [
  {
    to: "/guides/flour-hydration-ceiling" as const,
    label: "Guide: The flour hydration ceiling",
  },
  {
    to: "/guides/temperature-fermentation-matrix" as const,
    label: "Guide: Ambient temp vs. starter %",
  },
  {
    to: "/guides/sourdough-crumb-troubleshooting" as const,
    label: "Guide: Sourdough crumb forensics",
  },
];

export function GuidesFooter({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Guides"
      className={cn(
        "flex flex-wrap gap-x-5 gap-y-2 text-sm text-faint",
        className,
      )}
    >
      {GUIDE_LINKS.map((g) => (
        <Link key={g.to} to={g.to} className="text-muted hover:text-accent">
          {g.label}
        </Link>
      ))}
    </nav>
  );
}
