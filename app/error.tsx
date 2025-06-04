"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useTheme } from "./context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { PRIMARY_COLORS, PRIMARY_COLORS_RGB } from "@/utils/colors";
import { FiRefreshCw, FiArrowLeft, FiSun, FiMoon } from "react-icons/fi";

// This component is used to display error messages in development mode
const ErrorDetails = ({ error }: { error: Error }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <motion.div
      className={`mt-8 p-4 backdrop-blur-sm rounded-xl text-left text-sm border ${
        isDark
          ? "bg-red-500/10 border-red-500/20 text-red-100"
          : "bg-red-50 border-red-200 text-red-800"
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h3
        className={`font-bold mb-2 ${isDark ? "text-red-300" : "text-red-700"}`}
      >
        Error Details:
      </h3>
      <pre
        className={`whitespace-pre-wrap overflow-auto max-h-40 p-3 rounded-lg text-sm ${
          isDark ? "bg-black/20 text-red-100" : "bg-white/80 text-red-900"
        }`}
      >
        {error.message}
      </pre>
    </motion.div>
  );
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    console.error(error);
  }, [error]);

  // Button styles with primary colors
  const buttonStyles = isDark
    ? {
        backgroundColor: `${PRIMARY_COLORS[500]}1a`,
        borderColor: `${PRIMARY_COLORS[500]}33`,
        color: "white",
        hoverBg: `${PRIMARY_COLORS[500]}33`,
      }
    : {
        backgroundColor: PRIMARY_COLORS[500],
        borderColor: PRIMARY_COLORS[500],
        color: "white",
        hoverBg: PRIMARY_COLORS[600],
      };

  const textColor = isDark ? "text-white" : "text-gray-800";
  const secondaryTextColor = isDark ? "text-gray-300" : "text-gray-600";
  const bgColor = isDark ? "bg-gray-900" : "bg-white";
  const gradientBg = isDark
    ? `radial-gradient(circle at 20% 20%, 
        rgba(${PRIMARY_COLORS_RGB[400]}, 0.3) 0%, 
        rgba(${PRIMARY_COLORS_RGB[600]}, 0.2) 30%, 
        rgba(17, 24, 39, 0) 70%)`
    : `radial-gradient(circle at 80% 80%, 
        rgba(${PRIMARY_COLORS_RGB[300]}, 0.4) 0%, 
        rgba(${PRIMARY_COLORS_RGB[400]}, 0.3) 30%, 
        rgba(255, 255, 255, 0) 70%)`;

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${bgColor}`}
    >
      <AnimatePresence>
        <div className="max-w-md w-full space-y-8 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            className="mx-auto w-32 h-32 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 border border-white/10"
          >
            <motion.span
              className="text-6xl"
              initial={{ scale: 0, rotate: 45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              😵
            </motion.span>
          </motion.div>

          <div className="absolute top-0 right-6">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isDark
                  ? "bg-white/10 text-yellow-300 hover:bg-white/20"
                  : "bg-gray-100 text-amber-500 hover:bg-gray-200"
              } transition-colors`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>
          </div>

          <motion.h1
            className={`text-5xl md:text-6xl font-bold mb-4 ${textColor}`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Oops!
          </motion.h1>

          <motion.h2
            className={`text-2xl md:text-3xl font-semibold ${textColor} mb-3`}
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Something went wrong
          </motion.h2>

          <motion.p
            className={`${secondaryTextColor} mb-8 text-lg`}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            We're sorry, but an unexpected error occurred.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={() => reset()}
              className="group flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium rounded-full transition-all duration-300"
              style={{
                backgroundColor: buttonStyles.backgroundColor,
                borderColor: buttonStyles.borderColor,
                color: buttonStyles.color,
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = buttonStyles.hoverBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  buttonStyles.backgroundColor;
              }}
            >
              <FiRefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform" />
              Try Again
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 sm:flex-initial"
            >
              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                  borderColor: isDark
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.1)",
                  color: isDark ? "white" : "inherit",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)";
                }}
              >
                <FiArrowLeft className="w-5 h-5" />
                Go Home
              </Link>
            </motion.div>
          </motion.div>

          <ErrorDetails error={error} />
        </div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 -z-10 transition-colors duration-700"
          style={{
            background: gradientBg,
          }}
        />
      </AnimatePresence>
    </div>
  );
}
