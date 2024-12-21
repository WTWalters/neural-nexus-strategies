//File: src/components/ui/label/index.tsx
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Asterisk } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LabelProps } from "./types";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(
  (
    {
      className,
      children,
      srOnly,
      required,
      error,
      disabled,
      size = "default",
      ...props
    },
    ref,
  ) => {
    // Base styles
    const baseStyles = "inline-flex items-center gap-1";

    // Size variants
    const sizeClasses = {
      sm: "text-xs",
      default: "text-sm",
      lg: "text-base",
    };

    // State styles
    const stateStyles = {
      error: "text-[var(--colors-label-error)]",
      disabled: "text-[var(--colors-label-disabled)] cursor-not-allowed",
      default: "text-[var(--colors-label-foreground)]",
    };

    // Determine state style
    let currentState = "default";
    if (error) currentState = "error";
    if (disabled) currentState = "disabled";

    return (
      <LabelPrimitive.Root
        ref={ref}
        className={cn(
          baseStyles,
          sizeClasses[size],
          stateStyles[currentState],
          "font-medium",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          srOnly && "sr-only",
          className,
        )}
        {...props}
      >
        {children}
        {required && (
          <span
            className={cn(
              "text-[0.75em]",
              error
                ? "text-[var(--colors-label-error)]"
                : "text-[var(--colors-label-required)]",
            )}
            aria-hidden="true"
          >
            <Asterisk className="h-3 w-3" />
          </span>
        )}
      </LabelPrimitive.Root>
    );
  },
);

Label.displayName = "Label";

export { Label };
