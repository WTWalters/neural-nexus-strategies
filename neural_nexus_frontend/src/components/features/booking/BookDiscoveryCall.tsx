// src/components/features/booking/BookDiscoveryButton.tsx
"use client";

import { useEffect } from "react";
import { Button, ButtonProps } from "@/components/ui/button";

interface BookDiscoveryButtonProps extends Omit<ButtonProps, 'onClick'> {
  calendlyUrl?: string;
}

export function BookDiscoveryButton({
  calendlyUrl = "https://calendly.com/neuralnexus/discovery",
  children = "Book Discovery Call",
  ...props
}: BookDiscoveryButtonProps) {
  text = "Book Discovery Call",
  calendlyUrl = "https://calendly.com/neuralnexus/discovery",
  variant = "default",
  size = "lg",
  className,
}: BookDiscoveryButtonProps) {
  useEffect(() => {
    const loadCalendly = async () => {
      const head = document.querySelector("head");
      if (!document.getElementById("calendly-script")) {
        const script = document.createElement("script");
        script.id = "calendly-script";
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        head?.appendChild(script);
      }
    };
    loadCalendly();
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    }
  };

  return (
    <Button
      onClick={openCalendly}
      variant={variant}
      size={size}
      className={className}
    >
      {text}
    </Button>
  );
}
