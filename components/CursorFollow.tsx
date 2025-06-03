"use client";

import { useEffect, useState } from "react";
import { m as motion, useSpring, useMotionValue } from "framer-motion";

export default function CursorFollow() {
  // Motion values for smooth animation
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for smooth following with slight lag
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const followerX = useSpring(cursorX, springConfig);
  const followerY = useSpring(cursorY, springConfig);

  // State for cursor visibility and hover effects
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Only show cursor on non-touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Detect if device is touch-based
    setIsTouchDevice(
      "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
    );

    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Update motion values directly (more efficient than setState)
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible, isTouchDevice]);

  // Don't render anything on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor follower */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-50 shadow-lg"
        style={{
          width: isHovering ? "40px" : "30px",
          height: isHovering ? "40px" : "30px",
          backgroundColor: "rgba(14, 165, 233, 0.2)",
          border: "1px solid rgba(56, 189, 248, 0.3)",
          x: followerX,
          y: followerY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          boxShadow: "0 0 10px rgba(14, 165, 233, 0.3)",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          scale: {
            type: "spring",
            damping: 20,
            stiffness: 300,
            mass: 0.5,
          },
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
