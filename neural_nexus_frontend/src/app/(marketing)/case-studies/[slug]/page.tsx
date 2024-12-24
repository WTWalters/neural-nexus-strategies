// src/app/(marketing)/case-studies/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getCaseStudy } from "@/lib/api/case-studies";
import { NewsletterContentEnd } from "@/components/marketing/newsletter/newsletter-content-end";
import { formatDate, formatContent } from "@/lib/utils";

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

// Add this helper function for the JSON Results formatting
function formatResultValue(value: any, level = 0): React.ReactNode {
  if (typeof value === "object" && value !== null) {
    return (
      <dl className={`space-y-2 ${level > 0 ? "ml-4" : ""}`}>
        {Object.entries(value).map(([subKey, subValue]) => (
          <div key={subKey} className="text-gray-800">
            <dt className="text-sm font-medium text-gray-600 capitalize">
              {subKey.split("_").join(" ")}
            </dt>
            <dd className="mt-1">
              {typeof subValue === "object" ? (
                <dl>{formatResultValue(subValue, level + 1)}</dl>
              ) : (
                <span className="text-gray-900">{subValue}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    );
  }
  return value;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  try {
    const caseStudy = await getCaseStudy(params.slug);

    if (!caseStudy) {
      console.log("No case study found, returning 404");
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          {caseStudy.featured_image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
              <img
                src={caseStudy.featured_image}
                alt={caseStudy.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <header className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <span className="text-primary-600 font-medium">
                {caseStudy.industry}
              </span>
              <span>•</span>
              <span>{caseStudy.client_name}</span>
              <span>•</span>
              <time dateTime={caseStudy.published_at || caseStudy.created_at}>
                {formatDate(caseStudy.published_at || caseStudy.created_at)}
              </time>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {caseStudy.title}
            </h1>

            {caseStudy.excerpt && (
              <p className="text-xl text-gray-600 mb-4">{caseStudy.excerpt}</p>
            )}
          </header>

          <div className="prose prose-lg max-w-none mb-8">
            <h2 className="text-2xl font-bold mb-4">Challenge</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: formatContent(caseStudy.challenge),
              }}
            />

            <h2 className="text-2xl font-bold mt-8 mb-4">Solution</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: formatContent(caseStudy.solution),
              }}
            />

            <h2 className="text-2xl font-bold mt-8 mb-4">Results</h2>
            <div className="grid grid-cols-1 gap-6 my-6">
              {Object.entries(caseStudy.results || {}).map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                    {key.split("_").join(" ")}
                  </h3>
                  <dl className="space-y-4">{formatResultValue(value)}</dl>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Implementation Timeline
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: formatContent(caseStudy.implementation_timeline),
              }}
            />

            {caseStudy.testimonial && (
              <>
                <h2 className="text-2xl font-bold mt-8 mb-4">
                  Client Testimonial
                </h2>
                <blockquote className="border-l-4 border-primary-500 pl-4 italic">
                  {caseStudy.testimonial}
                </blockquote>
              </>
            )}
          </div>

          {/* Newsletter signup */}
          <div className="mt-16">
            <NewsletterContentEnd />
          </div>
        </article>
      </div>
    );
  } catch (error) {
    console.error("Error in CaseStudyPage:", error);
    notFound();
  }
}
