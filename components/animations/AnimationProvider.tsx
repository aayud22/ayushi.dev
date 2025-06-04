"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

// Create context for animation settings
type AnimationContextType = {
  prefersReducedMotion: boolean;
  isMobile: boolean;
  isLoaded: boolean;
};

const AnimationContext = createContext<AnimationContextType>({
  prefersReducedMotion: false,
  isMobile: false,
  isLoaded: false,
});

export const useAnimationSettings = () => useContext(AnimationContext);

interface AnimationProviderProps {
  children: ReactNode;
}

export default function AnimationProvider({
  children,
}: AnimationProviderProps) {
  // Track if page is fully loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Track user preferences and device capabilities
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Mark as loaded after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimationContext.Provider
      value={{
        prefersReducedMotion,
        isMobile,
        isLoaded,
      }}
    >
      {/* Use LazyMotion to only load animation features when needed */}
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </AnimationContext.Provider>
  );
}
