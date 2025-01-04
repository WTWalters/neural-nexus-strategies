// Path: src/pages/[slug].tsx
import { GetServerSideProps } from "next";
import LandingPage from "@/components/landing-page/LandingPage";
import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface PageProps {
  pageData: {
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
  } | null;
}

const ComingSoon = () => (
  <>
    <Head>
      <title>Coming Soon - Neural Nexus Strategies</title>
      <meta name="description" content="This content will be available soon." />
    </Head>
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-primary-900 to-primary-800 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Coming Soon
                </h1>
                <p className="text-xl mb-8 text-gray-200">
                  We're working on something amazing. This page is currently
                  under construction.
                </p>
                <a // Added opening <a> tag here
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
      </main>
      <Footer />
    </div>
  </>
);

const MainContent = ({
  content,
}: {
  // Remove the null possibility since we only call this component with non-null content
  content: NonNullable<PageProps["pageData"]>["content"];
}) => (
  <>
    <Head>
      <title>{content.meta?.title || "Neural Nexus Strategies"}</title>
      <meta
        name="description"
        content={
          content.meta?.description ||
          "Your AI-Powered Business Solutions Partner"
        }
      />
    </Head>
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <LandingPage content={content} />
      </main>
      <Footer />
    </div>
  </>
);

// The null check in the main component ensures we only pass non-null content
export default function Page({ pageData }: PageProps) {
  if (!pageData?.content) {
    return <ComingSoon />;
  }
  return <MainContent content={pageData.content} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };
  console.log("Fetching landing page for slug:", slug);

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/content/landing-pages/${slug}/`;
    console.log("Fetching from URL:", url);

    const res = await fetch(url);

    if (!res.ok) {
      console.log("Response not OK:", res.status);
      return {
        props: {
          pageData: null,
        },
      };
    }

    const data = await res.json();
    console.log("Received data:", data);

    if (!data?.content?.meta) {
      console.log("Invalid data structure received");
      return {
        props: {
          pageData: null,
        },
      };
    }

    return {
      props: {
        pageData: data,
      },
    };
  } catch (error) {
    console.error("Error fetching landing page:", error);
    return {
      props: {
        pageData: null,
      },
    };
  }
};
