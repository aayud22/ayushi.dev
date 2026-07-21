import { EXPERIENCE, getYearsOfExperience } from "@/constants/experience";
import { CORE_SKILLS, SECONDARY_SKILLS } from "@/constants/skills";
import { PROJECTS } from "@/constants/projects";
import { CASE_STUDIES } from "@/content/case-studies";
import { FAQ_ITEMS } from "@/content/faq";

const yearsExp = getYearsOfExperience();

function buildContext(): string {
  const coreSkillNames = CORE_SKILLS.map((s) => s.name).join(", ");
  const secondarySkillNames = SECONDARY_SKILLS.map((s) => s.name).join(", ");

  const experienceBlock = EXPERIENCE.map(
    (e) =>
      `- ${e.role} at ${e.company}${e.location ? ` (${e.location})` : ""}, ${e.start} – ${e.end}\n  ${e.bullets.map((b) => `• ${b}`).join("\n  ")}`
  ).join("\n\n");

  const projectsBlock = PROJECTS.map((p) => {
    const caseStudy = p.caseStudyUrl
      ? CASE_STUDIES[p.caseStudyUrl.replace("/projects/", "")]
      : undefined;

    let block = `### ${p.title}\n- Description: ${p.description}\n- Tags: ${p.tags.join(", ")}\n- Live: ${p.liveUrl || "N/A"}\n- GitHub: ${p.githubUrl || "N/A"}`;

    if (caseStudy) {
      const sectionTexts = caseStudy.sections
        .map((sec) => {
          const body = Array.isArray(sec.body)
            ? sec.body.map((b) => b.value).join("")
            : sec.body;
          return `  [${sec.heading}]: ${body}`;
        })
        .join("\n");
      block += `\n- Case Study:\n${sectionTexts}`;
    }

    return block;
  }).join("\n\n");

  const faqBlock = FAQ_ITEMS.map(
    (f) => `Q: ${f.question}\nA: ${f.answer}`
  ).join("\n\n");

  return `
IDENTITY & BASICS
-----------------
Name: Ayushi Diyora
Title: Full Stack Developer & Next.js Expert
Location: Surat, Gujarat, India
Years of Experience: ${yearsExp}+ years (since June 2022)
Open to: Full-time remote roles and freelance/contract projects
Response time: Usually within 24 hours via email
Email: aayushid81@gmail.com
GitHub: https://github.com/aayud22
LinkedIn: https://www.linkedin.com/in/ayushi-diyora-0aa453208/
Calendly / Book a call: https://calendly.com/aayushid81/30min

CORE SKILLS
-----------
${coreSkillNames}

SECONDARY SKILLS
----------------
${secondarySkillNames}

WORK EXPERIENCE
---------------
${experienceBlock}

PROJECTS
--------
${projectsBlock}

FAQ
---
${faqBlock}
`.trim();
}

// Computed once at module load (server-side only)
export const CHATBOT_CONTEXT = buildContext();

export const SYSTEM_PROMPT = `
You are Ayushi's personal portfolio assistant. Your ONLY job is to answer questions about Ayushi's professional background, skills, projects, work experience, availability, and how to contact or hire her.

Here is the complete and authoritative information you are allowed to use:

---
${CHATBOT_CONTEXT}
---

STRICT RULES — follow these without exception:
1. ONLY use the information above. Do not invent, guess, or extrapolate any facts not explicitly stated.
2. If asked something not covered above (general knowledge, coding help, opinions, world events, trivia, etc.), respond ONLY with: "I'm just here to answer questions about Ayushi's work — feel free to reach out to her directly for anything else!"
3. Never claim Ayushi has skills, experience, or availability that are not listed above.
4. Keep responses concise, friendly, and professional.
5. If asked about hiring, rates, or booking, always direct the user to the Calendly link: https://calendly.com/aayushid81/30min
6. You may infer reasonable combinations from the data (e.g. "Does she know React?" → yes, it's listed as a core skill), but never add new facts.
`.trim();
