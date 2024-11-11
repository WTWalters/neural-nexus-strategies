import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Brain, CheckCircle, ArrowRight, BarChart3, Users } from "lucide-react";

export default function FractionalCDOPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <section className="bg-primary-50 py-20 md:py-32">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary-900 font-display">
                                Fractional CDO Services
                            </h1>
                            <p className="text-xl mb-8 text-primary-700">
                                Expert data leadership to drive your initiatives
                                forward, without the full-time commitment.
                            </p>
                            <Button size="lg" className="text-lg px-8 py-6">
                                Schedule a Consultation
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6 text-primary-800">
                                    Why Choose Our Fractional CDO Services?
                                </h2>
                                <p className="text-lg text-primary-700 mb-6">
                                    In today's data-driven world, having expert
                                    leadership for your data initiatives is
                                    crucial. Our Fractional CDO services provide
                                    you with seasoned data professionals who can
                                    guide your organization's data strategy,
                                    governance, and implementation on a
                                    flexible, as-needed basis.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Access to top-tier data leadership expertise",
                                        "Cost-effective alternative to full-time CDO",
                                        "Tailored strategies aligned with your business goals",
                                        "Rapid implementation of data best practices",
                                        "Scalable support as your data needs evolve",
                                    ].map((benefit, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start"
                                        >
                                            <CheckCircle className="h-6 w-6 text-success-500 mr-2 flex-shrink-0 mt-1" />
                                            <span className="text-primary-700">
                                                {benefit}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <Card className="bg-primary-100 border-primary-200">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-2xl">
                                            <Brain className="mr-2 h-6 w-6 text-primary-600" />
                                            Our Approach
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-primary-700 mb-4">
                                            We integrate seamlessly with your
                                            team, providing strategic guidance
                                            and hands-on expertise to elevate
                                            your data capabilities. Our
                                            fractional CDOs bring a wealth of
                                            experience across industries and
                                            technologies.
                                        </p>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Learn About Our Methodology
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-primary-900 text-primary-50 py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center">
                            Key Focus Areas
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    title: "Data Strategy Development",
                                    icon: Brain,
                                },
                                {
                                    title: "Governance Implementation",
                                    icon: CheckCircle,
                                },
                                {
                                    title: "Analytics & BI Optimization",
                                    icon: BarChart3,
                                },
                                {
                                    title: "Data Culture Cultivation",
                                    icon: Users,
                                },
                            ].map((area, index) => (
                                <Card
                                    key={index}
                                    className="bg-primary-800 border-primary-700"
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-xl text-primary-50">
                                            <area.icon className="mr-2 h-6 w-6 text-primary-200" />
                                            {area.title}
                                        </CardTitle>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">
                            Ready to Transform Your Data Strategy?
                        </h2>
                        <p className="mb-8 text-xl max-w-2xl mx-auto text-primary-700">
                            Let's discuss how our Fractional CDO services can
                            drive your organization's data initiatives forward.
                        </p>
                        <Button size="lg" className="text-lg px-8 py-6">
                            Book Your Discovery Call
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
}
