//src/components/composite/navigation/nav-menu/index.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import type { NavMenuProps, NavMenuItem } from "./types";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    item: NavMenuItem;
    showIcons?: boolean;
  }
>(({ className, item, showIcons, ...props }, ref) => {
  const content = (
    <div
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        item.disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {showIcons && item.icon && <span className="h-4 w-4">{item.icon}</span>}
        <span className="text-sm font-medium leading-none">{item.label}</span>
        {item.isExternal && <ExternalLink className="h-3 w-3" />}
      </div>
      {item.description && (
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {item.description}
        </p>
      )}
    </div>
  );

  if (item.href) {
    if (item.isExternal) {
      return (
        <a
          ref={ref}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "cursor-pointer",
            item.disabled && "cursor-not-allowed",
          )}
          {...props}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        ref={ref as any}
        href={item.href}
        className={cn("cursor-pointer", item.disabled && "cursor-not-allowed")}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref as any}
      onClick={item.onClick}
      className={cn("w-full text-left", item.disabled && "cursor-not-allowed")}
      disabled={item.disabled}
      {...props}
    >
      {content}
    </button>
  );
});
ListItem.displayName = "ListItem";

export function NavMenu({
  trigger,
  items,
  side = "bottom",
  align = "center",
  defaultOpen,
  showIcons = true,
  className,
  ...props
}: NavMenuProps) {
  return (
    <NavigationMenu
      defaultValue={defaultOpen ? "visible" : undefined}
      className={className}
      {...props}
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{trigger}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2">
              {items.map((item) => (
                <li key={item.label}>
                  <ListItem item={item} showIcons={showIcons} />
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavMenu;
