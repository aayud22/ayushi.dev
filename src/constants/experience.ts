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
export const CAREER_START_DATE = new Date("2022-06-06");

export function getYearsOfExperience() {
  const currentDate = new Date();
  let years = currentDate.getFullYear() - CAREER_START_DATE.getFullYear();

  if (
    currentDate.getMonth() < CAREER_START_DATE.getMonth() ||
    (currentDate.getMonth() === CAREER_START_DATE.getMonth() &&
      currentDate.getDate() < CAREER_START_DATE.getDate())
  ) {
    years--;
  }

  return years;
}
