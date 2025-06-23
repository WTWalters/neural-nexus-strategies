// Path: neural_nexus_frontend/src/components/layout/Header.tsx
"use client";
import Link from "next/link";
import { tracking } from "@/lib/tracking";
import { Logo } from "@/components/ui/logo";
import { NavLink } from "@/components/ui/nav-link";

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
            className="flex items-center gap-3 font-bold text-xl text-primary"
          >
            <Logo width={40} height={40} showAnimation={true} />
            <span>Neural Nexus Strategies</span>
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
              <NavLink
                key={link.href}
                href={link.href}
                variant="header"
              >
                {link.text}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
