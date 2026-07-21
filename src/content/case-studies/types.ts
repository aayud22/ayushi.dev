export type CaseStudySection = {
  icon: "AlertCircle" | "Cpu" | "LayoutGrid" | "Zap" | "Rocket";
  heading: string;
  body: string | { type: "text" | "code"; value: string }[];
};

export type CaseStudyMetric = {
  icon: "Timer" | "Globe";
  label: string;
  value: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  liveUrl?: string;
  githubUrl?: string;
  ogImage: string;
  metrics: CaseStudyMetric[];
  sections: CaseStudySection[];
};
