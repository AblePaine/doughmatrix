import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GuideShell } from "@/components/guide-shell";
import { PUBLISHED_GUIDES } from "@/lib/guides";
import { OG_IMAGES, socialHead } from "@/lib/og/meta";

export const Route = createFileRoute("/guides/")({
  component: GuidesHub,
  head: () =>
    socialHead({
      title: "Guides — DoughMatrix",
      description:
        "DoughMatrix guides: flour hydration ceilings, bulk by temperature, levain peak timing, autolyse vs. fermentolyse, and sourdough crumb forensics.",
      path: "/guides",
      image: OG_IMAGES.home,
      cardTitle: "Field Guides",
      category: "FIELD GUIDE",
      detail: "Hydration, fermentation, levain, mix, and crumb",
    }),
});

function GuidesHub() {
  return (
    <GuideShell>
      <main className="mx-auto max-w-3xl px-4 pb-10">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          Library
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          Guides
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Bench notes behind the engine. Hydration, the jar, the rest, the bulk
          clock, then the cut.
        </p>
        <ul className="mt-10 grid gap-4">
          {PUBLISHED_GUIDES.map((g) => (
            <li key={g.to}>
              <Link
                to={g.to}
                className="block rounded-lg bg-card p-5 shadow-[0_0_0_1px_var(--color-border)] hover:shadow-[0_0_0_1px_var(--color-border-strong)]"
              >
                <p className="text-xs font-medium tracking-wide text-accent uppercase">
                  {g.kicker}
                </p>
                <p className="mt-2 font-display text-2xl tracking-tight text-fg">
                  {g.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {g.blurb}
                </p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm text-accent">
                  Read
                  <ArrowRight className="size-4" />
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </GuideShell>
  );
}
