// src/components/landing-page/LandingPage.tsx
"use client";

import { Hero } from "./sections/Hero";
import { ValueProps } from "./sections/ValueProps";
import { CtaDownload } from "./sections/CtaDownload";
import { Features } from "./sections/Features";
import { Testimonials } from "./sections/Testimonials";
import { motion } from "framer-motion";

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
  abTestVariant?: string;
}

export default function LandingPage({ content, abTestVariant }: LandingPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const renderSection = (section: any, index: number) => {
    const sectionVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
      }
    };

    const sectionElement = (() => {
      switch (section.type) {
        case "hero":
          return <Hero content={section.content} />;
        case "value-props":
          return <ValueProps content={section.content} />;
        case "features":
          return <Features content={section.content} />;
        case "testimonials":
          return <Testimonials content={section.content} />;
        case "cta-download":
          return <CtaDownload content={section.content} />;
        default:
          console.warn(`Unknown section type: ${section.type}`);
          return null;
      }
    })();

    if (!sectionElement) return null;

    return (
      <motion.div
        key={`${section.type}-${index}`}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {sectionElement}
      </motion.div>
    );
  };

  return (
    <motion.div 
      className="min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      data-ab-variant={abTestVariant}
    >
      {content.sections.map((section, index) => renderSection(section, index))}
    </motion.div>
  );
}