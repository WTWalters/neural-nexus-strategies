// src/components/marketing/home/GeometricPatterns.tsx
"use client";

import { motion } from "framer-motion";

export default function GeometricPatterns() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-70 z-0">
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 bg-primary-300 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-40 left-1/4 w-16 h-16 bg-primary-200 rotate-45"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-24 h-24 bg-secondary-300 rotate-45"
        animate={{ scale: [1, 1.2, 1], rotate: 45 }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-1/3 w-20 h-20 bg-secondary-100 rounded-full"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-28 h-28 bg-primary-50 rotate-12"
        animate={{ rotate: [12, 45, 12] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </div>
  );
}
