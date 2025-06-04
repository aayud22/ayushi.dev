"use client";
import Link from "next/link";
import { useTheme } from "./context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiMoon, FiSun } from "react-icons/fi";

import { PRIMARY_COLORS, PRIMARY_COLORS_RGB } from "@/utils/colors";

const NotFoundIllustration = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const primaryColor = isDarkMode ? "#ffffff" : PRIMARY_COLORS[500];
  const secondaryColor = isDarkMode ? "#e5e7eb" : PRIMARY_COLORS[400];
  const accentColor = isDarkMode ? "#f472b6" : "#db2777";

  return (
    <motion.div
      className="relative w-72 h-72 mx-auto mb-8"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main document shape */}
        <motion.rect
          x="30"
          y="50"
          width="140"
          height="120"
          rx="4"
          fill={isDarkMode ? "#1f2937" : "#f3f4f6"}
          stroke={primaryColor}
          strokeWidth="2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        />

        {/* Document fold */}
        <motion.polygon
          points="30,50 50,30 170,30 170,50"
          fill={isDarkMode ? "#111827" : "#e5e7eb"}
          stroke={primaryColor}
          strokeWidth="2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        />

        {/* 404 Text */}
        <motion.text
          x="100"
          y="120"
          textAnchor="middle"
          fontSize="60"
          fontWeight="bold"
          fill={accentColor}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          404
        </motion.text>

        {/* Decorative elements */}
        <motion.circle
          cx="60"
          cy="80"
          r="6"
          fill={primaryColor}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        />
        <motion.rect
          x="80"
          y="75"
          width="80"
          height="10"
          rx="2"
          fill={secondaryColor}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6 }}
        />
        <motion.rect
          x="80"
          y="90"
          width="40"
          height="8"
          rx="2"
          fill={secondaryColor}
          fillOpacity="0.6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7 }}
        />
      </svg>

      {/* Floating elements */}
      <motion.div
        className="absolute -top-4 -left-4 w-8 h-8 rounded-full"
        style={{ backgroundColor: accentColor }}
        initial={{ scale: 0, rotate: -45 }}
        animate={{
          scale: [0, 1, 1.1, 1],
          rotate: [0, 360],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse" as const,
        }}
      />
      <motion.div
        className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full"
        style={{ backgroundColor: primaryColor }}
        initial={{ scale: 0 }}
        animate={{
          scale: [0, 0.8, 1, 0.8],
          x: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse" as const,
        }}
      />
    </motion.div>
  );
};

export default function NotFound() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const textColor = isDark ? "text-white" : "text-gray-800";
  const secondaryTextColor = isDark ? "text-gray-300" : "text-gray-600";
  // Button styles with primary colors
  const buttonStyles = isDark
    ? {
        backgroundColor: `${PRIMARY_COLORS[500]}1a`, // 10% opacity
        borderColor: `${PRIMARY_COLORS[500]}33`, // 20% opacity
        color: "white",
        "&:hover": {
          backgroundColor: `${PRIMARY_COLORS[500]}33`, // 20% opacity
        },
      }
    : {
        backgroundColor: PRIMARY_COLORS[500],
        borderColor: PRIMARY_COLORS[500],
        color: "white",
        "&:hover": {
          backgroundColor: PRIMARY_COLORS[600],
        },
      };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="absolute top-6 right-6">
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

      <div className="max-w-md w-full space-y-8 text-center">
        <NotFoundIllustration isDarkMode={isDark} />

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className={`text-5xl md:text-6xl font-bold mb-4 ${textColor}`}>
            404
          </h1>
          <h2
            className={`text-2xl md:text-3xl font-semibold mb-3 ${textColor}`}
          >
            Page Not Found
          </h2>
          <p className={`text-lg mb-8 ${secondaryTextColor}`}>
            Oops! The page you're looking for doesn't exist.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          <Link
            href="/"
            className="group flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-full backdrop-blur-sm border transition-all duration-300"
            style={{
              backgroundColor: buttonStyles.backgroundColor,
              borderColor: buttonStyles.borderColor,
              color: buttonStyles.color,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                buttonStyles["&:hover"]?.backgroundColor ||
                buttonStyles.backgroundColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                buttonStyles.backgroundColor;
            }}
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Return Home
          </Link>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 -z-10 transition-colors duration-700"
          style={{
            background: isDark
              ? `radial-gradient(circle at 20% 20%, 
                  rgba(${PRIMARY_COLORS_RGB[400]}, 0.3) 0%, 
                  rgba(${PRIMARY_COLORS_RGB[600]}, 0.2) 30%, 
                  rgba(17, 24, 39, 0) 70%)`
              : `radial-gradient(circle at 80% 80%, 
                  rgba(${PRIMARY_COLORS_RGB[300]}, 0.4) 0%, 
                  rgba(${PRIMARY_COLORS_RGB[400]}, 0.3) 30%, 
                  rgba(255, 255, 255, 0) 70%)`,
          }}
        />
      </AnimatePresence>
    </div>
  );
}
