// Path: neural_nexus_frontend/src/components/about/ImageTest.tsx
"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function ImageTest() {
  useEffect(() => {
    console.log("=====================================");
    console.log("ImageTest component mounted");
    console.log("Environment:", process.env.NODE_ENV);
    console.log("=====================================");
  }, []);

  const handleImageError = (e: any) => {
    console.error("=====================================");
    console.error("Image Error Details:");
    console.error("Event:", e);
    console.error("=====================================");
  };

  return (
    <div
      className="p-4 border-4 border-red-500 m-4"
      style={{ backgroundColor: "lightgray" }}
    >
      <h2 className="text-xl font-bold mb-4">Image Test Component</h2>
      <p>If you can see this text, the component is rendering</p>
      <div className="relative w-[400px] h-[400px] bg-blue-200">
        <p>This is the image container</p>
        <Image
          src="https://res.cloudinary.com/dkjqgwlob/image/upload/v1736727174/JaySwartz2017_bqznnf.jpg"
          alt="Jay Swartz"
          fill
          sizes="400px"
          style={{ objectFit: "cover" }}
          onError={handleImageError}
          onLoad={() => console.log("Image loaded successfully")}
        />
      </div>
    </div>
  );
}
