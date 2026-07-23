"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function AnalyticsComponent({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId) return;
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("config", gaId, {
        page_path: url,
        anonymize_ip: true,
      });
    }
  }, [pathname, searchParams, gaId]);

  return null;
}

export default function GoogleAnalyticsPageview({ gaId }: { gaId: string }) {
  if (!gaId) return null;
  return (
    <Suspense fallback={null}>
      <AnalyticsComponent gaId={gaId} />
    </Suspense>
  );
}
