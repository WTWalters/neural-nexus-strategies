// File: src/components/ui/input/types.ts
// Path: neural_nexus_frontend/src/components/ui/input/types.ts
import { BaseProps } from "@/components/_lib/types";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    BaseProps {
  /**
   * Error state or message
   */
  error?: boolean | string;

  /**
   * Size variant of the input
   */
  size?: "sm" | "default" | "lg";

  /**
   * Whether to display a loading state
   */
  isLoading?: boolean;

  /**
   * Whether to show an icon at the start of the input
   */
  startIcon?: React.ReactNode;

  /**
   * Whether to show an icon at the end of the input
   */
  endIcon?: React.ReactNode;

  /**
   * Whether to show a clear button
   */
  isClearable?: boolean;

  /**
   * Callback when the clear button is clicked
   */
  onClear?: () => void;
}
