// File: src/components/ui/select/index.tsx
import * as React from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SelectProps } from "./types";

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      error,
      size = "default",
      isLoading,
      startIcon,
      customChevron,
      options = [],
      placeholder,
      isClearable,
      groups,
      disabled,
      ...props
    },
    ref,
  ) => {
    // Size variants
    const sizeClasses = {
      sm: "h-8 px-2 text-sm",
      default: "h-10 px-3 text-base",
      lg: "h-12 px-4 text-lg",
    };

    // Icon wrapper classes
    const iconClass =
      "absolute flex items-center justify-center text-[var(--colors-select-icon)]";
    const startIconClass = cn(iconClass, "left-3");
    const chevronClass = cn(iconClass, "right-3");

    // Generate options list
    const renderOptions = () => {
      const items = [];

      // Add placeholder if provided
      if (placeholder) {
        items.push(
          <option key="placeholder" value="" disabled>
            {placeholder}
          </option>,
        );
      }

      // Add clear option if enabled
      if (isClearable) {
        items.push(
          <option key="clear" value="">
            Clear selection
          </option>,
        );
      }

      // Add grouped options
      if (groups) {
        Object.entries(groups).forEach(([groupLabel, groupOptions]) => {
          items.push(
            <optgroup key={groupLabel} label={groupLabel}>
              {groupOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </optgroup>,
          );
        });
      }
      // Add ungrouped options
      else {
        options.forEach((option) => {
          items.push(
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>,
          );
        });
      }

      return items;
    };

    return (
      <div className={cn("relative", startIcon && "pl-8", className)}>
        {/* Start Icon */}
        {startIcon && <div className={startIconClass}>{startIcon}</div>}

        {/* Select Element */}
        <select
          ref={ref}
          disabled={disabled || isLoading}
          className={cn(
            // Base styles
            "w-full rounded-md appearance-none",
            "bg-[var(--colors-select-background)]",
            "text-[var(--colors-select-foreground)]",
            "border border-[var(--colors-select-border)]",

            // States
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-[var(--colors-select-focus)]",
            "focus:ring-offset-2",

            // Error state
            error && "border-[var(--colors-form-error)]",

            // Disabled state
            (disabled || isLoading) && [
              "opacity-50",
              "cursor-not-allowed",
              "bg-[var(--colors-select-disabled)]",
            ],

            // Padding adjustments
            startIcon && "pl-8",
            "pr-10", // Space for chevron

            // Size variant
            sizeClasses[size],
          )}
          {...props}
        >
          {renderOptions()}
        </select>

        {/* Loading Spinner or Chevron */}
        <div className={chevronClass}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            customChevron || <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </div>
    );
  },
);

Select.displayName = "Select"; // Add this line for better dev tools integration

export { Select, type SelectProps };
