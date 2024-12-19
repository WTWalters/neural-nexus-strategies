// src/components/composite/navigation/nav-menu/types.ts
import { NavigationMenuProps as RadixNavigationMenuProps } from "@radix-ui/react-navigation-menu";

export interface NavMenuItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  description?: string;
  isExternal?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface NavMenuProps
  extends Omit<RadixNavigationMenuProps, "children"> {
  trigger: React.ReactNode;
  items: NavMenuItem[];
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  defaultOpen?: boolean;
  showIcons?: boolean;
  className?: string;
}
