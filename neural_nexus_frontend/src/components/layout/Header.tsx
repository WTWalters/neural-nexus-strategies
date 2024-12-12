// src/components/layout/Header.tsx
"use client";
import Link from "next/link";
import { tracking } from "@/lib/tracking";

// Define handleNavClick only once
const handleNavClick = (destination: string) => {
  tracking.trackEvent("navigation_click", {
    from: window.location.pathname,
    to: destination,
    component: "header",
  });
};

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            onClick={() => handleNavClick("/")}
            className="font-bold text-xl"
          >
            Neural Nexus Strategies
          </Link>
          <div className="space-x-6">
            <Link
              href="/"
              onClick={() => handleNavClick("/")}
              className="hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              href="/services"
              onClick={() => handleNavClick("/services")}
              className="hover:text-blue-600"
            >
              Services
            </Link>
            <Link
              href="/blog"
              onClick={() => handleNavClick("/blog")}
              className="hover:text-blue-600"
            >
              Blog
            </Link>
            <Link
              href="/about"
              onClick={() => handleNavClick("/about")}
              className="hover:text-blue-600"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => handleNavClick("/contact")}
              className="hover:text-blue-600"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
