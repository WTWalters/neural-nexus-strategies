// Path: neural_nexus_frontend/src/components/about/CloudinaryTest.tsx
"use client";
import { CldImage } from "next-cloudinary";
import React, { useEffect } from "react";

export default function CloudinaryTest() {
  useEffect(() => {
    console.log("CloudinaryTest component mounted");
    console.log(
      "Cloudinary cloud name:",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    );
  }, []);

  return (
    <div className="p-4 border-4 border-red-500">
      <h2>Cloudinary Test Component</h2>
      <div className="relative w-[400px] h-[400px]">
        <CldImage
          width={400}
          height={400}
          src={"v1736727174/JaySwartz2017_bqznnf"}
          alt="Test image"
          onError={(e: any) => {
            console.error("Cloudinary Image Error:", e);
          }}
          onLoad={() => {
            console.log("Cloudinary Image Loaded Successfully");
          }}
        />
      </div>
      <p className="mt-4">Status: Loading Cloudinary Image...</p>
    </div>
  );
}
