"use client";

import { m as motion } from "framer-motion";
import Image from "next/image";
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
  listItem,
} from "@/utils/animations";

export default function About() {
  // Staggered animation for info items
  const infoContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-secondary-900">
      <div className="section-container">
        <motion.h2
          className="section-title"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          About Me
        </motion.h2>

        <motion.p
          className="section-subtitle"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
        >
          Get to know more about me and my background
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
          {/* Image column with smoother animation */}
          <motion.div
            className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Image
              src="https://picsum.photos/600/800"
              alt="Profile"
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-700 hover:scale-105"
              priority
            />

            {/* Subtle overlay animation on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
          </motion.div>

          {/* Content column with staggered animations */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3
              className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Frontend Developer
            </motion.h3>

            <motion.p
              className="text-secondary-700 dark:text-secondary-300 mb-6"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              I'm a passionate web developer with a strong focus on creating
              beautiful, functional, and user-centered digital experiences. With
              a background in both design and development, I bring a unique
              perspective to every project.
            </motion.p>

            <motion.p
              className="text-secondary-700 dark:text-secondary-300 mb-6"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              My journey in web development started over 3 years ago, and since
              then, I've been continuously learning and adapting to the
              ever-evolving tech landscape. I specialize in building responsive
              websites and web applications using modern technologies like
              React, Next.js, and Tailwind CSS.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 gap-4 mb-6"
              variants={infoContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Staggered info items */}
              <motion.div variants={listItem}>
                <h4 className="font-semibold text-secondary-900 dark:text-secondary-100">
                  Name:
                </h4>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Ayushi
                </p>
              </motion.div>
              <motion.div variants={listItem}>
                <h4 className="font-semibold text-secondary-900 dark:text-secondary-100">
                  Email:
                </h4>
                <p className="text-secondary-600 dark:text-secondary-400">
                  aayushid81@gmail.com
                </p>
              </motion.div>
              <motion.div variants={listItem}>
                <h4 className="font-semibold text-secondary-900 dark:text-secondary-100">
                  Location:
                </h4>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Surat, Gujarat
                </p>
              </motion.div>
              <motion.div variants={listItem}>
                <h4 className="font-semibold text-secondary-900 dark:text-secondary-100">
                  Availability:
                </h4>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Freelance / Part-time
                </p>
              </motion.div>
            </motion.div>

            <motion.a
              href="#contact"
              className="btn-primary"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
