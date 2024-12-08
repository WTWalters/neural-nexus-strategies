// src/pages/[slug].tsx
import { GetServerSideProps } from "next";
import LandingPage from "@/components/landing-page/LandingPage";
import Head from "next/head";

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
  };
}

export default function Page({ pageData }: PageProps) {
  return (
    <>
      <Head>
        <title>{pageData.content.meta.title}</title>
        <meta name="description" content={pageData.content.meta.description} />
      </Head>
      <LandingPage content={pageData.content} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };
  console.log("Fetching landing page for slug:", slug);
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/content/landing-pages/${slug}/`;
    console.log("Fetching from URL:", url);

    const res = await fetch(url);
    const data = await res.json();
    console.log("Received data:", data);

    if (!data) {
      console.log("No data received");
      return {
        notFound: true,
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
      notFound: true,
    };
  }
};
