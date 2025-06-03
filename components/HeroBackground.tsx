"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useAnimationSettings } from "./AnimationProvider";
import {
  getThemeAwareColor,
  getRgbaColor,
  PRIMARY_COLORS_RGB,
  SECONDARY_COLORS_RGB,
} from "../utils/colors";

// Tech-themed elements to display
const TECH_ELEMENTS = [
  { type: "code", symbol: "</>", size: 20 },
  { type: "code", symbol: "{ }", size: 18 },
  { type: "code", symbol: "=>", size: 16 },
  { type: "code", symbol: "()=>{}", size: 16 },
  { type: "tech", symbol: "⚛️", size: 20 }, // React
  { type: "tech", symbol: "🌐", size: 20 }, // Web
  { type: "tech", symbol: "🖥️", size: 20 }, // Computer
  { type: "tech", symbol: "📱", size: 20 }, // Mobile
  { type: "tech", symbol: "☁️", size: 20 }, // Cloud
  { type: "tech", symbol: "🔄", size: 20 }, // API
  { type: "tech", symbol: "🗄️", size: 20 }, // Database
  { type: "icon", symbol: "📊", size: 20 }, // Analytics
];

// Abstract shapes for network nodes
const NODE_TYPES = [
  { shape: "circle", size: 4 },
  { shape: "square", size: 4 },
  { shape: "diamond", size: 4 },
];

interface TechElement {
  x: number;
  y: number;
  symbol: string;
  type: string;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

interface Node {
  x: number;
  y: number;
  shape: string;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  connections: number[];
  interacted: boolean;
}

interface HeroBackgroundProps {
  enabled?: boolean;
}

export default function HeroBackground({
  enabled = true,
}: HeroBackgroundProps) {
  // Track if this is the first load
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  // Track user interaction
  const [hasInteracted, setHasInteracted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { prefersReducedMotion, isMobile } = useAnimationSettings();

  // Animation frame reference for cleanup
  const animationFrameRef = useRef<number | null>(null);

  // Mouse position for interaction
  const mouseRef = useRef({ x: 0, y: 0 });
  const interactionRadiusRef = useRef(150);

  // Track scroll position to detect user interaction
  const scrollRef = useRef(0);

  // References for our animation elements
  const techElementsRef = useRef<TechElement[]>([]);
  const nodesRef = useRef<Node[]>([]);

  // Check for dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Helper function to get a position in one of the corners
  const getCornerPosition = useCallback((canvas: HTMLCanvasElement) => {
    const corner = Math.floor(Math.random() * 4);
    const cornerSize = canvas.width * 0.2; // 20% of canvas size for corner area
    let x, y;

    switch (corner) {
      case 0: // Top-left corner
        x = Math.random() * cornerSize;
        y = Math.random() * cornerSize;
        break;
      case 1: // Top-right corner
        x = canvas.width - Math.random() * cornerSize;
        y = Math.random() * cornerSize;
        break;
      case 2: // Bottom-right corner
        x = canvas.width - Math.random() * cornerSize;
        y = canvas.height - Math.random() * cornerSize;
        break;
      case 3: // Bottom-left corner
        x = Math.random() * cornerSize;
        y = canvas.height - Math.random() * cornerSize;
        break;
    }

    return { x, y };
  }, []);

  // Initialize tech elements
  const initTechElements = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reduce element count on first load for subtle effect
    const elementCount = isMobile ? 6 : isFirstLoad ? 10 : 20;
    const elements: TechElement[] = [];

    // Define a safe zone for the main content (section-container)
    const safeZoneX = canvas.width * 0.05;
    const safeZoneY = canvas.height * 0.1;
    const safeZoneWidth = canvas.width * 0.9; // 90% of canvas width
    const safeZoneHeight = canvas.height * 0.8; // 80% of canvas height

    // Helper function to check if a position is in the safe zone
    const isInSafeZone = (x: number, y: number) => {
      return (
        x > safeZoneX &&
        x < safeZoneX + safeZoneWidth &&
        y > safeZoneY &&
        y < safeZoneY + safeZoneHeight
      );
    };

    for (let i = 0; i < elementCount; i++) {
      const techElement =
        TECH_ELEMENTS[Math.floor(Math.random() * TECH_ELEMENTS.length)];

      // Generate position outside the safe zone
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;

      // If position is in safe zone, regenerate until it's outside
      let attempts = 0;
      while (isInSafeZone(x, y) && attempts < 10) {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
        attempts++;
      }

      elements.push({
        x,
        y,
        symbol: techElement.symbol,
        type: techElement.type,
        size: techElement.size * (Math.random() * 0.5 + 0.75),
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: isDarkMode
          ? Math.random() * 0.5 + 0.3
          : Math.random() * 0.4 + 0.1,
        color: isDarkMode
          ? getRgbaColor(PRIMARY_COLORS_RGB, "400", Math.random() * 0.7 + 0.3)
          : getRgbaColor(PRIMARY_COLORS_RGB, "600", Math.random() * 0.6 + 0.2),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      });
    }

    techElementsRef.current = elements;
  }, [isMobile, isDarkMode]);

  // Initialize network nodes
  const initNetworkNodes = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodeCount = isMobile ? 10 : 25;
    const nodes: Node[] = [];

    // Define a safe zone for the main content (section-container)
    const safeZoneX = canvas.width * 0.05;
    const safeZoneY = canvas.height * 0.1;
    const safeZoneWidth = canvas.width * 0.9; // 90% of canvas width
    const safeZoneHeight = canvas.height * 0.8; // 80% of canvas height

    // Helper function to check if a position is in the safe zone
    const isInSafeZone = (x: number, y: number) => {
      return (
        x > safeZoneX &&
        x < safeZoneX + safeZoneWidth &&
        y > safeZoneY &&
        y < safeZoneY + safeZoneHeight
      );
    };

    for (let i = 0; i < nodeCount; i++) {
      const nodeType =
        NODE_TYPES[Math.floor(Math.random() * NODE_TYPES.length)];

      // Create connections to random other nodes
      const connectionCount = Math.floor(Math.random() * 3) + 1;
      const connections: number[] = [];

      for (let j = 0; j < connectionCount; j++) {
        const targetNode = Math.floor(Math.random() * nodeCount);
        if (targetNode !== i && !connections.includes(targetNode)) {
          connections.push(targetNode);
        }
      }

      // Generate position outside the safe zone
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;

      // If position is in safe zone, regenerate until it's outside
      let attempts = 0;
      while (isInSafeZone(x, y) && attempts < 10) {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
        attempts++;
      }

      nodes.push({
        x,
        y,
        shape: nodeType.shape,
        size: nodeType.size * (Math.random() * 0.5 + 0.75),
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        color: isDarkMode
          ? getRgbaColor(SECONDARY_COLORS_RGB, "400", Math.random() * 0.7 + 0.3)
          : getRgbaColor(
              SECONDARY_COLORS_RGB,
              "600",
              Math.random() * 0.6 + 0.2
            ),
        connections,
        interacted: false,
      });
    }

    nodesRef.current = nodes;
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

    // Mouse position for interaction
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;
    const interactionRadius = interactionRadiusRef.current;

    // Draw connections first (so they appear behind nodes)
    nodesRef.current.forEach((node, index) => {
      // Check for mouse interaction
      const dx = mouseX - node.x;
      const dy = mouseY - node.y;
      const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

      // Apply interaction effects
      if (distanceToMouse < interactionRadius) {
        node.interacted = true;
        // Slightly push nodes away from cursor
        const pushFactor = 0.2 * (1 - distanceToMouse / interactionRadius);
        node.x += dx * -pushFactor;
        node.y += dy * -pushFactor;
      } else {
        node.interacted = false;
      }

      // Draw connections
      node.connections.forEach((targetIndex) => {
        if (targetIndex < nodesRef.current.length) {
          const targetNode = nodesRef.current[targetIndex];
          const dx = node.x - targetNode.x;
          const dy = node.y - targetNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Only draw connections within a certain distance
          if (distance < 200) {
            ctx.beginPath();

            // Enhanced connection if either node is interacted with
            if (node.interacted || targetNode.interacted) {
              ctx.strokeStyle = isDarkMode
                ? getRgbaColor(
                    PRIMARY_COLORS_RGB,
                    "400",
                    0.4 * (1 - distance / 200)
                  )
                : getRgbaColor(
                    PRIMARY_COLORS_RGB,
                    "600",
                    0.4 * (1 - distance / 200)
                  );
              ctx.lineWidth = 1;
            } else {
              ctx.strokeStyle = isDarkMode
                ? getRgbaColor(
                    PRIMARY_COLORS_RGB,
                    "500",
                    0.15 * (1 - distance / 200)
                  )
                : getRgbaColor(
                    PRIMARY_COLORS_RGB,
                    "800",
                    0.15 * (1 - distance / 200)
                  );
              ctx.lineWidth = 0.5;
            }

            ctx.moveTo(node.x, node.y);
            ctx.lineTo(targetNode.x, targetNode.y);
            ctx.stroke();
          }
        }
      });
    });

    // Update and draw nodes
    nodesRef.current.forEach((node) => {
      // Update position
      node.x += node.speedX;
      node.y += node.speedY;

      // Bounce off edges with slight randomization
      if (node.x <= node.size || node.x >= canvas.width - node.size) {
        node.speedX = -node.speedX * 0.95;
        node.speedX += (Math.random() - 0.5) * 0.01; // Add small random variation
      }
      if (node.y <= node.size || node.y >= canvas.height - node.size) {
        node.speedY = -node.speedY * 0.95;
        node.speedY += (Math.random() - 0.5) * 0.01; // Add small random variation
      }

      // Keep nodes within canvas
      node.x = Math.max(node.size, Math.min(canvas.width - node.size, node.x));
      node.y = Math.max(node.size, Math.min(canvas.height - node.size, node.y));

      // Draw node with different shapes
      ctx.beginPath();

      // Enhanced appearance if interacted with
      if (node.interacted) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = isDarkMode
          ? getRgbaColor(PRIMARY_COLORS_RGB, "400", 0.8)
          : getRgbaColor(PRIMARY_COLORS_RGB, "600", 0.8);
      } else {
        ctx.shadowBlur = 0;
      }

      if (node.shape === "circle") {
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      } else if (node.shape === "square") {
        ctx.rect(
          node.x - node.size,
          node.y - node.size,
          node.size * 2,
          node.size * 2
        );
      } else if (node.shape === "diamond") {
        ctx.moveTo(node.x, node.y - node.size);
        ctx.lineTo(node.x + node.size, node.y);
        ctx.lineTo(node.x, node.y + node.size);
        ctx.lineTo(node.x - node.size, node.y);
        ctx.closePath();
      }

      ctx.fillStyle = node.interacted
        ? isDarkMode
          ? getRgbaColor(PRIMARY_COLORS_RGB, "400", 0.8)
          : getRgbaColor(PRIMARY_COLORS_RGB, "600", 0.8)
        : node.color;
      ctx.fill();

      // Reset shadow
      ctx.shadowBlur = 0;
    });

    // Update and draw tech elements
    techElementsRef.current.forEach((element) => {
      // Update position
      element.x += element.speedX;
      element.y += element.speedY;
      element.rotation += element.rotationSpeed;

      // Check for mouse interaction
      const dx = mouseX - element.x;
      const dy = mouseY - element.y;
      const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

      // Apply interaction effects
      let interactionOpacity = element.opacity;
      let interactionSize = element.size;

      if (distanceToMouse < interactionRadius) {
        // Enhance opacity and size when mouse is near
        interactionOpacity = element.opacity * 2;
        interactionSize = element.size * 1.2;

        // Slightly push elements away from cursor
        const pushFactor = 0.1 * (1 - distanceToMouse / interactionRadius);
        element.x += dx * -pushFactor;
        element.y += dy * -pushFactor;
      }

      // Wrap around edges
      if (element.x < -50) element.x = canvas.width + 50;
      if (element.x > canvas.width + 50) element.x = -50;
      if (element.y < -50) element.y = canvas.height + 50;
      if (element.y > canvas.height + 50) element.y = -50;

      // Save context state
      ctx.save();

      // Apply rotation and translation
      ctx.translate(element.x, element.y);
      ctx.rotate(element.rotation);

      // Draw tech element
      if (
        element.type === "code" ||
        element.type === "tech" ||
        element.type === "icon"
      ) {
        ctx.font = `${interactionSize}px monospace`;
        ctx.fillStyle = isDarkMode
          ? getRgbaColor(PRIMARY_COLORS_RGB, "400", interactionOpacity)
          : getRgbaColor(PRIMARY_COLORS_RGB, "600", interactionOpacity);

        // Add glow effect for interacted elements
        if (distanceToMouse < interactionRadius) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = isDarkMode
            ? getRgbaColor(PRIMARY_COLORS_RGB, "400", 0.8)
            : getRgbaColor(PRIMARY_COLORS_RGB, "600", 0.8);
        }

        // Center text
        const textMetrics = ctx.measureText(element.symbol);
        const textWidth = textMetrics.width;
        const textHeight = interactionSize;
        ctx.fillText(element.symbol, -textWidth / 2, textHeight / 3);
      }

      // Restore context state
      ctx.restore();
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

    // Reinitialize elements after resize
    initTechElements();
    initNetworkNodes();
  }, [initTechElements, initNetworkNodes]);

  // Track mouse position and detect user interaction
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // Mark that user has interacted
      if (isFirstLoad && !hasInteracted) {
        setHasInteracted(true);
        // Wait a bit before showing more elements
        setTimeout(() => setIsFirstLoad(false), 800);
      }
    },
    [isFirstLoad, hasInteracted]
  );

  // Handle scroll events to detect user interaction
  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;

    // Detect if user has scrolled
    if (
      isFirstLoad &&
      !hasInteracted &&
      Math.abs(currentScroll - scrollRef.current) > 10
    ) {
      setHasInteracted(true);
      // Wait a bit before showing more elements
      setTimeout(() => setIsFirstLoad(false), 800);
    }

    scrollRef.current = currentScroll;
  }, [isFirstLoad, hasInteracted]);

  // Set up canvas and animation
  useEffect(() => {
    if (!canvasRef.current) return;

    // Set canvas dimensions
    handleResize();

    // Initialize elements
    initTechElements();
    initNetworkNodes();

    // Start animation if enabled
    if (!prefersReducedMotion && enabled) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    // Add event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Visibility API to pause when tab is not visible
    document.addEventListener("visibilitychange", () => {
      setIsVisible(!document.hidden);
    });

    // After 5 seconds, gradually reveal more elements even without interaction
    const timer = setTimeout(() => {
      if (isFirstLoad) {
        setIsFirstLoad(false);
      }
    }, 5000);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [
    animate,
    handleResize,
    handleMouseMove,
    initTechElements,
    initNetworkNodes,
    prefersReducedMotion,
    enabled,
  ]);

  // Update animation when dark mode changes
  useEffect(() => {
    initTechElements();
    initNetworkNodes();
  }, [isDarkMode, initTechElements, initNetworkNodes]);

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
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
