// src/components/contact/ContactInfo.tsx
export default function ContactInfo() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Get in Touch
            </h2>

            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Location
                    </h3>
                    <p className="text-gray-600">
                        Virtual Office - Northern Colorado
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Email
                    </h3>
                    <a
                        href="mailto:whitney.walters@gmail.com"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        whitney.walters@gmail.com
                    </a>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Hours
                    </h3>
                    <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 5:00 PM MST
                    </p>
                </div>
            </div>
        </div>
    );
}
