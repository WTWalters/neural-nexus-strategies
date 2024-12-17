"use client";

import { cn } from "@/lib/utils";
import type { FormSectionProps } from "./types";

const spacingClasses = {
  tight: "space-y-2",
  normal: "space-y-4",
  loose: "space-y-6",
};

export const FormSection = ({
  title,
  description,
  divider = true,
  fieldSpacing = "normal",
  className,
  children,
  ...props
}: FormSectionProps) => {
  return (
    <div
      className={cn("py-6", divider && "border-t border-border", className)}
      {...props}
    >
      <div className="mb-6">
        <h3 className="text-lg font-medium leading-6 text-foreground">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className={cn(spacingClasses[fieldSpacing])}>{children}</div>
    </div>
  );
};

export default FormSection;
