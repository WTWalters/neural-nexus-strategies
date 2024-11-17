// src/components/layout/Footer.tsx
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-gray-50 border-t">
            <div className="container mx-auto px-4 py-12 md:py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Link
                            href="/"
                            className="text-xl font-bold text-primary-600"
                        >
                            Neural Nexus
                        </Link>
                        <p className="text-sm text-gray-600 mt-2">
                            Transforming organizations through strategic data
                            leadership and AI innovation.
                        </p>
                        <div className="space-y-2 pt-4">
                            <a
                                href="mailto:contact@neuralnexus.ai"
                                className="text-sm text-gray-600 hover:text-primary-600 block"
                            >
                                contact@neuralnexus.ai
                            </a>
                            <a
                                href="tel:+1234567890"
                                className="text-sm text-gray-600 hover:text-primary-600 block"
                            >
                                (123) 456-7890
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                            Services
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/services/fractional-cdo"
                                    className="text-sm text-gray-600 hover:text-primary-600"
                                >
                                    Fractional CDO
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services/data-strategy"
                                    className="text-sm text-gray-600 hover:text-primary-600"
                                >
                                    Data Strategy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services/ai-readiness"
                                    className="text-sm text-gray-600 hover:text-primary-600"
                                >
                                    AI Readiness
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services/consulting"
                                    className="text-sm text-gray-600 hover:text-primary-600"
                                >
                                    Consulting Services
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/case-studies"
                                    className="text-sm text-gray-600 hover:text-primary-600"
                                >
                                    Case Studies
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-sm text-gray-600 hover:text-primary-600"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/resources"
                                    className="text-sm text-gray-600 hover:text-primary-600"
                                >
                                    Resource Library
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/newsletter"
                                    className="text-sm text-gray-600 hover:text-primary-600"
                                >
                                    Newsletter
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm text-gray-600 hover:text-primary-600"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-gray-600 hover:text-primary-600"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/careers"
                                    className="text-sm text-gray-600 hover:text-primary-600"
                                >
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/book-call"
                                    className="text-sm text-gray-600 hover:text-primary-600"
                                >
                                    Book a Call
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-gray-200 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-sm text-gray-600">
                            © {new Date().getFullYear()} Neural Nexus
                            Strategies. All rights reserved.
                        </div>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link
                                href="/privacy"
                                className="text-sm text-gray-600 hover:text-primary-600"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-sm text-gray-600 hover:text-primary-600"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/cookies"
                                className="text-sm text-gray-600 hover:text-primary-600"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
