// GeometricPatterns.tsx
"use client";
import { motion } from "framer-motion";

export default function GeometricPatterns() {
  return (
    <div className="absolute inset-0 h-screen">
      {/* Circle */}
      <div className="absolute top-20 right-20 w-40 h-40 bg-red-500 rounded-full" />
      {/* Square */}
      <div className="absolute bottom-40 left-40 w-32 h-32 bg-blue-500" />
      {/* Triangle */}
      <div className="absolute top-40 left-1/3 w-0 h-0 border-l-[50px] border-r-[50px] border-b-[100px] border-transparent border-b-green-500" />
    </div>
  );
}
