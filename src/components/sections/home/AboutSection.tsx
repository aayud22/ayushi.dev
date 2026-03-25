import Image from "next/image";
import { Container } from "@/components/layout/Container";

export function AboutSection() {
  return (
    <section id="about" className="py-16">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-center">
          <div className="relative mx-auto aspect-4/3 w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <Image
              fill
              alt="About illustration"
              className="object-cover"
              src="/images/about_banner.jpg"
            />
          </div>

          <div className="w-full">
            <h2 className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">
              About <span className="font-extrabold">Me</span>
            </h2>
            <div className="mt-4 flex flex-col gap-4 text-sm leading-7 text-slate-600">
              <span className="block">With over 3 years of experience as a MERN Stack Developer, I design and develop full-stack applications that are fast, scalable, and built for real-world use.</span>
              <span className="block">Leveraging technologies like React.js, Next.js, Tailwind CSS, Node.js, and MongoDB, I&apos;ve delivered solutions ranging from complex dashboards to interactive platforms.</span>
              <span className="block">My approach combines clean, maintainable code with secure backend architecture—ensuring every product is reliable, efficient, and user-centric.</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}