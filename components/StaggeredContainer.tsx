"use client";

import { ReactNode, Children, isValidElement } from "react";
import { m as motion } from "framer-motion";
import { useAnimationSettings } from "./AnimationProvider";

interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
  margin?: string;
  threshold?: number;
}

export default function StaggeredContainer({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
  direction = "up",
  once = true,
  margin = "-100px",
  threshold = 0.1,
}: StaggeredContainerProps) {
  const { prefersReducedMotion } = useAnimationSettings();
  
  // Define animation variants based on direction
  const getContainerVariants = () => {
    // If user prefers reduced motion, use simple fade
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay / 2,
          },
        },
      };
    }
    
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: delay,
          staggerChildren: staggerDelay,
        },
      },
    };
  };

  const getItemVariants = () => {
    // If user prefers reduced motion, use simple fade
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
          },
        },
      };
    }
    
    // Otherwise use direction-based animations
    switch (direction) {
      case "down":
        return {
          hidden: { y: -20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 20,
            },
          },
        };
      case "left":
        return {
          hidden: { x: 20, opacity: 0 },
          visible: {
            x: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 20,
            },
          },
        };
      case "right":
        return {
          hidden: { x: -20, opacity: 0 },
          visible: {
            x: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 20,
            },
          },
        };
      case "up":
      default:
        return {
          hidden: { y: 20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 20,
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
      variants={getContainerVariants()}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        
        return (
          <motion.div variants={getItemVariants()}>
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
