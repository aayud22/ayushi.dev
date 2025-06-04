"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useAnimationSettings } from "./AnimationProvider";
import { getRgbaColor, PRIMARY_COLORS_RGB } from "@/utils/colors";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

interface AnimatedBackgroundProps {
  enabled?: boolean;
}

export default function AnimatedBackground({
  enabled = true,
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { prefersReducedMotion, isMobile } = useAnimationSettings();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Animation frame reference for cleanup
  const animationFrameRef = useRef<number | null>(null);

  // Particles array reference to avoid recreating in each frame
  const particlesRef = useRef<Particle[]>([]);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // Initial check
    checkDarkMode();

    // Set up observer for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Initialize particles
  const initParticles = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particleCount = isMobile ? 30 : 80;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        color: isDarkMode
          ? getRgbaColor(PRIMARY_COLORS_RGB, "500", Math.random() * 0.5 + 0.1)
          : getRgbaColor(PRIMARY_COLORS_RGB, "800", Math.random() * 0.5 + 0.1),
      });
    }

    particlesRef.current = particles;
  }, [isMobile, isDarkMode]);

  // Animation function
  const animate = useCallback(() => {
    if (!canvasRef.current || !isVisible || prefersReducedMotion || !enabled)
      return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current.forEach((particle, index) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

      // Draw connections between nearby particles
      for (let j = index + 1; j < particlesRef.current.length; j++) {
        const otherParticle = particlesRef.current[j];
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = isDarkMode
            ? getRgbaColor(
                PRIMARY_COLORS_RGB,
                "500",
                0.1 * (1 - distance / 100)
              )
            : getRgbaColor(
                PRIMARY_COLORS_RGB,
                "800",
                0.1 * (1 - distance / 100)
              );
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }
    });

    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isVisible, prefersReducedMotion, enabled, isDarkMode]);

  // Handle resize
  const handleResize = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Reinitialize particles after resize
    initParticles();
  }, [initParticles]);

  // Set up canvas and animation
  useEffect(() => {
    if (!canvasRef.current) return;

    // Set canvas dimensions
    handleResize();

    // Initialize particles
    initParticles();

    // Start animation if enabled
    if (!prefersReducedMotion && enabled) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    // Add event listeners
    window.addEventListener("resize", handleResize);

    // Visibility API to pause when tab is not visible
    document.addEventListener("visibilitychange", () => {
      setIsVisible(!document.hidden);
    });

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [animate, handleResize, initParticles, prefersReducedMotion, enabled]);

  // Update animation when dark mode changes
  useEffect(() => {
    initParticles();
  }, [isDarkMode, initParticles]);

  // Update animation when visibility changes
  useEffect(() => {
    if (
      isVisible &&
      !prefersReducedMotion &&
      enabled &&
      !animationFrameRef.current
    ) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else if (
      (!isVisible || prefersReducedMotion || !enabled) &&
      animationFrameRef.current
    ) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, [isVisible, prefersReducedMotion, animate, enabled]);

  // Don't render anything if animations are disabled
  if (prefersReducedMotion && !enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
      aria-hidden="true"
    />
  );
}
