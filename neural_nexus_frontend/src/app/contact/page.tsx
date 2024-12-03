// src/app/contact/page.tsx
import ContactForm from "@/components/contact/ContactForm";
import FAQ from "@/components/contact/FAQ";
import ContactInfo from "@/components/contact/ContactInfo";

export default function ContactPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Contact Us
                </h1>
                <p className="text-lg text-gray-600">
                    Have questions? We'd love to hear from you.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <ContactInfo />
                <ContactForm />
            </div>

            <div className="mt-16">
                <FAQ />
            </div>
        </div>
    );
}
