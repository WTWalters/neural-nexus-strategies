// src/components/marketing/home/AnimatedMetrics.tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

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
  const isInView = useInView(ref, {
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12"
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          className="text-center p-6 rounded-lg bg-white/50 backdrop-blur-sm shadow-xl"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
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
