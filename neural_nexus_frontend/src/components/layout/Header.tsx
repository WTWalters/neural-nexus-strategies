// Path: neural_nexus_frontend/src/components/layout/Header.tsx
// src/components/layout/Header.tsx
"use client";
import Link from "next/link";
import { tracking } from "@/lib/tracking";
import { Logo } from "@/components/ui/logo";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", text: "Home" },
    {
      href: "/services",
      text: "Services",
      subItems: [
        { href: "/services/data-strategy-workshop", text: "Data Strategy" },
        { href: "/services/fractional-cdo", text: "Fractional CDO" },
        { href: "/services/accelerator", text: "AI Data Accelerator" },
      ],
    },
    { href: "/services/accelerator#flywheel", text: "AI Velocity Flywheel" },
    { href: "/blog", text: "Blog" },
    { href: "/about", text: "About" },
    { href: "/contact", text: "Contact" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="w-full bg-white border-b border-muted sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            onClick={() =>
              tracking.trackEvent("navigation_click", {
                from: pathname,
                to: "/",
                component: "header_logo",
              })
            }
            className="flex items-center gap-3 font-bold text-xl text-primary"
          >
            <Logo width={40} height={40} showAnimation={true} />
            <span className="hidden sm:inline">Neural Nexus Strategies</span>
            <span className="sm:hidden">NNS</span>
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={`text-muted-foreground hover:text-primary transition-colors ${
                    isActive(link.href) ? "text-primary font-medium" : ""
                  }`}
                  onClick={() =>
                    tracking.trackEvent("navigation_click", {
                      from: pathname,
                      to: link.href,
                      component: "header_nav",
                    })
                  }
                >
                  {link.text}
                </Link>

                {/* Dropdown for Services */}
                {link.subItems && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      {link.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() =>
                            tracking.trackEvent("navigation_click", {
                              from: pathname,
                              to: subItem.href,
                              component: "header_dropdown",
                            })
                          }
                        >
                          {subItem.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
