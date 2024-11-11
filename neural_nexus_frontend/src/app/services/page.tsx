import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Brain, BarChart3, Cpu } from "lucide-react";

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <section className="bg-primary-50 py-20 md:py-32">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary-900 font-display">
                            Our Services
                        </h1>
                        <p className="text-xl mb-8 text-primary-700 max-w-3xl mx-auto">
                            Empowering your business with cutting-edge data
                            strategies and AI-driven solutions.
                        </p>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center text-2xl mb-2">
                                        <Brain className="mr-2 h-6 w-6 text-primary-600" />
                                        Fractional CDO Services
                                    </CardTitle>
                                    <CardDescription>
                                        Expert leadership to drive your data
                                        initiatives forward.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside mb-4 text-primary-700">
                                        <li>Strategic data leadership</li>
                                        <li>Data governance implementation</li>
                                        <li>Data-driven culture cultivation</li>
                                        <li>Technology stack optimization</li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Link
                                        href="/services/fractional-cdo"
                                        passHref
                                        legacyBehavior
                                    >
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Learn More
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center text-2xl mb-2">
                                        <BarChart3 className="mr-2 h-6 w-6 text-success-500" />
                                        Data Strategy Consulting
                                    </CardTitle>
                                    <CardDescription>
                                        Comprehensive planning for data-driven
                                        success.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside mb-4 text-primary-700">
                                        <li>Data maturity assessment</li>
                                        <li>Customized roadmap development</li>
                                        <li>Data architecture design</li>
                                        <li>Analytics and BI strategy</li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Learn More
                                    </Button>
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center text-2xl mb-2">
                                        <Cpu className="mr-2 h-6 w-6 text-innovation-500" />
                                        AI Readiness Assessment
                                    </CardTitle>
                                    <CardDescription>
                                        Prepare your organization for AI
                                        integration.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside mb-4 text-primary-700">
                                        <li>AI opportunity identification</li>
                                        <li>Infrastructure evaluation</li>
                                        <li>Skill gap analysis</li>
                                        <li>AI adoption roadmap</li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Learn More
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="bg-primary-900 text-primary-50 py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">
                            Ready to Elevate Your Data Strategy?
                        </h2>
                        <p className="mb-8 text-xl max-w-2xl mx-auto">
                            Book a discovery call with our experts and start
                            your journey to data excellence today.
                        </p>
                        <Button
                            variant="secondary"
                            size="lg"
                            className="text-lg px-8 py-6"
                        >
                            Book Discovery Call
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
}
