import { CaseStudyMetric } from "@/content/case-studies/types";
import { Timer, Globe } from "lucide-react";

const iconMap = {
  Timer,
  Globe,
};

interface CaseStudyMetricsProps {
  metrics: CaseStudyMetric[];
}

export function CaseStudyMetrics({ metrics }: CaseStudyMetricsProps) {
  if (!metrics || metrics.length === 0) return null;
  
  return (
    <div className="mb-12 flex flex-col sm:flex-row gap-4">
      {metrics.map((metric, index) => {
        const Icon = iconMap[metric.icon];
        
        return (
          <div key={index} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm flex-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm shrink-0">
              {Icon && <Icon className="h-6 w-6 text-slate-900" />}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-500 mb-1">{metric.label}</div>
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{metric.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
