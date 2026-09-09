export interface Skill {
  name: string;
  level?: number; // Optional: 1-100 if you want to show a proficiency bar later
  icon?: string;  // Optional: For mapping to Lucide icons or SVG paths
  detail?: string;
}

export const CORE_SKILLS: Skill[] = [
  { name: "React.js", detail: "Reusable components, hooks, state, performance" },
  { name: "Next.js", detail: "App Router, routing, SSR/SSG, SEO" },
  { name: "TypeScript", detail: "Types, interfaces, safer refactors" },
  { name: "JavaScript", detail: "ES6+, async/await, clean code" },
  { name: "Tailwind CSS", detail: "Responsive UI with utility-first styling" },
  { name: "Node.js", detail: "Server-side logic, async workflows" },
];

export const SECONDARY_SKILLS: Skill[] = [
  { name: "TanStack Query", detail: "Async state management & data fetching" },
  { name: "Redux Toolkit", detail: "Predictable state management and slices" },
  { name: "REST APIs", detail: "CRUD endpoints, validation, error handling" },
  { name: "Supabase", detail: "Postgres, auth, storage, realtime" },
  { name: "MongoDB", detail: "Schema design, queries, aggregation" },
  { name: "Express.js", detail: "Routes, middleware, API architecture" },
  { name: "WebSockets", detail: "Real-time features and live updates" },
  { name: "MUI", detail: "MUI components, theming, rapid UI builds" },
  { name: "JWT", detail: "Auth, protected routes, token-based sessions" },
  { name: "Firebase", detail: "Auth, Firestore, hosting & integrations" },
  { name: "Git", detail: "Branching, PR workflow, code reviews" },
  { name: "Postman", detail: "API testing, collections, environments" },
  { name: "Vercel", detail: "Next.js deployments, previews, CI/CD" },
  { name: "Render", detail: "Backend deployment & managed services" },
];