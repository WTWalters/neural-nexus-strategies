// src/components/contact/FAQ.tsx
import Link from "next/link";

export default function FAQ() {
    const faqs = [
        {
            question: "What services do you offer?",
            answer: (
                <>
                    We provide{" "}
                    <Link
                        href="/services/fractional-cdo"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Fractional CDO Services
                    </Link>
                    ,{" "}
                    <Link
                        href="/services/data-strategy"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Data Strategy Consulting
                    </Link>
                    , and{" "}
                    <Link
                        href="/services/ai-readiness"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        AI Readiness Assessments
                    </Link>{" "}
                    to help organizations leverage their data assets
                    effectively.
                </>
            ),
        },
        {
            question: "How does the virtual consultation process work?",
            answer: "We begin with a discovery call to understand your needs, followed by a detailed assessment of your current data landscape. All meetings are conducted virtually via secure video conferencing.",
        },
        {
            question: "What industries do you serve?",
            answer: "We work with organizations across various industries, including healthcare, manufacturing, financial services, and technology companies of all sizes.",
        },
        {
            question: "How long does a typical engagement last?",
            answer: "Engagement lengths vary based on your needs. Fractional CDO services are typically ongoing relationships, while strategy consulting projects usually range from 2-6 months.",
        },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Frequently Asked Questions
            </h2>
            <div className="space-y-6">
                {faqs.map((faq, index) => (
                    <div key={index}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {faq.question}
                        </h3>
                        <div className="text-gray-600">{faq.answer}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
