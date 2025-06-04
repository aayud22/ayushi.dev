"use client";
import { m as motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import HeroBackground from "./HeroBackground";
import TypewriterText from "../animations/TypewriterText";
import { fadeInUp, staggerContainer } from "@/utils/animations";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Tech-themed interactive background */}
      <HeroBackground />

      {/* Background gradient with subtle animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-50/80 to-secondary-100/80 dark:from-secondary-900/80 dark:to-primary-900/30 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Decorative circles with subtle float animation */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-400/10 dark:bg-primary-400/5 rounded-full blur-3xl -z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          opacity: { duration: 1.5 },
          scale: { duration: 1.5 },
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-primary-300/10 dark:bg-primary-600/5 rounded-full blur-3xl -z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, 10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          opacity: { duration: 1.5 },
          scale: { duration: 1.5 },
          delay: 0.5,
        }}
      />

      <div className="section-container relative z-10">
        <motion.div
          exit="exit"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center p-8 rounded-xl backdrop-blur-sm bg-transparent dark:bg-transparent"
        >
          <motion.h1 className="text-4xl font-bold mb-2" variants={fadeInUp}>
            <motion.span
              className="text-primary-600 dark:text-primary-400 inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 50,
                  damping: 12,
                  delay: 0.1,
                },
              }}
            >
              Ayushi
            </motion.span>{" "}
            | Full Stack Web Developer
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-secondary-600 dark:text-secondary-400 mb-6"
            variants={fadeInUp}
          >
            I craft responsive websites where{" "}
            <TypewriterText
              texts={[
                "technology meets creativity",
                "design meets functionality",
                "ideas come to life",
                "innovation happens",
              ]}
              typingSpeed={80}
              deletingSpeed={40}
              delayBetweenTexts={2000}
              className="text-primary-600 dark:text-primary-400 font-medium"
            />{" "}
            to deliver immersive digital experiences.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
          >
            <motion.a
              href="#projects"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              View My Work
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1.5,
                  repeatDelay: 1,
                }}
                className="inline-flex items-center"
              >
                <FiArrowRight className="ml-2" />
              </motion.span>
            </motion.a>

            <motion.a
              href="#contact"
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator with smoother animation */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.2,
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <div className="flex flex-col items-center">
          <motion.span
            className="text-sm text-secondary-500 dark:text-secondary-400 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 1,
              times: [0, 0.1, 0.9, 1],
            }}
          >
            Scroll Down
          </motion.span>
          <div className="w-6 h-10 border-2 border-secondary-400 dark:border-secondary-600 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-secondary-500 dark:bg-secondary-400 rounded-full mt-2"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
