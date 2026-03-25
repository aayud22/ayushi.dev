"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorRings: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Inner ring follows cursor directly (quick)
  const innerX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const innerY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  // Middle ring follows inner ring (slower)
  const middleX = useSpring(innerX, { stiffness: 100, damping: 25 });
  const middleY = useSpring(innerY, { stiffness: 100, damping: 25 });

  // Outer ring follows middle ring (slowest)
  const outerX = useSpring(middleX, { stiffness: 80, damping: 25 });
  const outerY = useSpring(middleY, { stiffness: 80, damping: 25 });

  // Update base position on mouse move
  useEffect(() => {
    const moveHandler = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveHandler);
    return () => window.removeEventListener("mousemove", moveHandler);
  }, [mouseX, mouseY]);

  return (
    <div className="lg:block hidden pointer-events-none z-[9999]">
      {/* Outer ring - White border with Difference blend */}
      <motion.div
        style={{
          position: "fixed",
          x: outerX,
          y: outerY,
          left: -27.5,
          top: -27.5,
          width: 55,
          height: 55,
          border: "2px solid white",
          borderRadius: "50%",
          mixBlendMode: "difference",
          zIndex: 9999,
        }}
      />
      {/* Middle ring - White border with Difference blend */}
      <motion.div
        style={{
          position: "fixed",
          x: middleX,
          y: middleY,
          left: -17.5,
          top: -17.5,
          width: 35,
          height: 35,
          border: "2px solid white",
          borderRadius: "50%",
          mixBlendMode: "difference",
          zIndex: 9999,
        }}
      />
      {/* Inner ring - Solid white dot for maximum visibility with Difference blend */}
      <motion.div
        style={{
          position: "fixed",
          x: innerX,
          y: innerY,
          left: -7.5,
          top: -7.5,
          width: 15,
          height: 15,
          backgroundColor: "white",
          borderRadius: "50%",
          mixBlendMode: "difference",
          zIndex: 9999,
        }}
      />
    </div>
  );
};

export default CursorRings;