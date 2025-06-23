import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'header' | 'footer' | 'inline';
  active?: boolean;
  external?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Unified navigation link component with consistent styling and active states
 */
export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ 
    href, 
    children, 
    variant = 'header', 
    active, 
    external = false, 
    className,
    onClick,
    ...props 
  }, ref) => {
    const pathname = usePathname();
    const isActive = active ?? pathname === href;

    const baseStyles = "transition-colors duration-200";
    
    const variantStyles = {
      header: cn(
        "text-muted-foreground hover:text-primary",
        isActive && "text-primary font-medium"
      ),
      footer: cn(
        "text-gray-300 hover:text-primary-400",
        isActive && "text-primary-400"
      ),
      inline: cn(
        "text-current hover:text-primary underline-offset-4 hover:underline",
        isActive && "text-primary underline"
      ),
    };

    const linkProps = external
      ? {
          target: "_blank" as const,
          rel: "noopener noreferrer" as const,
        }
      : {};

    return (
      <Link
        href={href}
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        onClick={onClick}
        {...linkProps}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

NavLink.displayName = "NavLink";