// Path: neural_nexus_frontend/src/components/ui/textarea/index.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import type { TextareaProps } from "./types";

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, size = "default", ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

export type { TextareaProps };
Textarea.displayName = "Textarea";
