import Image from "next/image";
import { SOCIAL_LINKS } from "@/constants";
import { getExternalLinkProps } from "@/lib/links";
import { Typewriter } from "@/components/Typewriter";
import { Container } from "@/components/layout/Container";

export function HeroSection() {
  return (
    <section className="py-14 md:py-20">
      <Container>
        <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="w-full md:flex-1 text-center lg:text-left">
            <div className="text-black flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2">
              <span className="font-normal text-2xl sm:text-4xl md:text-5xl">
                Hello!
              </span>
              <span
                className="wave font-normal text-2xl sm:text-4xl md:text-5xl"
                aria-hidden
              >
                👋
              </span>
            </div>

            <div className="text-black flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2">
              <span className="font-normal text-2xl sm:text-4xl md:text-5xl">
                I&apos;m
              </span>
              <span className="font-extrabold text-2xl sm:text-4xl md:text-5xl">
                Ayushie
              </span>
            </div>

            <div className="mt-4 text-black flex flex-wrap items-baseline justify-center lg:justify-start gap-x-3 gap-y-2 min-h-12 sm:min-h-14">
              <Typewriter
                className="font-normal text-2xl sm:text-4xl md:text-5xl"
                words={["React Developer", "MERN Developer", "Problem Solver"]}
              />
            </div>

            <div className="md:mt-4 mt-0 flex justify-center lg:justify-start">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm sm:px-4 sm:py-2 sm:text-sm">
                <span className="font-semibold">3+ Years</span>
                <span className="text-white/80">
                  Experience in Web Development
                </span>
              </span>
            </div>

            <p className="mt-4 max-w-lg mx-auto lg:mx-0 text-sm leading-7 text-slate-600 sm:text-base">
              I build delightful, performant web experiences with Next.js, React,
              and Tailwind CSS.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                className="inline-flex h-11 items-center justify-center rounded-sm bg-slate-900 hover:bg-transparent hover:text-black px-5 text-sm font-semibold text-white transition-colors duration-200 border border-black"
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
              <a
                className="inline-flex h-11 items-center justify-center rounded-sm border border-black bg-white px-5 text-sm font-semibold text-slate-900 transition-colors duration-200 hover:bg-black hover:text-white"
                href="#contact"
              >
                Contact Me
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
              {SOCIAL_LINKS?.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-200"
                    {...getExternalLinkProps(s.href)}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mx-auto aspect-auto w-full max-w-150 overflow-hidden rounded-3xl bg-slate-50 md:flex-1">
            <Image
              priority
              width={800}
              height={800}
              alt="Illustration"
              src="/images/hero_banner.jpg"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}