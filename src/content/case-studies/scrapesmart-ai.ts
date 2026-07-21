import { CaseStudy } from "./types";

export const scrapesmartAi: CaseStudy = {
  slug: "scrapesmart-ai",
  title: "ScrapeSmart AI",
  metaTitle: "ScrapeSmart AI Case Study | Ayushi",
  metaDescription:
    "Case study for ScrapeSmart AI, an AI-powered web scraper that reads any website URL and answers user questions with intelligent, concise responses.",
  liveUrl: "https://scrape-smart-ai.vercel.app/",
  githubUrl: "https://github.com/aayud22/scrape-smart-ai-chatbot-frontend-v2.0",
  ogImage: "https://ayushi-dev.vercel.app/images/hero_banner.jpg",
  metrics: [
    {
      icon: "Timer",
      label: "End-to-End Latency",
      value: "1.8–3.2s",
    },
    {
      icon: "Globe",
      label: "Tested Across",
      value: "150+ Sites",
    },
  ],
  sections: [
    {
      icon: "AlertCircle",
      heading: "The problem",
      body: [
        { type: "text", value: "Traditional web scraping breaks the moment a site's layout changes — fragile CSS selectors, manual DOM inspection, constant maintenance. ScrapeSmart AI lets anyone paste a URL, ask a question in plain language, and get structured, accurate answers back — no scraping code required." }
      ],
    },
    {
      icon: "Cpu",
      heading: "How it works",
      body: [
        { type: "text", value: "A headless-browser scraping layer handles JS-heavy sites and bot protection, then sanitizes the raw HTML (stripping scripts, styles, noise) before mapping it to strict TypeScript interfaces. That clean structure feeds into Google's Gemini 2.5 Flash model, which returns predictable, parseable JSON — not free-form text." }
      ],
    },
    {
      icon: "LayoutGrid",
      heading: "The hardest problem",
      body: [
        { type: "text", value: "A dynamic grid layout kept breaking — one card expanding to show AI-generated content would stretch every card in its row, creating dead space across the dashboard. Fixed by decoupling height dependencies per card (" },
        { type: "code", value: "items-start" },
        { type: "text", value: " + " },
        { type: "code", value: "h-fit" },
        { type: "text", value: " in Tailwind) so cards expand independently without disrupting the grid." }
      ],
    },
    {
      icon: "Zap",
      heading: "Results",
      body: [
        { type: "text", value: "~1.8–3.2s average end-to-end latency (including JS rendering, sanitization, and inference). Tested against 150+ sites — static blogs to dynamic SPAs." }
      ],
    },
    {
      icon: "Rocket",
      heading: "What's next",
      body: [
        { type: "text", value: "Moving to an async job queue (Redis + WebSockets) to stream results in real time and avoid timeouts on large sites, and splitting the scraping layer into its own microservice so it can scale independently from the Next.js frontend." }
      ],
    },
  ],
};
