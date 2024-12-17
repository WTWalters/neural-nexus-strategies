import { BaseProps } from "@/components/_lib/types";

export interface FormSubmitProps extends BaseProps {
  /**
   * Text to display on the submit button
   */
  submitText?: string;

  /**
   * Text to display on the reset button
   */
  resetText?: string;

  /**
   * Whether to show the reset button
   */
  showReset?: boolean;

  /**
   * Whether the form is currently submitting
   */
  isSubmitting?: boolean;

  /**
   * Callback when reset is clicked
   */
  onReset?: () => void;

  /**
   * Position of the buttons
   */
  align?: "left" | "center" | "right";

  /**
   * Whether to stack buttons vertically on mobile
   */
  stackOnMobile?: boolean;
}
