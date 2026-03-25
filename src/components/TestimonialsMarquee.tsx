"use client";

import { useEffect, useMemo, useState } from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
};

type TestimonialsMarqueeProps = {
  items: TestimonialItem[];
  durationMs?: number;
  className?: string;
};

export function TestimonialsMarquee({
  items,
  durationMs = 22000,
  className,
}: TestimonialsMarqueeProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(media.matches);
    onChange();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    }

    media.addListener(onChange);
    return () => media.removeListener(onChange);
  }, []);

  const loopItems = useMemo(() => {
    const base = items.length ? items : [];
    return [...base, ...base];
  }, [items]);

  return (
    <div
      className={[
        "marquee relative overflow-hidden",
        reduceMotion ? "overflow-x-auto" : "",
        className ?? "",
      ].join(" ")}
      style={
        {
          "--marquee-duration": `${durationMs}ms`,
        } as React.CSSProperties
      }
    >
      <div
        className={[
          "marquee__track flex w-max items-stretch gap-6 py-8",
          reduceMotion ? "animate-none" : "",
        ].join(" ")}
      >
        {loopItems.map((t, idx) => {
          const baseIndex = items.length ? idx % items.length : 0;
          const isActive = baseIndex === 1;
          const initials = t.name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((p) => p[0]!.toUpperCase())
            .join("");

          return (
            <div
              key={`${t.name}-${idx}`}
              className={cn(
                "relative w-70 shrink-0 rounded-2xl border border-slate-200 bg-white px-6 pb-10 pt-12 shadow-sm sm:w-[320px] sm:px-8",
                isActive && "border-slate-950 bg-slate-950",
              )}
            >
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div
                    className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-900",
                      isActive && "border-white/15 bg-slate-900 text-white",
                    )}
                  >
                    {initials}
                  </div>
                  <div
                    className={cn(
                      "absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white",
                      isActive && "border-white/15 bg-white text-slate-950",
                    )}
                  >
                    <Quote
                      className={cn(
                        "h-4 w-4",
                        isActive ? "text-slate-950" : "text-slate-900",
                      )}
                    />
                  </div>
                </div>
              </div>

              <p
                className={cn(
                  "text-center text-sm leading-6",
                  isActive ? "text-white/80" : "text-slate-600",
                )}
              >
                {t.quote}
              </p>

              <div
                className={cn(
                  "mx-auto mt-6 h-px w-16",
                  isActive ? "bg-white/25" : "bg-slate-200",
                )}
              />

              <div className="mt-6 text-center">
                <p
                  className={cn(
                    "text-sm font-semibold",
                    isActive ? "text-white" : "text-slate-900",
                  )}
                >
                  {t.name}
                </p>
                <p
                  className={cn(
                    "mt-1 text-xs font-medium",
                    isActive ? "text-white/70" : "text-slate-500",
                  )}
                >
                  {t.role}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
