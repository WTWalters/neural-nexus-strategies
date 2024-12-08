// src/components/landing-page/LandingPage.tsx
import { Hero } from "./sections/Hero";
import { ValueProps } from "./sections/ValueProps";
import { CtaDownload } from "./sections/CtaDownload";

interface LandingPageProps {
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

export default function LandingPage({ content }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {content.sections.map((section, index) => {
        switch (section.type) {
          case "hero":
            return <Hero key={index} content={section.content} />;
          case "value-props":
            return <ValueProps key={index} content={section.content} />;
          case "cta-download":
            return <CtaDownload key={index} content={section.content} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
