// File: src/components/ui/label/types.ts
import * as LabelPrimitive from "@radix-ui/react-label";
import { BaseProps } from "@/components/_lib/types";

export interface LabelProps
  extends BaseProps,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  /**
   * Whether the label should be visually hidden but still accessible to screen readers
   */
  srOnly?: boolean;

  /**
   * Whether the label is required
   */
  required?: boolean;

  /**
   * Whether the label is in an error state
   */
  error?: boolean;

  /**
   * Whether the label is disabled
   */
  disabled?: boolean;

  /**
   * The size variant of the label
   */
  size?: "sm" | "default" | "lg";
}
