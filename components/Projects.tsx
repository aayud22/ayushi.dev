"use client";

import { useState, useEffect } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiGithub, FiCode } from "react-icons/fi";
import {
  fadeInUp,
  staggerContainer,
  listItem,
  scaleUp,
} from "@/utils/animations";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with product listings, shopping cart, and secure checkout.",
    image: "https://picsum.photos/id/1/600/400",
    tags: ["Next.js", "Tailwind CSS", "Stripe", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "web",
  },
  {
    title: "Task Management App",
    description:
      "A productivity application for managing tasks, projects, and team collaboration.",
    image: "https://picsum.photos/id/2/600/400",
    tags: ["React", "Firebase", "Material UI", "Redux"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "app",
  },
  {
    title: "Portfolio Website",
    description:
      "A modern portfolio website showcasing projects and skills with dark mode support.",
    image: "https://picsum.photos/id/3/600/400",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "web",
  },
  {
    title: "Weather Dashboard",
    description:
      "Real-time weather information with interactive maps and forecasts.",
    image: "https://picsum.photos/id/4/600/400",
    tags: ["React", "OpenWeather API", "Chart.js", "Styled Components"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "app",
  },
  {
    title: "Blog Platform",
    description:
      "A content management system for publishing and managing blog posts.",
    image: "https://picsum.photos/id/5/600/400",
    tags: ["Next.js", "Sanity CMS", "Tailwind CSS", "Vercel"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "web",
  },
  {
    title: "Social Media Dashboard",
    description:
      "Analytics dashboard for tracking social media performance across platforms.",
    image: "https://picsum.photos/id/6/600/400",
    tags: ["React", "D3.js", "Firebase", "REST APIs"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "app",
  },
];

const categories = [
  { id: "all", name: "All Projects" },
  { id: "web", name: "Web Development" },
  { id: "app", name: "Applications" },
];

// Custom variants for filter buttons
const filterButtonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  }),
};

// Project card variants with staggered animation
const projectCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: "spring",
      stiffness: 50,
      damping: 15,
    },
  }),
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
    },
  },
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isFiltering, setIsFiltering] = useState(false);

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Handle category change with animation
  const handleCategoryChange = (categoryId: string) => {
    if (categoryId !== activeCategory) {
      setIsFiltering(true);
      setTimeout(() => {
        setActiveCategory(categoryId);
        setIsFiltering(false);
      }, 300); // Match this with exit animation duration
    }
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-secondary-900">
      <div className="section-container">
        <motion.h2
          className="section-title"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          My Projects
        </motion.h2>

        <motion.p
          className="section-subtitle"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
        >
          Check out some of my recent work
        </motion.p>

        {/* Filter buttons with staggered animation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              custom={index}
              variants={filterButtonVariants}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-primary-600 text-white"
                  : "bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid with AnimatePresence for smooth transitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]">
          <AnimatePresence mode="wait">
            {!isFiltering && (
              <>
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={`${project.title}-${index}`}
                    className="card group overflow-hidden h-full"
                    custom={index}
                    variants={projectCardVariants}
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: true, margin: "-50px" }}
                    layout
                  >
                    {/* Project image with improved hover effect */}
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] group-hover:scale-110"
                      />

                      {/* Overlay with links - smoother animation */}
                      <motion.div
                        className="absolute inset-0 bg-primary-900/80 flex items-center justify-center gap-4"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white rounded-full text-primary-600 hover:bg-primary-50 transition-colors"
                          aria-label="View live site"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: 0.1,
                          }}
                        >
                          <FiExternalLink className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white rounded-full text-primary-600 hover:bg-primary-50 transition-colors"
                          aria-label="View source code"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: 0.2,
                          }}
                        >
                          <FiGithub className="w-5 h-5" />
                        </motion.a>
                      </motion.div>
                    </div>

                    {/* Project details with staggered animations */}
                    <motion.div
                      className="p-6"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <motion.h3
                        className="text-xl font-bold mb-2 text-secondary-900 dark:text-secondary-100"
                        variants={listItem}
                      >
                        {project.title}
                      </motion.h3>

                      <motion.p
                        className="text-secondary-600 dark:text-secondary-400 mb-4 text-sm"
                        variants={listItem}
                      >
                        {project.description}
                      </motion.p>

                      <motion.div
                        className="flex flex-wrap gap-2"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                      >
                        {project.tags.map((tag, tagIndex) => (
                          <motion.span
                            key={tagIndex}
                            className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-md hover:bg-primary-200 hover:text-primary-800 dark:hover:bg-primary-800/30 dark:hover:text-primary-200 transition-colors duration-200"
                            variants={listItem}
                            custom={tagIndex}
                            whileHover={{
                              scale: 1.05,
                            }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* View more button with animation */}
        <motion.div
          className="text-center mt-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <FiCode className="mr-2" />
            View More on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
