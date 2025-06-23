// Path: src/app/(marketing)/resources/[slug]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, FileText, Eye } from "lucide-react";
import { notFound } from "next/navigation";

interface Resource {
  id: number;
  title: string;
  slug: string;
  description: string;
  resource_type: "GUIDE" | "TEMPLATE" | "WHITEPAPER" | "CASE_STUDY" | "TOOLKIT";
  file_url: string;
  thumbnail_url: string;
  is_gated: boolean;
  tags: Array<{id: number, name: string, slug: string}>;
  download_count: number;
  lead_magnet_conversion_rate: string;
  created_at: string;
  updated_at: string;
}

async function fetchResource(slug: string): Promise<Resource | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content/resources/${slug}/`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch resource: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error("Error fetching resource:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resource = await fetchResource(params.slug);
  
  if (!resource) {
    return {
      title: "Resource Not Found | Neural Nexus Strategies",
      description: "The requested resource could not be found.",
    };
  }
  
  return {
    title: `${resource.title} | Neural Nexus Strategies`,
    description: resource.description.length > 160 
      ? `${resource.description.substring(0, 157)}...` 
      : resource.description,
  };
}

const getResourceTypeLabel = (type: string) => {
  switch (type) {
    case "GUIDE":
      return "Guide";
    case "TEMPLATE":
      return "Template";
    case "WHITEPAPER":
      return "Whitepaper";
    case "CASE_STUDY":
      return "Case Study";
    case "TOOLKIT":
      return "Toolkit";
    default:
      return "Resource";
  }
};

export default async function ResourcePage({ params }: { params: { slug: string } }) {
  const resource = await fetchResource(params.slug);
  
  if (!resource) {
    notFound();
  }
  
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <Link 
            href="/resources" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Link>
        </div>
      </div>

      {/* Resource Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2">
                <div className="mb-6">
                  <span className="inline-block bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {getResourceTypeLabel(resource.resource_type)}
                  </span>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {resource.title}
                  </h1>
                  
                  {resource.tags && resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {resource.tags.map((tag) => (
                        <span 
                          key={tag.id} 
                          className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {resource.description}
                  </p>
                </div>
                
                {/* Download Stats */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-2" />
                      {resource.download_count} downloads
                    </div>
                    <div>
                      Last updated: {new Date(resource.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-white border rounded-lg shadow-sm sticky top-8">
                  {/* Preview Image */}
                  {resource.thumbnail_url && (
                    <div className="p-4 border-b">
                      <img 
                        src={resource.thumbnail_url} 
                        alt={`${resource.title} preview`}
                        className="w-full rounded-lg"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Download {getResourceTypeLabel(resource.resource_type)}
                    </h3>
                    
                    {resource.is_gated ? (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          Enter your email address to download this {getResourceTypeLabel(resource.resource_type).toLowerCase()}.
                        </p>
                        
                        <form className="space-y-3">
                          <div>
                            <input
                              type="email"
                              placeholder="Enter your email"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              required
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="First name"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              required
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="Company (optional)"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Now
                          </button>
                        </form>
                        
                        <p className="text-xs text-gray-500">
                          We respect your privacy. No spam, unsubscribe at any time.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          This {getResourceTypeLabel(resource.resource_type).toLowerCase()} is available for immediate download.
                        </p>
                        
                        <a
                          href={resource.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Now
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Related Resources */}
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Related Resources</h3>
                  <div className="space-y-3">
                    <Link 
                      href="/resources" 
                      className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">All Resources</div>
                          <div className="text-sm text-gray-600">Browse our complete library</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need More Guidance?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Our resources provide a great foundation, but every business is unique. 
              Let's discuss how we can help you specifically.
            </p>
            <Link
              href="/contact"
              className="bg-white text-primary-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}