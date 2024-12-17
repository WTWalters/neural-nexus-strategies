import { BaseProps } from "@/components/_lib/types";

export interface FormSectionProps extends BaseProps {
  /**
   * Title of the form section
   */
  title: string;

  /**
   * Optional description text
   */
  description?: string;

  /**
   * Whether to show a visual separator above the section
   */
  divider?: boolean;

  /**
   * Optional custom spacing between fields
   */
  fieldSpacing?: "tight" | "normal" | "loose";
}
