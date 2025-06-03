"use client";
import { useState, useRef } from "react";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";
import { useForm } from "react-hook-form";
import SectionTransition from "./SectionTransition";
import StaggeredContainer from "./StaggeredContainer";
import { useAnimationSettings } from "./AnimationProvider";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getRgbaColor, PRIMARY_COLORS_RGB } from "@/utils/colors";
import { m as motion, useInView, AnimatePresence } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight } from "@/utils/animations";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { prefersReducedMotion } = useAnimationSettings();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  // Use our custom scroll animation hook for the form
  const [formRef, formInView] = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    once: true,
    rootMargin: "-50px 0px",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 bg-secondary-50 dark:bg-secondary-800 relative overflow-hidden"
    >
      {/* Background decoration - subtle animated pattern */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-0 right-0 w-1/3 h-1/3 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, ${getRgbaColor(
                PRIMARY_COLORS_RGB,
                "500",
                1
              )} 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
            animate={{
              opacity: [0.05, 0.1, 0.05],
              scale: [1, 1.05, 1],
              rotate: [0, 3, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-1/3 h-1/3 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, ${getRgbaColor(
                PRIMARY_COLORS_RGB,
                "500",
                1
              )} 1px, transparent 1px)`,
              backgroundSize: "15px 15px",
            }}
            animate={{
              opacity: [0.05, 0.1, 0.05],
              scale: [1, 1.05, 1],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </>
      )}

      <div className="section-container relative z-10">
        <SectionTransition delay={0.1}>
          <h2 className="section-title">Get In Touch</h2>
        </SectionTransition>

        <SectionTransition delay={0.2}>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? Feel free to reach
            out!
          </p>
        </SectionTransition>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Contact information */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          >
            <div className="bg-white dark:bg-secondary-900 rounded-lg shadow-md p-6 sm:p-8">
              <h3 className="text-2xl font-bold mb-6 text-secondary-900 dark:text-secondary-100">
                Contact Information
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 mb-8">
                Feel free to reach out through any of these channels. Whether
                you have a question about my work or want to discuss a potential
                project, I'd love to hear about it!
              </p>

              <StaggeredContainer
                className="space-y-6"
                delay={0.3}
                staggerDelay={0.15}
              >
                <div className="flex items-start group">
                  <motion.div
                    className="flex-shrink-0 p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800/30 transition-colors duration-200"
                    whileHover={{
                      scale: 1.1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <FiMail className="w-5 h-5" />
                  </motion.div>
                  <div className="ml-4">
                    <h4 className="text-sm font-semibold text-secondary-900 dark:text-secondary-100">
                      Email
                    </h4>
                    <motion.a
                      href="mailto:aayushid81@gmail.com"
                      className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-block"
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      aayushid81@gmail.com
                    </motion.a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <motion.div
                    className="flex-shrink-0 p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800/30 transition-colors duration-200"
                    whileHover={{
                      scale: 1.1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <FiPhone className="w-5 h-5" />
                  </motion.div>
                  <div className="ml-4">
                    <h4 className="text-sm font-semibold text-secondary-900 dark:text-secondary-100">
                      Phone
                    </h4>
                    <motion.a
                      href="tel:+1234567890"
                      className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-block"
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      +1 (234) 567-890
                    </motion.a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <motion.div
                    className="flex-shrink-0 p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800/30 transition-colors duration-200"
                    whileHover={{
                      scale: 1.1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <FiMapPin className="w-5 h-5" />
                  </motion.div>
                  <div className="ml-4">
                    <h4 className="text-sm font-semibold text-secondary-900 dark:text-secondary-100">
                      Location
                    </h4>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      San Francisco, California
                    </p>
                  </div>
                </div>
              </StaggeredContainer>

              {/* Map or additional image */}
              <div className="mt-8 h-48 bg-secondary-200 dark:bg-secondary-700 rounded-lg overflow-hidden">
                <motion.div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/images/map.jpg')",
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            ref={formRef}
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          >
            <div className="bg-white dark:bg-secondary-900 rounded-lg shadow-md p-6 sm:p-8">
              <h3 className="text-2xl font-bold mb-6 text-secondary-900 dark:text-secondary-100">
                Send Me a Message
              </h3>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4 flex items-center text-green-700 dark:text-green-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        delay: 0.2,
                      }}
                    >
                      <FiCheckCircle className="w-5 h-5 mr-3" />
                    </motion.div>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      Thank you! Your message has been sent successfully.
                    </motion.span>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <StaggeredContainer delay={0.1} staggerDelay={0.1}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1"
                          >
                            Name
                          </label>
                          <motion.div
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <input
                              type="text"
                              id="name"
                              className={`w-full px-4 py-2 rounded-md border ${
                                errors.name
                                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                  : "border-secondary-300 dark:border-secondary-700 focus:ring-primary-500 focus:border-primary-500"
                              } bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100`}
                              placeholder="Your name"
                              {...register("name", {
                                required: "Name is required",
                              })}
                            />
                          </motion.div>
                          {errors.name && (
                            <motion.p
                              className="mt-1 text-sm text-red-500"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            >
                              {errors.name.message}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1"
                          >
                            Email
                          </label>
                          <motion.div
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <input
                              type="email"
                              id="email"
                              className={`w-full px-4 py-2 rounded-md border ${
                                errors.email
                                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                  : "border-secondary-300 dark:border-secondary-700 focus:ring-primary-500 focus:border-primary-500"
                              } bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100`}
                              placeholder="your.email@example.com"
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address",
                                },
                              })}
                            />
                          </motion.div>
                          {errors.email && (
                            <motion.p
                              className="mt-1 text-sm text-red-500"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            >
                              {errors.email.message}
                            </motion.p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1"
                        >
                          Subject
                        </label>
                        <motion.div
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <input
                            type="text"
                            id="subject"
                            className={`w-full px-4 py-2 rounded-md border ${
                              errors.subject
                                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                : "border-secondary-300 dark:border-secondary-700 focus:ring-primary-500 focus:border-primary-500"
                            } bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100`}
                            placeholder="Project Inquiry"
                            {...register("subject", {
                              required: "Subject is required",
                            })}
                          />
                        </motion.div>
                        {errors.subject && (
                          <motion.p
                            className="mt-1 text-sm text-red-500"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          >
                            {errors.subject.message}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1"
                        >
                          Message
                        </label>
                        <motion.div
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <textarea
                            id="message"
                            rows={5}
                            className={`w-full px-4 py-2 rounded-md border ${
                              errors.message
                                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                : "border-secondary-300 dark:border-secondary-700 focus:ring-primary-500 focus:border-primary-500"
                            } bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100`}
                            placeholder="Tell me about your project..."
                            {...register("message", {
                              required: "Message is required",
                              minLength: {
                                value: 10,
                                message:
                                  "Message should be at least 10 characters",
                              },
                            })}
                          />
                        </motion.div>
                        {errors.message && (
                          <motion.p
                            className="mt-1 text-sm text-red-500"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          >
                            {errors.message.message}
                          </motion.p>
                        )}
                      </div>

                      <motion.button
                        type="submit"
                        className="w-full btn-primary py-3 mt-4 flex items-center justify-center"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.svg
                              className="-ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </motion.svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <motion.div
                              initial={{ x: 0 }}
                              whileHover={{ x: -3 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                              }}
                            >
                              <FiSend className="mr-2" />
                            </motion.div>
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </StaggeredContainer>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
