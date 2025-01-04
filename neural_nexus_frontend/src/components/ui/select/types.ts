// File: src/components/ui/select/types.ts
import { BaseProps } from "@/components/_lib/types";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    BaseProps {
  /**
   * Error state or message
   */
  error?: boolean | string;

  /**
   * Size variant of the select
   */
  size?: "sm" | "default" | "lg";

  /**
   * Whether the select is in a loading state
   */
  isLoading?: boolean;

  /**
   * Icon to display before the select content
   */
  startIcon?: React.ReactNode;

  /**
   * Custom icon to replace the default chevron
   */
  customChevron?: React.ReactNode;

  /**
   * Options for the select
   */
  options?: SelectOption[];

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Whether to show a clear option
   */
  isClearable?: boolean;

  /**
   * Group options by a specific key
   */
  groups?: {
    [key: string]: SelectOption[];
  };
}
