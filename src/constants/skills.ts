export interface Skill {
  name: string;
  level?: number; // Optional: 1-100 if you want to show a proficiency bar later
  icon?: string;  // Optional: For mapping to Lucide icons or SVG paths
  detail?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", detail: "Reusable components, hooks, state, performance" },
      { name: "Next.js", detail: "App Router, routing, SSR/SSG, SEO" },
      { name: "Redux Toolkit", detail: "Predictable state management and slices" },
      { name: "TailwindCSS", detail: "Responsive UI with utility-first styling" },
      { name: "Material UI", detail: "MUI components, theming, rapid UI builds" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", detail: "Server-side logic, async workflows" },
      { name: "Express.js", detail: "Routes, middleware, API architecture" },
      { name: "REST APIs", detail: "CRUD endpoints, validation, error handling" },
      { name: "WebSockets", detail: "Real-time features and live updates" },
      { name: "JWT", detail: "Auth, protected routes, token-based sessions" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", detail: "Schema design, queries, aggregation" },
      { name: "Firebase", detail: "Auth, Firestore, hosting & integrations" },
      { name: "Supabase", detail: "Postgres, auth, storage, realtime" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", detail: "Branching, PR workflow, code reviews" },
      { name: "Postman", detail: "API testing, collections, environments" },
      { name: "Vercel", detail: "Next.js deployments, previews, CI/CD" },
      { name: "Render", detail: "Backend deployment & managed services" },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", detail: "ES6+, async/await, clean code" },
      { name: "TypeScript", detail: "Types, interfaces, safer refactors" },
    ],
  },
];