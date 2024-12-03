// src/components/layout/Header.tsx
"use client";
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full bg-white border-b border-gray-200">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="font-bold text-xl">
                        Neural Nexus Strategies
                    </Link>
                    <div className="space-x-6">
                        <Link href="/" className="hover:text-blue-600">
                            Home
                        </Link>
                        <Link href="/services" className="hover:text-blue-600">
                            Services
                        </Link>
                        <Link href="/blog" className="hover:text-blue-600">
                            Blog
                        </Link>
                        <Link href="/about" className="hover:text-blue-600">
                            About
                        </Link>
                        <Link href="/contact" className="hover:text-blue-600">
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
