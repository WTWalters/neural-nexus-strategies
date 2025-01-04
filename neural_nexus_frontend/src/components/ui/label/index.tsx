// Path: src/components/ui/label/index.tsx
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Asterisk } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LabelProps } from "./types";

const Label = React.forwardRef;
React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps >
    ((
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
      const sizeVariants = {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      } as const;

      const stateStyles = {
        error: "text-destructive",
        disabled: "text-muted-foreground cursor-not-allowed",
        default: "text-foreground",
      } as const;

      const currentState = error ? "error" : disabled ? "disabled" : "default";

      return (
        <LabelPrimitive.Root
          ref={ref}
          className={cn(
            "inline-flex items-center gap-1",
            sizeVariants[size],
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
                error ? "text-destructive" : "text-destructive",
              )}
              aria-hidden="true"
            >
              <Asterisk className="h-3 w-3" />
            </span>
          )}
        </LabelPrimitive.Root>
      );
    });

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
