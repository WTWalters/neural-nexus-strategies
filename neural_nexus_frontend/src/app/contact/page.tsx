// src/app/contact/page.tsx
import dynamic from "next/dynamic";
import ContactInfo from "@/components/contact/ContactInfo";
import { BookDiscoveryButton } from "@/components/features/booking/BookDiscoveryButton";

// Dynamically import client components with no SSR
const ContactForm = dynamic(() => import("@/components/contact/ContactForm"), {
  ssr: false,
});

const FAQ = dynamic(() => import("@/components/contact/FAQ"), {
  ssr: false,
});

// Use a different name for the config export
export const fetchCache = "force-dynamic";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-6">
          Have questions? We'd love to hear from you.
        </p>
        <BookDiscoveryButton size="lg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ContactInfo />
        <div className="min-h-[200px]">
          <ContactForm />
        </div>
      </div>

      <div className="mt-16">
        <FAQ />
      </div>
    </div>
  );
}
