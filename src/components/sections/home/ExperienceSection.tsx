import { cn } from "@/lib/utils";
import { Building2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { EXPERIENCE, type ExperienceItem } from "@/constants";

function ExperienceItem({ item }: { item: ExperienceItem }) {
  return (
    <div
      className={cn(
        "rounded-sm border border-white/15 bg-black/30 p-6 shadow-sm backdrop-blur",
        "transition-colors duration-200 hover:bg-white/10 cursor-pointer",
      )}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white/10">
            <Building2 className="h-5 w-5 text-white" />
          </div>

          <div>
            <p className="text-lg font-bold text-white">
              {item.role}
            </p>
            <p className="mt-1 text-base font-semibold text-white/90">
              {item.company}
            </p>
            <p className="mt-1 text-sm text-white/65">
              {item.location || ""}
            </p>
          </div>
        </div>

        <p className="text-sm font-medium text-white/70 md:mt-1">
          {item.start} - {item.end}
        </p>
      </div>

      <ul className="mt-4 space-y-2 text-sm leading-6 text-white/70">
        {item.bullets.map((bullet, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="bg-slate-950 py-16">
      <Container>
        <div className="mx-auto mb-10 text-center">
          <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
            My <span className="font-extrabold">Experience</span>
          </h2>
        </div>

        <div className="space-y-8">
          {EXPERIENCE?.map((item) => (
            <ExperienceItem key={`${item.company}-${item.role}-${item.start}`} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
