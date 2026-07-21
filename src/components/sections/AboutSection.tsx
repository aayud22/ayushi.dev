import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { getYearsOfExperience } from "@/constants/experience";

export function AboutSection() {
  const yearsOfExperience = getYearsOfExperience();
  return (
    <section id="about" className="pt-8 pb-16 md:pt-12 md:pb-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="flex flex-col gap-10 md:flex-row md:items-center">
            <div className="relative mx-auto aspect-4/3 w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <Image
                fill
                className="object-cover"
                src="/images/about_banner.jpg"
                alt="Ayushi working on laptop"
                sizes="(min-width: 1152px) 576px, (min-width: 1024px) 50vw, (min-width: 640px) 576px, 100vw"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight text-black">
              About <span className="text-slate-400">Me</span>
            </h2>

            <div className="space-y-5 text-[15px] leading-relaxed text-slate-600">
              <p>
                With over {yearsOfExperience} years as a Senior Web Developer, I
                design and build fast, scalable, and delightful digital
                experiences using modern technologies.
              </p>

              <p>
                I specialize in Next.js, React, Tailwind CSS, and AI integration
                — turning complex requirements into clean, high-performance
                applications that users love.
              </p>

              <p>
                My approach combines pixel-perfect design with robust backend
                architecture, ensuring every project is reliable, efficient, and
                built for real-world impact.
              </p>
            </div>

            <div className="pt-4">
              <p className="text-sm text-slate-500">
                Passionate about learning new technologies and delivering
                exceptional user experiences.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
