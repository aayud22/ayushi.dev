import { CaseStudySection as CaseStudySectionType } from "@/content/case-studies/types";
import { AlertCircle, Cpu, LayoutGrid, Zap, Rocket } from "lucide-react";
import React from "react";

const iconMap = {
  AlertCircle,
  Cpu,
  LayoutGrid,
  Zap,
  Rocket,
};

interface CaseStudySectionProps {
  section: CaseStudySectionType;
}

export function CaseStudySection({ section }: CaseStudySectionProps) {
  const Icon = iconMap[section.icon];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className="h-6 w-6 text-slate-900" />}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 m-0">{section.heading}</h2>
      </div>
      <p className="text-slate-600 leading-relaxed text-base sm:text-lg m-0">
        {typeof section.body === "string" ? (
          section.body
        ) : (
          section.body.map((segment, index) => {
            if (segment.type === "code") {
              return (
                <code
                  key={index}
                  className="bg-slate-100 text-slate-900 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200"
                >
                  {segment.value}
                </code>
              );
            }
            return <React.Fragment key={index}>{segment.value}</React.Fragment>;
          })
        )}
      </p>
    </section>
  );
}
