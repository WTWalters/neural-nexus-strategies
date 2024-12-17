"use client";

import { cn } from "@/lib/utils";
import type { SectionHeaderProps } from "./types";

const sizeClasses = {
  sm: {
    title: "text-lg font-semibold",
    subtitle: "text-sm",
    wrapper: "space-y-1",
  },
  md: {
    title: "text-2xl font-bold",
    subtitle: "text-base",
    wrapper: "space-y-2",
  },
  lg: {
    title: "text-3xl font-bold",
    subtitle: "text-lg",
    wrapper: "space-y-3",
  },
};

const alignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export const SectionHeader = ({
  title,
  subtitle,
  actions,
  size = "md",
  divider = false,
  align = "left",
  className,
  ...props
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "w-full",
        divider && "border-b border-border pb-4",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex items-start justify-between gap-4",
          alignmentClasses[align],
        )}
      >
        <div
          className={cn(
            sizeClasses[size].wrapper,
            actions && align === "center" && "flex-1",
          )}
        >
          <h2
            className={cn(
              sizeClasses[size].title,
              "text-foreground tracking-tight",
            )}
          >
            {title}
          </h2>

          {subtitle && (
            <p
              className={cn(
                sizeClasses[size].subtitle,
                "text-muted-foreground",
              )}
            >
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div
            className={cn(
              "flex items-center gap-4",
              align === "center" && "flex-1 justify-end",
            )}
          >
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
