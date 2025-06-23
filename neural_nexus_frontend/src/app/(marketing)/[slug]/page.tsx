// Path: src/app/(marketing)/[slug]/page.tsx
import LandingPage from "@/components/landing-page/LandingPage";
import { Metadata } from "next";

interface PageData {
  content: {
    sections: Array<{
      type: string;
      content: any;
    }>;
    meta: {
      title: string;
      description: string;
    };
  };
}

const ComingSoon = () => (
  <section className="bg-gradient-to-r from-primary-900 to-primary-800 text-white">
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Coming Soon
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            We're working on something amazing. This page is currently under
            construction.
          </p>
          <a
            href="/"
            className="bg-white text-primary-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Return to Homepage
          </a>
        </div>
        <div>
          <img
            src="/api/placeholder/800/600"
            alt="Coming Soon"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  </section>
);

const MainContent = ({ content }: { content: PageData["content"] }) => (
  <LandingPage content={content} />
);

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const pageData = await fetchPageData(params.slug);

    return {
      title: pageData?.content?.meta?.title || "Neural Nexus Strategies",
      description:
        pageData?.content?.meta?.description ||
        "Your AI-Powered Business Solutions Partner",
    };
  } catch (error) {
    return {
      title: "Neural Nexus Strategies",
      description: "Your AI-Powered Business Solutions Partner",
    };
  }
}

// Fetch data function
async function fetchPageData(slug: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/content/landing-pages/${slug}/`;
    console.log("Fetching from URL:", url);

    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour

    if (!res.ok) {
      console.log("Response not OK:", res.status);
      return null;
    }

    const data = await res.json();
    console.log("Received data:", data);

    if (!data?.content?.meta) {
      console.log("Invalid data structure received");
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching landing page:", error);
    return null;
  }
}

// Main page component
export default async function Page({ params }: { params: { slug: string } }) {
  const pageData = await fetchPageData(params.slug);

  if (!pageData?.content) {
    return <ComingSoon />;
  }

  return <MainContent content={pageData.content} />;
}
