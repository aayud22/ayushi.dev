export type ExperienceItem = {
  company: string;
  role: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "CodeAlchemy Pvt Ltd",
    role: "Front-End Developer",
    location: "Surat",
    start: "April 2022",
    end: "Present",
    bullets: [
      "Designed and developed responsive web apps including dashboards, document portals, and social platforms.",
      "Collaborated with cross-functional teams to build pixel-perfect UIs and ensure seamless backend integration.",
      "Ensured high code quality through testing, reviews, and performance tuning.",
    ],
  },
];
