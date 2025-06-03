"use client";

import { ReactNode, useEffect, useState } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Skip initial animation on first page load
  useEffect(() => {
    setTimeout(() => {
      setIsFirstRender(false);
    }, 500);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={isFirstRender ? false : "initial"}
        animate="animate"
        exit="exit"
        className="w-full"
      >
        {/* Page transition overlay */}
        {!isFirstRender && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ scaleX: 0 }}
            animate={{ 
              scaleX: [0, 1, 1, 0],
              originX: ["0%", "0%", "100%", "100%"],
            }}
            exit={{ scaleX: 0 }}
            transition={{ 
              duration: 1, 
              ease: [0.22, 1, 0.36, 1],
              times: [0, 0.4, 0.6, 1]
            }}
          >
            <div className="w-full h-full bg-primary-500/10 backdrop-blur-sm" />
          </motion.div>
        )}

        {/* Page content with fade-in animation */}
        <motion.div
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1.0],
                delay: 0.2
              }
            },
            exit: { 
              opacity: 0,
              y: 10,
              transition: { 
                duration: 0.3,
                ease: "easeInOut" 
              }
            }
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
