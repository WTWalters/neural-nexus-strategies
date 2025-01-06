// Path: neural_nexus_frontend/src/components/marketing/services/service-breadcrumb.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ServiceBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function ServiceBreadcrumb({
  items,
  className,
}: ServiceBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-2 text-sm", className)}
    >
      <Link
        href="/"
        className="text-gray-500 hover:text-primary-600 transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>

      <ChevronRight className="h-4 w-4 text-gray-400" />

      <Link
        href="/services"
        className="text-gray-500 hover:text-primary-600 transition-colors"
      >
        Services
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-gray-500 hover:text-primary-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
