import type { ReactNode } from "react";
import { GuidesFooter } from "@/components/guides-footer";
import { SiteHeader } from "@/components/site-header";

export function GuideShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      {children}
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <GuidesFooter />
      </div>
    </div>
  );
}
