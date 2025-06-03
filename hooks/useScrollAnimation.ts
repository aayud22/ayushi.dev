"use client";

import { useEffect, useState, useRef, RefObject } from "react";
import { useAnimationSettings } from "@/components/AnimationProvider";

interface ScrollAnimationOptions {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
): [RefObject<T>, boolean] {
  const { 
    threshold = 0.1, 
    once = true,
    rootMargin = "-100px 0px"
  } = options;
  
  const { prefersReducedMotion, isLoaded } = useAnimationSettings();
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, show content immediately
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    // Wait for page to be fully loaded before enabling animations
    if (!isLoaded) return;

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // If once is true, disconnect after animation is triggered
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once, rootMargin, prefersReducedMotion, isLoaded]);

  return [ref, isInView];
}

// Helper hook for parallax scroll effects
export function useParallaxScroll<T extends HTMLElement>(
  speed: number = 0.2
): [RefObject<T>, { y: number }] {
  const { prefersReducedMotion } = useAnimationSettings();
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Skip parallax if user prefers reduced motion
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!ref.current) return;
      
      const { top } = ref.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Only apply parallax when element is in view
      if (top < windowHeight && top > -ref.current.offsetHeight) {
        // Calculate parallax offset based on element position
        const newOffset = ((top - windowHeight) * speed);
        setOffset(newOffset);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed, prefersReducedMotion]);

  return [ref, { y: offset }];
}
