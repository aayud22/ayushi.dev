import {
  Code2,
  Database,
  GitBranch,
  Globe,
  Server,
  Sparkles,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SKILLS_DATA } from "@/constants";
import { Container } from "@/components/layout/Container";

function getSkillIcon(name: string) {
  const key = name.toLowerCase();

  if (key.includes("git")) return GitBranch;
  if (key.includes("next")) return Globe;
  if (key.includes("react")) return Code2;
  if (key.includes("tailwind")) return Sparkles;
  if (key.includes("node")) return Server;
  if (key.includes("express")) return Terminal;
  if (key.includes("mongo") || key.includes("prisma") || key.includes("database"))
    return Database;

  return Code2;
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-16">
      <Container>
        <div className="mx-auto mb-10 text-center">
          <h2 className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">
            My <span className="font-extrabold">Skills</span>
          </h2>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:flex-wrap">
          {SKILLS_DATA.map((cat) => (
            <div
              key={cat.title}
              className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-1 md:min-w-80"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  {cat.title}
                </h3>
                <span className="text-xs font-medium text-slate-500">
                  {cat.skills.length}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {cat.skills.map((skill) => {
                  const Icon = getSkillIcon(skill.name);
                  const tooltipId = `${cat.title}-${skill.name}`
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");

                  return (
                    <span
                      key={`${cat.title}-${skill.name}`}
                      className={cn(
                        "group relative inline-flex cursor-pointer items-center gap-2 rounded-sm border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition-colors duration-200",
                        "hover:border-slate-900 hover:bg-slate-950 hover:text-white",
                        "focus-within:border-slate-900 focus-within:bg-slate-950 focus-within:text-white",
                      )}
                    >
                      <span
                        className="inline-flex items-center gap-2"
                        tabIndex={0}
                        aria-describedby={skill.detail ? tooltipId : undefined}
                      >
                        <Icon className="h-4 w-4 text-slate-700 transition-colors duration-200 group-hover:text-white group-focus-within:text-white" />
                        <span>{skill.name}</span>
                      </span>

                      {skill.detail ? (
                        <span
                          id={tooltipId}
                          role="tooltip"
                          className="pointer-events-none absolute left-0 top-full z-10 mt-2 w-[calc(100vw-2rem)] max-w-56 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs leading-5 text-slate-700 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 sm:left-1/2 sm:-translate-x-1/2"
                        >
                          {skill.detail}
                        </span>
                      ) : null}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
