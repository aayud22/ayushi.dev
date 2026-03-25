export interface Project {
  id: number;
  title: string;
  description: string;
  image: string; // This will be your Vercel Blob URL
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Next.js Developer Portfolio",
    description: "A high-performance personal portfolio showcasing my frontend capabilities. Built completely with Next.js and Tailwind CSS, featuring custom Framer Motion animations and a fully responsive grid layout.",
    image: "/images/portfolio.jpg",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    liveUrl: "https://ayushi-dev.vercel.app/",
    githubUrl: "https://github.com/aayud22/ayushi.dev",
  },
  {
    id: 2,
    title: "Sky Cast Weather App",
    description: "A sleek weather app that provides a 5-day forecast using OpenWeatherMap, built with Next.js and TypeScript.",
    image: "/images//sky_cast.jpg",
    tags: ["Next.js", "TypeScript", "Vercel", "OpenWeather API"],
    liveUrl: "https://sky-cast-omega-gilt.vercel.app/",
    githubUrl: "https://github.com/aayud22/sky-cast",
  },
  {
    id: 3,
    title: "Game Zone",
    description: "A collection of classic games including Tic Tac Toe, Memory Match, and more, built with React and TypeScript.",
    image: "/images/game_zone.jpg",
    tags: ["React", "TypeScript", "Vercel", "framer-motion", "tailwindcss"],
    liveUrl: "https://gamezonevibes.vercel.app/",
    githubUrl: "",
  },
  {
    id: 4,
    title: "Growchief",
    description: "A sleek, responsive frontend interface designed for an agricultural platform, emphasizing modern UI principles and smooth animations.",
    image: "/images/grow_chief.jpg",
    tags: ["Next.js", "framer-motion", "UI/UX"],
    liveUrl: "https://prod-grow-chief-nine.vercel.app/",
    githubUrl: "",
  }
];
