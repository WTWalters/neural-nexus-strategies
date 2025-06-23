// Path: src/app/(marketing)/resources/[slug]/not-found.tsx
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function ResourceNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Resource Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The resource you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-x-4">
          <Link
            href="/resources"
            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Link>
          <Link
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}