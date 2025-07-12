"use client";
import { useState, useRef } from "react";
import {
  FiMail,
  FiSend,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
  FiMessageSquare,
} from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa";
import { RiMailSendLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import SectionTransition from "../animations/SectionTransition";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import StaggeredContainer from "../animations/StaggeredContainer";
import { getRgbaColor, PRIMARY_COLORS_RGB } from "@/utils/colors";
import { useAnimationSettings } from "../animations/AnimationProvider";
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
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      // Show success message
      setIsSubmitted(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Show error message
      alert(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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
                      href="tel:+918780684875"
                      className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-block"
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      +91 8780684875
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
                      Surat, Gujarat, India
                    </p>
                  </div>
                </div>
              </StaggeredContainer>
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
                    className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/20 border border-green-200/50 dark:border-green-800/50 rounded-xl p-6 max-w-md mx-auto shadow-lg backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        className="relative mb-4"
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 600,
                          damping: 15,
                          delay: 0.1,
                        }}
                      >
                        <div className="absolute inset-0 bg-green-200/30 dark:bg-green-800/30 rounded-full scale-125 animate-pulse"></div>
                        <div className="relative z-10 p-4 bg-green-500 text-white rounded-2xl shadow-lg">
                          <RiMailSendLine className="w-10 h-10" />
                        </div>
                        <motion.div
                          className="absolute -top-2 -right-2 bg-white dark:bg-green-900 rounded-full p-1 shadow-md"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: 0.3,
                            type: "spring",
                            stiffness: 500,
                            damping: 10,
                          }}
                        >
                          <FiCheckCircle className="w-5 h-5 text-green-500" />
                        </motion.div>
                      </motion.div>

                      <motion.h3
                        className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        Message Sent!
                      </motion.h3>

                      <motion.p
                        className="text-green-700/90 dark:text-green-300/90 text-sm leading-relaxed"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        Thank you for reaching out! I've received your message
                        and will get back to you soon.
                      </motion.p>

                      <motion.div
                        className="w-16 h-1 bg-green-200 dark:bg-green-800/50 rounded-full my-4"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      />

                      <motion.p
                        className="text-xs text-green-600/80 dark:text-green-400/80 mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        I typically respond within 24 hours.
                      </motion.p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <StaggeredContainer
                      delay={0.1}
                      staggerDelay={0.1}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-secondary-700 dark:text-secondary-300"
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

                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-secondary-700 dark:text-secondary-300"
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

                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-secondary-700 dark:text-secondary-300"
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

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-secondary-700 dark:text-secondary-300"
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
