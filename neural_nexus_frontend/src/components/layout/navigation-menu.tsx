// src/components/layout/navigation-menu.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert } from "@/components/ui/alert";
import { useServices } from "@/hooks/useServices";

export default function NavigationMenu() {

  const pathname = usePathname();
  const { services, isLoading, error } = useServices();


  return (
    <NavigationMenuPrimitive.Root>
      <NavigationMenuPrimitive.List className="flex items-center gap-6">
        <NavigationMenuPrimitive.Item>
          <Link
            href="/services"
            className={cn(
              "group flex items-center gap-1 hover:text-primary-600",
              pathname === "/services" && "text-primary-600",
            )}
          >
            Services
            <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
          </Link>
          <NavigationMenuPrimitive.Content className="absolute bg-white p-4 shadow-lg rounded-lg min-w-[240px]">
            {isLoading ? (
              <div className="p-4 text-center">Loading services...</div>
            ) : error ? (
              <Alert variant="destructive" className="mb-4">
                {error}
              </Alert>
            ) : services && services.length > 0 ? (
              <>
                {services.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <div className="font-medium">{service.name}</div>
                    {service.description && (
                      <div className="text-sm text-gray-600 mt-1">
                        {service.description}
                      </div>
                    )}
                  </Link>
                ))}
                <div className="border-t mt-2 pt-2">
                  <Link
                    href="/services"
                    className="block p-3 text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    View All Services →
                  </Link>
                </div>
              </>
            ) : (
              <div className="p-4 text-center">No services available</div>
            )}
          </NavigationMenuPrimitive.Content>
        </NavigationMenuPrimitive.Item>
        {/* ... rest of your navigation items ... */}
      </NavigationMenuPrimitive.List>
    </NavigationMenuPrimitive.Root>
  );
}
