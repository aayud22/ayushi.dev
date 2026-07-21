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
import { CORE_SKILLS, SECONDARY_SKILLS } from "@/constants";
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
    <section id="skills" className="py-16 md:py-24">
      <Container>
        <div className="mx-auto mb-10 text-center">
          <h2 className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">
            My <span className="font-extrabold">Skills</span>
          </h2>
        </div>

        {/* Core Skills */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {CORE_SKILLS.map((skill) => {
            const Icon = getSkillIcon(skill.name);
            const tooltipId = `core-${skill.name}`
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");

            return (
              <div
                key={skill.name}
                className={cn(
                  "group relative inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200",
                  "hover:border-slate-900 hover:bg-slate-950 hover:text-white hover:shadow-md",
                  "focus-within:border-slate-900 focus-within:bg-slate-950 focus-within:text-white",
                )}
              >
                <div
                  className="inline-flex items-center gap-2"
                  tabIndex={0}
                  aria-describedby={skill.detail ? tooltipId : undefined}
                >
                  <Icon className="h-4 w-4 text-slate-700 transition-colors duration-200 group-hover:text-white group-focus-within:text-white" />
                  <span>{skill.name}</span>
                </div>

                {skill.detail ? (
                  <div
                    id={tooltipId}
                    role="tooltip"
                    className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max max-w-[200px] -translate-x-1/2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs leading-5 text-slate-700 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 text-center"
                  >
                    {skill.detail}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Secondary Skills */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-sm text-slate-500 mb-4">
            Also familiar with:
          </p>
          <ul
            className="flex flex-wrap justify-center gap-2"
            aria-label="Secondary Skills"
          >
            {SECONDARY_SKILLS.map((skill) => (
              <li
                key={skill.name}
                className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500 border border-slate-100"
              >
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
