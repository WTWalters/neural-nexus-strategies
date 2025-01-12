// Path: neural_nexus_frontend/src/components/layout/Header.tsx
"use client";
import Link from "next/link";
import { tracking } from "@/lib/tracking";

export default function Header() {
  return (
    <header className="w-full bg-background border-b border-muted">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            onClick={() =>
              tracking.trackEvent("navigation_click", {
                from: window.location.pathname,
                to: "/",
                component: "header_logo",
              })
            }
            className="font-bold text-xl text-primary"
          >
            Neural Nexus Strategies
          </Link>
          <div className="space-x-6">
            {[
              { href: "/", text: "Home" },
              { href: "/services", text: "Services" },
              { href: "/services/fractional-cdo", text: "Fractional CDO" },
              { href: "/blog", text: "Blog" },
              { href: "/about", text: "About" },
              { href: "/contact", text: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
