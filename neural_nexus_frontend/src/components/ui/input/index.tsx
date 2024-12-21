// File: src/components/ui/input/index.tsx
import * as React from "react";
import { Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InputProps } from "./types";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error,
      type,
      size = "default",
      isLoading,
      startIcon,
      endIcon,
      isClearable,
      onClear,
      disabled,
      ...props
    },
    ref,
  ) => {
    // Handle clear button click
    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onClear?.();
    };

    // Size variants
    const sizeClasses = {
      sm: "h-8 px-2 text-sm",
      default: "h-10 px-3 text-base",
      lg: "h-12 px-4 text-lg",
    };

    // Icon wrapper classes
    const iconClass =
      "flex items-center justify-center text-[var(--colors-input-icon)]";
    const startIconClass = cn(iconClass, "ml-2 mr-1");
    const endIconClass = cn(iconClass, "ml-1 mr-2");

    return (
      <div
        className={cn(
          "relative flex items-center rounded-md",
          "bg-[var(--colors-input-background)]",
          "border border-[var(--colors-input-border)]",
          error && "border-[var(--colors-form-error)]",
          "focus-within:ring-2 focus-within:ring-[var(--colors-input-focus)] focus-within:ring-offset-2",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
      >
        {/* Start Icon */}
        {startIcon && <div className={startIconClass}>{startIcon}</div>}

        {/* Input Element */}
        <input
          type={type}
          className={cn(
            // Base styles
            "w-full bg-transparent",
            "text-[var(--colors-input-foreground)]",
            "placeholder:text-[var(--colors-input-placeholder)]",
            // Remove default styles
            "border-0 focus:outline-none focus:ring-0",
            // Size variant
            sizeClasses[size],
            // Padding adjustments for icons
            startIcon && "pl-0",
            (endIcon || isLoading || isClearable) && "pr-0",
          )}
          ref={ref}
          disabled={disabled || isLoading}
          data-error={error ? "true" : undefined}
          {...props}
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className={endIconClass}>
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}

        {/* Clear Button */}
        {isClearable && props.value && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              endIconClass,
              "hover:text-[var(--colors-input-foreground)]",
              disabled && "cursor-not-allowed",
            )}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* End Icon */}
        {endIcon && !isLoading && !(isClearable && props.value) && (
          <div className={endIconClass}>{endIcon}</div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
