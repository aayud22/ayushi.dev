import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import CursorRings from "@/components/ui/CursorRings";
import { PROJECTS } from "@/constants";

export const metadata: Metadata = {
  title: "ScrapeSmart AI Case Study | Ayushi",
  description:
    "Case study for ScrapeSmart AI, an AI-powered web scraper that reads any website URL and answers user questions with intelligent, concise responses.",
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

            <article className="prose prose-slate max-w-none">
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">The problem</h2>
                <p className="text-slate-600 leading-relaxed">
                  Traditional web scraping breaks the moment a site&apos;s layout changes — fragile CSS selectors, manual DOM inspection, constant maintenance. ScrapeSmart AI lets anyone paste a URL, ask a question in plain language, and get structured, accurate answers back — no scraping code required.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">How it works</h2>
                <p className="text-slate-600 leading-relaxed">
                  A headless-browser scraping layer handles JS-heavy sites and bot protection, then sanitizes the raw HTML (stripping scripts, styles, noise) before mapping it to strict TypeScript interfaces. That clean structure feeds into Google&apos;s Gemini 2.5 Flash model, which returns predictable, parseable JSON — not free-form text.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">The hardest problem</h2>
                <p className="text-slate-600 leading-relaxed">
                  A dynamic grid layout kept breaking — one card expanding to show AI-generated content would stretch every card in its row, creating dead space across the dashboard. Fixed by decoupling height dependencies per card (<code>items-start</code> + <code>h-fit</code> in Tailwind) so cards expand independently without disrupting the grid.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Results</h2>
                <p className="text-slate-600 leading-relaxed">
                  ~1.8–3.2s average end-to-end latency (including JS rendering, sanitization, and inference). Tested against 150+ sites — static blogs to dynamic SPAs.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">What&apos;s next</h2>
                <p className="text-slate-600 leading-relaxed">
                  Moving to an async job queue (Redis + WebSockets) to stream results in real time and avoid timeouts on large sites, and splitting the scraping layer into its own microservice so it can scale independently from the Next.js frontend.
                </p>
              </section>
            </article>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
