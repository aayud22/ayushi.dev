import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { getYearsOfExperience } from "@/constants/experience";

export function HeroSection() {
  return (
    <section className="pt-16 pb-8 md:pt-24 md:pb-12 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black">
                Hi, I&apos;m Ayushi
              </h1>
              <p className="mt-4 text-2xl md:text-3xl text-slate-600 font-light">
                Frontend Developer | React.js & Next.js
              </p>
            </div>

            <p className="text-lg text-slate-600 max-w-lg">
              I craft fast, scalable, and user-focused web experiences using React.js, Next.js, and modern frontend technologies. I turn complex problems into clean, high-performance solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <a
                href="#projects"
                className="w-full sm:w-auto text-center px-8 py-3.5 bg-black text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
              >
                View My Projects
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto text-center px-8 py-3.5 border border-black font-medium rounded-xl hover:bg-black hover:text-white transition-colors"
              >
                Let&apos;s Collaborate
              </a>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <p className="text-sm text-slate-600">
                  {getYearsOfExperience()}+ Years Experience
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span>Open to freelance & collaboration opportunities</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-3xl bg-slate-100">
              <Image
                priority
                width={800}
                height={800}
                src="/images/hero_banner.jpg"
                alt="Ayushi - Full Stack Developer"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
