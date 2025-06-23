// Path: neural_nexus_frontend/src/components/marketing/home/GeometricPatterns.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useClientOnly, motionVariants } from "@/lib/animations";

// Add interface for the point structure
interface Point {
  x: number;
  y: number;
  size: number;
  timing: number;
}

// Update the points array type
const INITIAL_POINTS: Point[] = [
  { x: 20, y: 20, size: 1.5, timing: 3 },
  { x: 40, y: 30, size: 1.2, timing: 2.5 },
  { x: 60, y: 20, size: 1.8, timing: 3.5 },
  { x: 80, y: 40, size: 1.3, timing: 2.8 },
  { x: 30, y: 60, size: 1.6, timing: 3.2 },
  { x: 50, y: 70, size: 1.4, timing: 2.7 },
  { x: 70, y: 60, size: 1.7, timing: 3.3 },
  { x: 90, y: 80, size: 1.5, timing: 2.9 },
];

export default function GeometricPatterns() {
  const isClient = useClientOnly();

  // Add types to createPath parameters
  const createPath = (startPoint: Point, endPoint: Point) => {
    const distance = Math.sqrt(
      Math.pow(endPoint.x - startPoint.x, 2) +
        Math.pow(endPoint.y - startPoint.y, 2),
    );

    if (distance > 30) return null;

    return `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`;
  };

  if (!isClient) {
    return <div className="absolute inset-0 h-screen overflow-hidden" />;
  }

  return (
    <div className="absolute inset-0 h-screen overflow-hidden">
      <svg
        className="w-full h-full opacity-[0.15]"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Draw connections */}
        {INITIAL_POINTS.map((point, i) =>
          INITIAL_POINTS.slice(i + 1).map((endpoint, j) => {
            const path = createPath(point, endpoint);
            if (!path) return null;

            return (
              <motion.path
                key={`line-${i}-${j}`}
                d={path}
                stroke="currentColor"
                className="text-primary"
                strokeWidth="0.1"
                {...motionVariants.pathDraw}
                animate={{
                  pathLength: [0, 1],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: i + j,
                  ease: "easeInOut",
                }}
              />
            );
          }),
        )}

        {/* Draw points */}
        {INITIAL_POINTS.map((point, index) => (
          <motion.circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r={point.size * 0.3}
            className="fill-primary"
            initial={{ opacity: 0.2 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: point.timing,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
