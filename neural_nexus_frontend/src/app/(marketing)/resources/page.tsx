// Path: src/app/(marketing)/resources/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { Download, FileText, BookOpen, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Downloads & Resources | Neural Nexus Strategies",
  description: "Free guides, templates, and resources for AI implementation, data strategy, and digital transformation.",
};

interface Resource {
  id: number;
  title: string;
  description: string;
  resource_type: "GUIDE" | "TEMPLATE" | "WHITEPAPER" | "CASE_STUDY" | "TOOLKIT";
  file_url: string;
  is_gated: boolean;
  tags: Array<{id: number, name: string, slug: string}>;
  slug: string;
  download_count: number;
}

interface ResourcesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Resource[];
}

async function fetchResources(): Promise<Resource[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content/resources/`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      console.error("Failed to fetch resources:", res.status);
      return [];
    }
    
    const data: ResourcesResponse = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
}

const getResourceIcon = (type: string) => {
  switch (type) {
    case "GUIDE":
      return BookOpen;
    case "TEMPLATE":
      return FileText;
    case "WHITEPAPER":
      return Download;
    case "CASE_STUDY":
      return Users;
    case "TOOLKIT":
      return FileText;
    default:
      return Download;
  }
};

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

export default async function ResourcesPage() {
  const resources = await fetchResources();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Resources & Downloads
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Accelerate your AI and data strategy journey with our expert guides, 
              templates, and actionable insights.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {resources.length === 0 ? (
            <div className="text-center py-16">
              <Download className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Resources Coming Soon
              </h2>
              <p className="text-gray-600 mb-8">
                We're preparing valuable resources for you. Check back soon for guides, 
                templates, and insights to accelerate your AI journey.
              </p>
              <Link 
                href="/contact" 
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors inline-block"
              >
                Get Notified When Available
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Available Resources
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Download our comprehensive collection of guides and tools to help 
                  you implement AI solutions and optimize your data strategy.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.map((resource) => {
                  const IconComponent = getResourceIcon(resource.resource_type);
                  
                  return (
                    <div key={resource.id} className="bg-white rounded-lg shadow-lg border hover:shadow-xl transition-shadow">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="bg-primary-100 p-2 rounded-lg">
                              <IconComponent className="w-5 h-5 text-primary-600" />
                            </div>
                            <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                              {getResourceTypeLabel(resource.resource_type)}
                            </span>
                          </div>
                          {resource.is_gated && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              Email Required
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {resource.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                          {resource.description.length > 150 
                            ? `${resource.description.substring(0, 150)}...` 
                            : resource.description}
                        </p>
                        
                        {resource.tags && resource.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {resource.tags.slice(0, 3).map((tag) => (
                              <span 
                                key={tag.id} 
                                className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                              >
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <Link
                            href={`/resources/${resource.slug}`}
                            className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-center mr-2"
                          >
                            <Download className="w-4 h-4 inline mr-2" />
                            Download {getResourceTypeLabel(resource.resource_type)}
                          </Link>
                          {resource.download_count > 0 && (
                            <span className="text-xs text-gray-500">
                              {resource.download_count} downloads
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need More Personalized Guidance?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our resources are just the beginning. Get expert consultation tailored 
              to your specific AI and data strategy needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/services"
                className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}