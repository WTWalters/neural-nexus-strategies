"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FormSubmitProps } from "./types";

const alignmentClasses = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export const FormSubmit = ({
  submitText = "Submit",
  resetText = "Reset",
  showReset = false,
  isSubmitting = false,
  onReset,
  align = "left",
  stackOnMobile = true,
  className,
  ...props
}: FormSubmitProps) => {
  return (
    <div
      className={cn(
        "flex gap-4",
        stackOnMobile ? "flex-col sm:flex-row" : "flex-row",
        alignmentClasses[align],
        className,
      )}
      {...props}
    >
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : submitText}
      </Button>

      {showReset && (
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          disabled={isSubmitting}
        >
          {resetText}
        </Button>
      )}
    </div>
  );
};

export default FormSubmit;
