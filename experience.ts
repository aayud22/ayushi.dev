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
    role: "Senior Front-End Developer",
    location: "Surat, Gujarat",
    start: "April 2022",
    end: "Present",
    bullets: [
      "Led frontend development for multiple client projects, delivering responsive dashboards and web applications using React, Next.js, and Tailwind CSS.",
      "Improved application performance by 40% through code optimization and modern architecture.",
      "Collaborated with cross-functional teams to build pixel-perfect UIs and seamless backend integrations.",
      "Mentored junior developers and established coding standards for the frontend team.",
    ],
  },
];