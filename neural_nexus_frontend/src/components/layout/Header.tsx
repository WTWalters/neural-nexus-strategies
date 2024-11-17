// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="fixed top-0 w-full border-b bg-white bg-opacity-95 backdrop-blur-sm z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center">
                    <Link
                        href="/"
                        className="text-xl font-bold text-primary-600"
                    >
                        Neural Nexus
                    </Link>
                    <nav className="hidden md:flex ml-8 space-x-6">
                        <Link
                            href="/services"
                            className="text-sm font-medium text-gray-600 hover:text-primary-600"
                        >
                            Services
                        </Link>
                        <Link
                            href="/case-studies"
                            className="text-sm font-medium text-gray-600 hover:text-primary-600"
                        >
                            Case Studies
                        </Link>
                        <Link
                            href="/resources"
                            className="text-sm font-medium text-gray-600 hover:text-primary-600"
                        >
                            Resources
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/contact">Contact</Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="/book-call">Book Discovery Call</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
