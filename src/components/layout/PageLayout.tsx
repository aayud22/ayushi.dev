import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
