import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import CursorRings from "@/components/ui/CursorRings";
import { PROJECTS } from "@/constants";
import { AlertCircle, Cpu, LayoutGrid, Zap, Rocket, Timer, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "ScrapeSmart AI Case Study | Ayushi",
  description:
    "Case study for ScrapeSmart AI, an AI-powered web scraper that reads any website URL and answers user questions with intelligent, concise responses.",
  openGraph: {
    title: "ScrapeSmart AI Case Study | Ayushi",
    description:
      "Case study for ScrapeSmart AI, an AI-powered web scraper that reads any website URL and answers user questions with intelligent, concise responses.",
    url: "https://ayushi-dev.vercel.app/projects/scrapesmart-ai",
  },
  twitter: {
    title: "ScrapeSmart AI Case Study | Ayushi",
    description:
      "Case study for ScrapeSmart AI, an AI-powered web scraper that reads any website URL and answers user questions with intelligent, concise responses.",
  },
};

export default function ScrapeSmartAICaseStudy() {
  const project = PROJECTS.find((p) => p.id === 1);

  return (
    <PageLayout>
      <main className="w-full flex-1 pt-32 pb-20 bg-white">
        <CursorRings />
        <Container>
          <div className="mb-10">
            <Link
              href="/#projects"
              className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-black transition-colors"
            >
              &larr; Back to Projects
            </Link>
          </div>

          <div className="max-w-3xl mx-auto md:mx-0">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-8">
              ScrapeSmart AI
            </h1>

            <div className="flex flex-wrap gap-4 mb-12">
              {project?.liveUrl && (
                <a
                  target="_blank"
                  href={project.liveUrl}
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-sm bg-slate-900 px-6 text-sm font-semibold text-white transition-colors duration-200 border border-black hover:bg-transparent hover:text-black"
                >
                  Live Demo
                </a>
              )}
              {project?.githubUrl && (
                <a
                  target="_blank"
                  href={project.githubUrl}
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-sm border border-black bg-white px-6 text-sm font-semibold text-slate-900 transition-colors duration-200 hover:bg-black hover:text-white"
                >
                  GitHub
                </a>
              )}
            </div>

            {/* Metrics Highlight */}
            <div className="mb-12 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm flex-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm shrink-0">
                  <Timer className="h-6 w-6 text-slate-900" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">End-to-End Latency</div>
                  <div className="text-2xl font-bold text-slate-900 tracking-tight">1.8–3.2s</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm flex-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm shrink-0">
                  <Globe className="h-6 w-6 text-slate-900" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Tested Across</div>
                  <div className="text-2xl font-bold text-slate-900 tracking-tight">150+ Sites</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <section className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="h-6 w-6 text-slate-900" />
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 m-0">The problem</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg m-0">
                  Traditional web scraping breaks the moment a site&apos;s layout changes — fragile CSS selectors, manual DOM inspection, constant maintenance. ScrapeSmart AI lets anyone paste a URL, ask a question in plain language, and get structured, accurate answers back — no scraping code required.
                </p>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="h-6 w-6 text-slate-900" />
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 m-0">How it works</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg m-0">
                  A headless-browser scraping layer handles JS-heavy sites and bot protection, then sanitizes the raw HTML (stripping scripts, styles, noise) before mapping it to strict TypeScript interfaces. That clean structure feeds into Google&apos;s Gemini 2.5 Flash model, which returns predictable, parseable JSON — not free-form text.
                </p>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <LayoutGrid className="h-6 w-6 text-slate-900" />
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 m-0">The hardest problem</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg m-0">
                  A dynamic grid layout kept breaking — one card expanding to show AI-generated content would stretch every card in its row, creating dead space across the dashboard. Fixed by decoupling height dependencies per card (<code className="bg-slate-100 text-slate-900 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200">items-start</code> + <code className="bg-slate-100 text-slate-900 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200">h-fit</code> in Tailwind) so cards expand independently without disrupting the grid.
                </p>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-slate-900" />
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 m-0">Results</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg m-0">
                  ~1.8–3.2s average end-to-end latency (including JS rendering, sanitization, and inference). Tested against 150+ sites — static blogs to dynamic SPAs.
                </p>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <Rocket className="h-6 w-6 text-slate-900" />
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 m-0">What&apos;s next</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg m-0">
                  Moving to an async job queue (Redis + WebSockets) to stream results in real time and avoid timeouts on large sites, and splitting the scraping layer into its own microservice so it can scale independently from the Next.js frontend.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
