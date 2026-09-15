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
    role: "Frontend Developer",
    location: "Surat, Gujarat",
    start: "June 2022",
    end: "Present",
    bullets: [
      "Developed and maintained production web applications and dashboards using React.js, Next.js, TypeScript, and Tailwind CSS, focusing on responsive, reusable, and scalable UI components.",
      "Improved application performance by 40% through code optimization, efficient rendering, and frontend performance best practices.",
      "Collaborated with cross-functional teams to translate requirements into responsive, user-focused interfaces and integrate frontend applications with REST APIs and backend services.",
      "Mentored junior developers and established coding standards for the frontend team.",
    ],
  },
];