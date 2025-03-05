// Path: neural_nexus_frontend/src/components/ui/logo.tsx
"use client";

import { useEffect } from "react";

interface LogoProps {
  width?: number;
  height?: number;
  showAnimation?: boolean;
  className?: string;
}

export function Logo({
  width = 40,
  height = 40,
  showAnimation = true,
  className = "",
}: LogoProps) {
  // Load animation CSS if animation is enabled
  useEffect(() => {
    if (showAnimation) {
      // Check if the CSS is already loaded
      const existingLink = document.querySelector('link[href="/assets/logo-animation.css"]');
      
      if (!existingLink) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/assets/logo-animation.css";
        document.head.appendChild(link);
        
        return () => {
          // Only remove if this component added it
          if (document.querySelector('link[href="/assets/logo-animation.css"]') === link) {
            document.head.removeChild(link);
          }
        };
      }
    }
  }, [showAnimation]);

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded ${className}`}
    >
      {/* Light blue background */}
      <rect width="100" height="100" fill="#ADD8E6" />
      
      {/* Stylized N */}
      <path 
        d="M20 80 L40 20 L60 80 L80 20" 
        stroke="#FFFFFF" 
        strokeWidth="6" 
        fill="none" 
        className={showAnimation ? "n-path" : ""}
      />
      
      {/* Neural connection line */}
      <line 
        x1="40" 
        y1="20" 
        x2="30" 
        y2="40" 
        stroke="#FFFFFF" 
        strokeWidth="2" 
        opacity="0.7" 
        className={showAnimation ? "n-line" : ""}
      />
    </svg>
  );
}
