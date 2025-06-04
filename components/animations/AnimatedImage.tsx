"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { m as motion } from "framer-motion";
import { useAnimationSettings } from "./AnimationProvider";

interface AnimatedImageProps extends Omit<ImageProps, "onLoadingComplete"> {
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  transitionDuration?: number;
  withHoverEffect?: boolean;
}

export default function AnimatedImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  priority = false,
  transitionDuration = 0.5,
  withHoverEffect = false,
  ...props
}: AnimatedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { prefersReducedMotion } = useAnimationSettings();

  // Skip animation if image is priority or reduced motion is preferred
  useEffect(() => {
    if (priority || prefersReducedMotion) {
      setIsLoaded(true);
    }
  }, [priority, prefersReducedMotion]);

  // Image container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: transitionDuration,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  // Hover effect variants
  const hoverVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.03,
      transition: { 
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <motion.div 
      className={`relative overflow-hidden ${containerClassName}`}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={containerVariants}
      {...(withHoverEffect && {
        whileHover: "hover",
        whileTap: { scale: 0.98 },
        variants: hoverVariants,
        onHoverStart: () => setIsHovered(true),
        onHoverEnd: () => setIsHovered(false)
      })}
    >
      {/* Skeleton loader */}
      {!isLoaded && !priority && !prefersReducedMotion && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
      
      <Image
        src={src}
        alt={alt}
        className={`transition-all duration-300 ${className}`}
        onLoad={() => setIsLoaded(true)}
        priority={priority}
        {...props}
      />
      
      {/* Optional hover overlay */}
      {withHoverEffect && (
        <motion.div 
          className="absolute inset-0 bg-primary-500/10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
}
