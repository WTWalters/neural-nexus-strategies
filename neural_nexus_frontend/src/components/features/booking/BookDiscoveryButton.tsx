// src/components/features/booking/BookDiscoveryButton.tsx
// Path: src/components/features/booking/BookDiscoveryButton.tsx
"use client";
import dynamic from "next/dynamic";
import { Button, ButtonProps } from "@/components/ui/button";

const Script = dynamic(() => import("next/script"), {
  ssr: false,
});

export function BookDiscoveryButton(props: ButtonProps) {
  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        onError={(e) => console.error("Calendly script failed to load:", e)}
        onLoad={() => console.log("Calendly script loaded successfully")}
      />
      <Button
        {...props}
        onClick={() => {
          try {
            window.open(
              "https://calendly.com/wwalters-neuralnexusstrategies",
              "_blank",
            );
          } catch (error) {
            console.error("Failed to open Calendly:", error);
          }
        }}
      >
        Book Discovery Call
      </Button>
    </>
  );
}
