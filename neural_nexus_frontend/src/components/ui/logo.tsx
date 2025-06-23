// Path: neural_nexus_frontend/src/components/ui/logo.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useClientOnly, cssAnimations } from "@/lib/animations";

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
  const pathname = usePathname();
  const [key, setKey] = useState<number>(0);
  const isClient = useClientOnly();
  
  // Reset animation when path changes
  useEffect(() => {
    if (showAnimation && isClient) {
      setKey(prev => prev + 1);
    }
  }, [pathname, showAnimation, isClient]);

  // Don't render animations on server to prevent hydration mismatches
  const shouldAnimate = showAnimation && isClient;

  return (
    <svg 
      key={key} // Key changes force React to remount the component
      width={width} 
      height={height} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded ${className}`}
    >
      {/* Blue background */}
      <rect width="100" height="100" fill="#2563eb" />
      
      {/* Stylized N */}
      <path 
        d="M30 80 L30 20 L70 80 L70 20" 
        stroke="#FFFFFF" 
        strokeWidth="6" 
        fill="none" 
        style={shouldAnimate ? cssAnimations.logoPath : undefined}
      />
      
      {/* Neural connection */}
      <line 
        x1="30" 
        y1="50" 
        x2="70" 
        y2="50" 
        stroke="#FFFFFF" 
        strokeWidth="2" 
        opacity="0.7" 
        style={shouldAnimate ? cssAnimations.logoLine : undefined}
      />
    </svg>
  );
}
