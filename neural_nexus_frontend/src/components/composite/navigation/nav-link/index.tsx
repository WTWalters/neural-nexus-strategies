"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavLinkProps } from "./types";

const variantClasses = {
  default: "text-foreground hover:text-foreground/80",
  subtle: "text-muted-foreground hover:text-foreground",
  ghost: "text-muted-foreground/60 hover:text-muted-foreground",
};

export const NavLink = ({
  href,
  label,
  isActive,
  variant = "default",
  icon,
  isExternal,
  description,
  className,
  ...props
}: NavLinkProps) => {
  const pathname = usePathname();
  const isCurrentPath = isActive ?? pathname === href;

  const content = (
    <>
      <div className="flex items-center gap-2">
        {icon && <span className="h-4 w-4">{icon}</span>}
        <span>{label}</span>
        {isExternal && <ExternalLink className="h-3 w-3 ml-1" />}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </>
  );

  const linkClasses = cn(
    "flex flex-col gap-1 rounded-md px-3 py-2 transition-colors",
    variantClasses[variant],
    isCurrentPath && "bg-accent text-accent-foreground",
    "hover:bg-accent/50",
    className,
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClasses} {...props}>
      {content}
    </Link>
  );
};

export default NavLink;
