import { BaseProps } from "@/components/_lib/types";
import { ReactNode } from "react";

export interface NavMenuItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  description?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: NavMenuItem[];
  isExternal?: boolean;
}

export interface NavMenuProps extends BaseProps {
  /**
   * The trigger element that opens the menu
   */
  trigger: ReactNode;

  /**
   * Array of menu items
   */
  items: NavMenuItem[];

  /**
   * Side the menu should appear from
   */
  side?: "top" | "right" | "bottom" | "left";

  /**
   * Alignment of the menu
   */
  align?: "start" | "center" | "end";

  /**
   * Whether the menu is open by default
   */
  defaultOpen?: boolean;

  /**
   * Whether to show icons in menu items
   */
  showIcons?: boolean;
}
