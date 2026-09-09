export interface Project {
  id: number;
  title: string;
  description: string;
  image: string; // This will be your Vercel Blob URL
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  hasCaseStudy?: boolean;
  caseStudyUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "ScrapeSmart AI",
    description: "AI-powered web scraper that reads any website URL and answers user questions with intelligent, concise responses. Built with Next.js, TypeScript, and advanced scraping logic.",
    image: "/images/scrape_smart_AI.jpg",
    tags: ["Next.js", "TypeScript", "AI", "Web Scraping"],
    liveUrl: "https://scrape-smart-ai.vercel.app/",
    githubUrl: "https://github.com/aayud22/scrape-smart-ai-chatbot-frontend-v2.0",
    hasCaseStudy: true,
    caseStudyUrl: "/projects/scrapesmart-ai",
  },
  {
    id: 2,
    title: "Lumina Metrics",
    description: "Modern SaaS analytics dashboard with interactive data visualizations, KPI tracking, activity insights, and responsive management interfaces.",
    image: "/images/lumina_metrics.jpg",
    tags: ["Next.js", "TypeScript", "React.js", "Recharts"],
    liveUrl: "https://lumina-metrics-ad.vercel.app/",
    githubUrl: "https://github.com/aayud22/lumina-metrics-AD",
    hasCaseStudy: false,
    caseStudyUrl: "",
  },
  {
    id: 3,
    title: "Growchief",
    description: "Modern agricultural platform interface with smooth animations, intuitive UX, and clean design system. Focused on delivering exceptional user experience for farmers and stakeholders.",
    image: "/images/grow_chief.jpg",
    tags: ["Next.js", "Framer Motion", "UI/UX Design"],
    liveUrl: "https://prod-grow-chief-nine.vercel.app/",
    githubUrl: "",
    hasCaseStudy: false,
    caseStudyUrl: "",
  },
  {
    id: 4,
    title: "Personal Portfolio",
    description: "High-performance developer portfolio built with Next.js 15, Tailwind CSS, and Framer Motion. Features smooth animations, excellent lighthouse scores, and a strong personal brand presence.",
    image: "/images/portfolio.jpg",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    liveUrl: "https://ayushi-dev.vercel.app/",
    githubUrl: "https://github.com/aayud22/ayushi.dev",
    hasCaseStudy: false,
    caseStudyUrl: "",
  }
];