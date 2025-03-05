// Path: neural_nexus_frontend/src/components/layout/Header.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { tracking } from "@/lib/tracking";
import { useEffect } from "react";

export default function Header() {
  // Load the CSS for logo animations when component mounts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/logo-animation.css";
    document.head.appendChild(link);
    
    return () => {
      // Cleanup on component unmount
      document.head.removeChild(link);
    };
  }, []);

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
            <div className="w-10 h-10">
              <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="rounded">
                {/* Light blue background */}
                <rect width="100" height="100" fill="#ADD8E6" />
                {/* Stylized N */}
                <path d="M20 80 L40 20 L60 80 L80 20" stroke="#FFFFFF" stroke-width="6" fill="none" className="n-path" />
                {/* Neural connection line */}
                <line x1="40" y1="20" x2="30" y2="40" stroke="#FFFFFF" stroke-width="2" opacity="0.7" className="n-line" />
              </svg>
            </div>
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
