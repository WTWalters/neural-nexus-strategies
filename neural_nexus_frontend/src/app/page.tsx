// src/app/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BlogSearch } from "@/components/blog/BlogSearch";

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-white to-primary-50">
            {/* Hero Section */}
            <section className="pt-24 pb-16 md:pt-32 md:pb-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Transform Your Organization with{" "}
                            <span className="text-primary-600">
                                Expert Data Leadership
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Strategic data leadership and AI innovation for
                            forward-thinking enterprises. Get expert guidance
                            without the full-time executive cost.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <Link href="/book-call">
                                    Book Discovery Call
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/services">Explore Services</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-primary-600 mb-3">
                                Fractional CDO Services
                            </h3>
                            <p className="text-gray-600">
                                Expert data leadership without the cost of a
                                full-time executive.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-primary-600 mb-3">
                                Data Strategy Consulting
                            </h3>
                            <p className="text-gray-600">
                                Comprehensive data strategy development and
                                implementation.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-primary-600 mb-3">
                                AI Readiness
                            </h3>
                            <p className="text-gray-600">
                                Prepare your organization for successful AI
                                adoption.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
