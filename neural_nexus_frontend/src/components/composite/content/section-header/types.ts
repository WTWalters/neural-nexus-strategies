import { BaseProps } from "@/components/_lib/types";
import { ReactNode } from "react";

export interface SectionHeaderProps extends BaseProps {
  /**
   * Main title of the section
   */
  title: string;

  /**
   * Optional subtitle or description
   */
  subtitle?: string;

  /**
   * Optional actions to display on the right
   */
  actions?: ReactNode;

  /**
   * Size variant of the header
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether to show a divider below the header
   */
  divider?: boolean;

  /**
   * Alignment of the header content
   */
  align?: "left" | "center" | "right";
}
