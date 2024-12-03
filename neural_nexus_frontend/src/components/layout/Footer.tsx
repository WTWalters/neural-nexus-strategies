// src/components/layout/Footer.tsx
"use client";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/services/fractional-cdo"
                                    className="hover:text-blue-400"
                                >
                                    Fractional CDO
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services/data-strategy"
                                    className="hover:text-blue-400"
                                >
                                    Data Strategy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services/ai-readiness"
                                    className="hover:text-blue-400"
                                >
                                    AI Readiness
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/blog"
                                    className="hover:text-blue-400"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/case-studies"
                                    className="hover:text-blue-400"
                                >
                                    Case Studies
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/resources"
                                    className="hover:text-blue-400"
                                >
                                    Downloads
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-blue-400"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-blue-400"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/careers"
                                    className="hover:text-blue-400"
                                >
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Contact</h3>
                        <p>Email: contact@neuralnexus.ai</p>
                        <p>Phone: (555) 123-4567</p>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p>
                        &copy; {new Date().getFullYear()} Neural Nexus
                        Strategies. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
