"use client";

import { ReactNode } from "react";
import { m as motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  duration?: number;
  once?: boolean;
  margin?: string;
  threshold?: number;
}

export default function SectionTransition({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.5,
  once = true,
  margin = "-100px",
  threshold = 0.1,
}: SectionTransitionProps) {
  // Define animation variants based on direction
  const getVariants = () => {
    switch (direction) {
      case "left":
        return {
          hidden: { x: -50, opacity: 0 },
          visible: {
            x: 0,
            opacity: 1,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.1, 0.25, 1.0],
            },
          },
        };
      case "right":
        return {
          hidden: { x: 50, opacity: 0 },
          visible: {
            x: 0,
            opacity: 1,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.1, 0.25, 1.0],
            },
          },
        };
      case "up":
      default:
        return {
          hidden: { y: 50, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.1, 0.25, 1.0],
            },
          },
        };
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin, amount: threshold }}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
}
