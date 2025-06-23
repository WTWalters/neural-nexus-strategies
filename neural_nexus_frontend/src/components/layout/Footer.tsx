// Path: neural_nexus_frontend/src/components/layout/Footer.tsx
"use client";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { NavLink } from "@/components/ui/nav-link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <NavLink
                  href="/services/fractional-cdo"
                  variant="footer"
                >
                  Fractional CDO
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/services/data-strategy"
                  variant="footer"
                >
                  Data Strategy
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/services/ai-readiness"
                  variant="footer"
                >
                  AI Readiness
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <NavLink href="/blog" variant="footer">
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink href="/case-studies" variant="footer">
                  Case Studies
                </NavLink>
              </li>
              <li>
                <NavLink href="/resources" variant="footer">
                  Downloads
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <NavLink href="/about" variant="footer">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink href="/contact" variant="footer">
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink href="/careers" variant="footer">
                  Careers
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Logo width={30} height={30} showAnimation={false} />
            <p>
              &copy; {new Date().getFullYear()} Neural Nexus Strategies. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
