import { Link } from "@tanstack/react-router";
import { PUBLISHED_GUIDES } from "@/lib/guides";
import { cn } from "@/lib/utils";

export function GuidesFooter({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Guides"
      className={cn(
        "flex flex-wrap gap-x-5 gap-y-2 text-sm text-faint",
        className,
      )}
    >
      <Link to="/engines/sourdough" className="text-muted hover:text-accent">
        Sourdough Calculator
      </Link>
      <Link to="/guides" className="text-muted hover:text-accent">
        All guides
      </Link>
      {PUBLISHED_GUIDES.map((g) => (
        <Link key={g.to} to={g.to} className="text-muted hover:text-accent">
          {g.short}
        </Link>
      ))}
      <Link to="/flours" className="text-muted hover:text-accent">
        Flour Index
      </Link>
    </nav>
  );
}
