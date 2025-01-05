//src/components/composite/navigation/nav-menu/index.tsx
// Path: src/components/composite/navigation/nav-menu/index.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import type { NavMenuProps, NavMenuItem } from "./types";

type ListItemProps = {
  item: NavMenuItem;
  showIcons?: boolean;
  className?: string;
};

function renderContent(props: ListItemProps) {
  const { className, item, showIcons } = props;
  return (
    <div
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none",
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
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const content = renderContent(props);
  const { item } = props;

  if (!item.href) {
    return (
      <button
        onClick={item.onClick}
        className={cn(
          "w-full text-left",
          item.disabled && "cursor-not-allowed",
        )}
        disabled={item.disabled}
      >
        {content}
      </button>
    );
  }

  if (item.isExternal) {
    return React.createElement("a", {
      href: item.href,
      target: "_blank",
      rel: "noopener noreferrer",
      className: cn("cursor-pointer", item.disabled && "cursor-not-allowed"),
      children: content,
    });
  }

  return React.createElement(Link, {
    href: item.href,
    className: cn("cursor-pointer", item.disabled && "cursor-not-allowed"),
    children: content,
  });
};

function NavMenu(props: NavMenuProps) {
  const {
    trigger,
    items,
    side = "bottom",
    align = "center",
    defaultOpen,
    showIcons = true,
    className,
    ...rest
  } = props;

  return React.createElement(
    NavigationMenu,
    {
      defaultValue: defaultOpen ? "visible" : undefined,
      className,
      ...rest,
    },
    React.createElement(
      NavigationMenuList,
      null,
      React.createElement(
        NavigationMenuItem,
        null,
        React.createElement(NavigationMenuTrigger, null, trigger),
        React.createElement(
          NavigationMenuContent,
          null,
          React.createElement(
            "ul",
            {
              className: "grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2",
            },
            items.map((item) =>
              React.createElement(
                "li",
                { key: item.label },
                React.createElement(ListItem, { item, showIcons }),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

// Add named export alongside default export
export { NavMenu };
export default NavMenu;
