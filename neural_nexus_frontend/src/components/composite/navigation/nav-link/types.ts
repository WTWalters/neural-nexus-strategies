import { BaseProps } from "@/components/_lib/types";

export interface NavLinkProps extends BaseProps {
  /**
   * The URL the link points to
   */
  href: string;

  /**
   * The text or content to display
   */
  label: string | React.ReactNode;

  /**
   * Whether the link is currently active
   */
  isActive?: boolean;

  /**
   * Visual variant of the link
   */
  variant?: "default" | "subtle" | "ghost";

  /**
   * Optional icon to display before the label
   */
  icon?: React.ReactNode;

  /**
   * Whether this is an external link
   */
  isExternal?: boolean;

  /**
   * Optional description or subtitle
   */
  description?: string;
}
