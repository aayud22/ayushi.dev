"use client";
import { ReactNode, useRef, useEffect } from "react";
import { useAnimationSettings } from "../animations/AnimationProvider";

interface SmoothScrollProps {
  children: ReactNode;
  className?: string;
}

export default function SmoothScroll({ children, className = "" }: SmoothScrollProps) {
  const { prefersReducedMotion } = useAnimationSettings();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const scrollYRef = useRef(0);
  const currentYRef = useRef(0);

  // Skip smooth scroll if user prefers reduced motion
  useEffect(() => {
    if (prefersReducedMotion) return;

    const scrollContainer = scrollContainerRef.current;
    const scrollTarget = scrollTargetRef.current;
    if (!scrollContainer || !scrollTarget) return;

    // Store current scroll position
    scrollYRef.current = window.scrollY;
    currentYRef.current = scrollYRef.current;

    // Set initial height
    scrollTarget.style.height = `${scrollContainer.clientHeight}px`;

    // Update scroll position with lerp (linear interpolation)
    const updateScroll = () => {
      scrollYRef.current = window.scrollY;
      currentYRef.current += (scrollYRef.current - currentYRef.current) * 0.1;

      if (Math.abs(scrollYRef.current - currentYRef.current) < 0.1) {
        currentYRef.current = scrollYRef.current;
      }

      // Apply transform to create smooth scroll effect
      scrollContainer.style.transform = `translateY(${-currentYRef.current}px)`;
      
      // Continue animation loop
      rafRef.current = requestAnimationFrame(updateScroll);
    };

    // Start animation loop
    rafRef.current = requestAnimationFrame(updateScroll);

    // Handle resize to update scroll target height
    const handleResize = () => {
      if (scrollTarget) {
        scrollTarget.style.height = `${scrollContainer.clientHeight}px`;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [prefersReducedMotion]);

  // If user prefers reduced motion, render children directly
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <>
      {/* This div maintains the scroll position */}
      <div ref={scrollTargetRef} />
      
      {/* This div contains the actual content with smooth scroll effect */}
      <div
        ref={scrollContainerRef}
        className={`fixed top-0 left-0 right-0 ${className}`}
        style={{ willChange: "transform" }}
      >
        {children}
      </div>
    </>
  );
}
