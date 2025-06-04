"use client";
import { m as motion, useInView } from "framer-motion";
import {
  FiCode,
  FiTool,
  FiGlobe,
  FiLayout,
  FiServer,
  FiDatabase,
  FiGitBranch,
  FiSmartphone,
} from "react-icons/fi";
import { useRef } from "react";
import SectionTransition from "../animations/SectionTransition";
import StaggeredContainer from "../animations/StaggeredContainer";
import { useAnimationSettings } from "../animations/AnimationProvider";

const skills = [
  {
    title: "Frontend Development",
    icon: <FiCode className="w-8 h-8" />,
    description:
      "Building responsive websites using React, Next.js, HTML, CSS, and JavaScript.",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "UI/UX Design",
    icon: <FiLayout className="w-8 h-8" />,
    description:
      "Creating intuitive and beautiful user interfaces with a focus on user experience.",
    technologies: [
      "Figma",
      "Adobe XD",
      "Tailwind CSS",
      "Material UI",
      "Framer Motion",
    ],
  },
  {
    title: "Backend Development",
    icon: <FiServer className="w-8 h-8" />,
    description:
      "Developing server-side logic and APIs to power web applications.",
    technologies: [
      "Node.js",
      "Express",
      "REST APIs",
      "GraphQL",
      "Authentication",
    ],
  },
  {
    title: "Database Management",
    icon: <FiDatabase className="w-8 h-8" />,
    description:
      "Designing and managing databases for efficient data storage and retrieval.",
    technologies: ["MongoDB", "PostgreSQL", "Firebase", "Prisma", "SQL"],
  },
  {
    title: "Responsive Design",
    icon: <FiSmartphone className="w-8 h-8" />,
    description:
      "Ensuring websites look and function well on all devices and screen sizes.",
    technologies: [
      "Mobile-First Design",
      "Media Queries",
      "Flexbox",
      "CSS Grid",
      "Bootstrap",
    ],
  },
  {
    title: "Version Control",
    icon: <FiGitBranch className="w-8 h-8" />,
    description:
      "Managing code changes and collaborating with other developers effectively.",
    technologies: ["Git", "GitHub", "GitLab", "Bitbucket", "CI/CD"],
  },
  {
    title: "Web Performance",
    icon: <FiGlobe className="w-8 h-8" />,
    description:
      "Optimizing websites for speed, accessibility, and search engine visibility.",
    technologies: [
      "Lazy Loading",
      "Code Splitting",
      "SEO",
      "Web Vitals",
      "Lighthouse",
    ],
  },
  {
    title: "Development Tools",
    icon: <FiTool className="w-8 h-8" />,
    description:
      "Utilizing modern development tools and workflows for efficient coding.",
    technologies: [
      "VS Code",
      "npm/yarn",
      "Webpack",
      "ESLint",
      "Jest",
      "Testing Library",
    ],
  },
];

export default function Skills() {
  const { prefersReducedMotion } = useAnimationSettings();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-secondary-50 dark:bg-secondary-800 relative overflow-hidden"
    >
      {/* Background decoration - subtle animated circles */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary-500/5 dark:bg-primary-500/10"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, 0],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary-500/5 dark:bg-primary-500/10"
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, -5, 0],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </>
      )}

      <div className="section-container relative z-10">
        <SectionTransition delay={0.1}>
          <h2 className="section-title">My Skills</h2>
        </SectionTransition>

        <SectionTransition delay={0.2}>
          <p className="section-subtitle">
            Here are the technologies and tools I work with
          </p>
        </SectionTransition>

        <StaggeredContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12"
          delay={0.3}
          staggerDelay={0.08}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="card p-6 group relative overflow-hidden h-full flex flex-col"
              whileHover={{
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Subtle background glow on hover */}
              <motion.div
                className="absolute inset-0 bg-primary-500/5 dark:bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                layoutId={`skill-bg-${index}`}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />

              <motion.div
                className="text-primary-500 dark:text-primary-400 mb-4 relative z-10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {skill.icon}
              </motion.div>

              <h3 className="text-xl font-bold mb-2 text-secondary-900 dark:text-secondary-100 relative z-10">
                {skill.title}
              </h3>

              <p className="text-secondary-600 dark:text-secondary-400 mb-4 text-sm relative z-10">
                {skill.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                {skill.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-md hover:bg-primary-200 hover:text-primary-800 dark:hover:bg-primary-800/30 dark:hover:text-primary-200 transition-colors duration-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.1 * techIndex,
                      duration: 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    whileHover={{
                      scale: 1.05,
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </StaggeredContainer>
      </div>
    </section>
  );
}
