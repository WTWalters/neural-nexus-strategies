import * as React from "react";
import Link from "next/link";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionLinkProps extends Omit<ButtonProps, 'asChild'> {
  href: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Unified component for button-styled links
 * Always uses the correct Button + asChild + Link pattern
 */
export const ActionLink = React.forwardRef<
  HTMLAnchorElement,
  ActionLinkProps
>(({ href, external = false, children, className, ...buttonProps }, ref) => {
  const linkProps = external
    ? {
        target: "_blank" as const,
        rel: "noopener noreferrer" as const,
      }
    : {};

  return (
    <Button
      {...buttonProps}
      className={cn(className)}
      asChild
    >
      <Link href={href} ref={ref} {...linkProps}>
        {children}
      </Link>
    </Button>
  );
});

ActionLink.displayName = "ActionLink";