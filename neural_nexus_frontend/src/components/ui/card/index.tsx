// File: src/components/ui/card/index.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from "./types";

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, clickable, disableHover, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-[var(--colors-card-background)] text-[var(--colors-card-foreground)] border-[var(--colors-card-border)] shadow-sm",
          clickable && "cursor-pointer",
          !disableHover && "hover:bg-[var(--colors-card-hover)]",
          className,
        )}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, compact, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col space-y-1.5",
          compact ? "p-4" : "p-6",
          className,
        )}
        {...props}
      />
    );
  },
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, preserveLineBreaks, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          "text-2xl font-semibold leading-none tracking-tight text-[var(--colors-card-foreground)]",
          preserveLineBreaks && "whitespace-pre-line",
          className,
        )}
        {...props}
      />
    );
  },
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, lineClamp, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "text-sm text-[var(--colors-muted-foreground)]",
        lineClamp && `line-clamp-${lineClamp}`,
        className,
      )}
      {...props}
    />
  );
});
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, noPadding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(noPadding ? "pt-0" : "p-6 pt-0", className)}
        {...props}
      />
    );
  },
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, align = "center", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex p-6 pt-0",
          {
            "justify-start": align === "start",
            "justify-center": align === "center",
            "justify-end": align === "end",
          },
          className,
        )}
        {...props}
      />
    );
  },
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
