// src/app/test/page.tsx
"use client";

import GeometricPatterns from "@/components/marketing/home/GeometricPatterns";

export default function TestPage() {
  return (
    <div className="min-h-screen relative bg-white">
      <GeometricPatterns />
      <div className="relative z-10 p-8">
        <h1>Test Page</h1>
      </div>
    </div>
  );
}
