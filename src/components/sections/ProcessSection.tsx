import { PROCESS_STEPS } from "@/content/process";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export function ProcessSection() {
  return (
    <section id="process" className="bg-slate-950 py-16 md:py-24">
      <Container>
        <div className="mx-auto mb-12 text-center max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            How I <span className="text-slate-400">Work</span>
          </h2>
          <p className="mt-3 text-white/70">
            A transparent, milestone-driven approach to every project.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl mt-16">
          {/* Horizontal connector line for desktop */}
          <div className="absolute top-6 left-[10%] right-[10%] h-px bg-white/15 hidden lg:block" aria-hidden="true" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {PROCESS_STEPS.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-slate-950 text-lg font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-6 text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://calendly.com/aayushid81/30min"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 text-base font-bold text-slate-900 transition-colors hover:bg-slate-200"
          >
            Book a Discovery Call
          </a>
        </div>
      </Container>
    </section>
  );
}
