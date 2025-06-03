"use client";

import { ReactNode } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface AnimationWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function AnimationWrapper({
  children,
  className = "",
}: AnimationWrapperProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={className}
        // Prevent content flash during animation
        style={{ position: "relative" }}
      >
        {/* Page transition overlay */}
        <motion.div
          className="fixed inset-0 z-50 bg-white dark:bg-secondary-900"
          initial={{ scaleY: 0 }}
          animate={{
            scaleY: [0, 1, 1, 0],
            originY: ["0%", "0%", "100%", "100%"],
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
            times: [0, 0.4, 0.6, 1],
          }}
        />

        {children}
      </motion.div>
    </AnimatePresence>
  );
}
