// Centralized animation utilities and constants

// Animation duration constants
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  logo: 2000,
  metrics: 2000,
} as const;

// Common easing functions
export const EASING = {
  easeInOut: "ease-in-out",
  easeOut: "ease-out",
  easeIn: "ease-in",
  spring: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
} as const;

// Framer Motion variants for common animations
export const motionVariants = {
  // Fade in from bottom
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  
  // Scale up on hover
  scaleOnHover: {
    whileHover: { scale: 1.05 },
    transition: { type: "spring", stiffness: 300 },
  },
  
  // Stagger children animations
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  
  // Path drawing animation
  pathDraw: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 0.3 },
    transition: { duration: 2, ease: "easeInOut" },
  },
  
  // Pulse animation
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
} as const;

// CSS-in-JS animation styles (for components that need CSS animations)
export const cssAnimations = {
  // Logo path drawing animation
  logoPath: {
    strokeDasharray: "200",
    strokeDashoffset: "200",
    animation: "logo-draw 2s ease-in-out forwards",
  },
  
  // Logo line pulse animation  
  logoLine: {
    animation: "logo-pulse 3s infinite",
  },
} as const;

// Keyframes for CSS animations (to be used with CSS-in-JS or global CSS)
export const keyframes = {
  "logo-draw": {
    "to": { strokeDashoffset: "0" },
  },
  
  "logo-pulse": {
    "0%, 100%": { opacity: "0.7" },
    "50%": { opacity: "0.3" },
  },
} as const;

// Hook for consistent hydration handling
export function useClientOnly(delay: number = 0): boolean {
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return isClient;
}

// Import React for the hook
import React from "react";