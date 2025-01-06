// src/app/test/page.tsx
// Path: src/app/test/page.tsx
import dynamic from "next/dynamic";

const GeometricPatterns = dynamic(
  () => import("@/components/marketing/home/GeometricPatterns"),
  { ssr: false },
);

export default function TestPage() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-white to-gray-50">
      <div className="relative border-2 border-dashed border-red-500 min-h-screen">
        <GeometricPatterns />
        <div className="relative z-10 p-8">
          <h1 className="text-2xl font-bold mb-4">Geometric Patterns Test</h1>
          <p className="text-gray-600">
            Testing geometric patterns visibility and animations.
          </p>
        </div>
      </div>
    </div>
  );
}
