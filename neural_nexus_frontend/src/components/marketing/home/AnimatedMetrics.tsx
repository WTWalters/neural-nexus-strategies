// src/components/marketing/home/AnimatedMetrics.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { useClientOnly, motionVariants } from "@/lib/animations";

const metrics = [
  {
    value: 40,
    symbol: "%",
    label: "Average Cost Reduction",
    suffix: true,
    color: "text-primary-600", // Add color
  },
  {
    value: 3,
    symbol: "x",
    label: "Faster Decision Making",
    suffix: false,
    color: "text-secondary-600",
  },
  {
    value: 85,
    symbol: "%",
    label: "Data Quality Improvement",
    suffix: true,
    color: "text-success-600",
  },
];

export default function AnimatedMetrics() {
  const ref = useRef(null);
  const isClient = useClientOnly();
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  // Prevent hydration mismatches by not rendering animations on server
  if (!isClient) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm shadow-xl"
          >
            <div className={`text-5xl font-bold ${metric.color}`}>
              {metric.value}{metric.suffix ? metric.symbol : ""}
            </div>
            <p className="text-gray-700 mt-2 font-medium">{metric.label}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12"
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm shadow-xl"
          {...motionVariants.scaleOnHover}
        >
          <div className={`text-5xl font-bold ${metric.color}`}>
            {isInView && (
              <CountUp
                end={metric.value}
                duration={2}
                suffix={metric.suffix ? metric.symbol : ""}
                prefix={!metric.suffix ? metric.symbol : ""}
              />
            )}
          </div>
          <p className="text-gray-700 mt-2 font-medium">{metric.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
