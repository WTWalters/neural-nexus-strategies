// Centralized JSON-LD Schema markup for SEO and rich snippets

// Base organization information
const baseOrganization = {
  name: "Neural Nexus Strategies",
  url: "https://neuralnexusstrategies.ai",
  description: "Expert data leadership and AI innovation consulting for forward-thinking enterprises.",
};

// Organization schema for the main company
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  ...baseOrganization,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: ["English"],
  },
};

// Website schema for the main site
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: baseOrganization.name,
  url: baseOrganization.url,
};

// Service schema template - can be customized for specific services
export const createServiceSchema = (service: {
  name: string;
  description: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.description,
  url: service.url,
  provider: {
    "@type": "Organization",
    ...baseOrganization,
  },
});

// Professional service schema for consulting services
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Data Leadership Consulting",
  description: "Fractional CDO services, data strategy consulting, and AI implementation guidance",
  url: "https://neuralnexusstrategies.ai/services",
  provider: {
    "@type": "Organization",
    ...baseOrganization,
  },
  serviceType: "Data Leadership Consulting",
  areaServed: "Worldwide",
};

// Article schema template for blog posts
export const createArticleSchema = (article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.description,
  url: article.url,
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  author: {
    "@type": "Person",
    name: article.author,
  },
  publisher: {
    "@type": "Organization",
    ...baseOrganization,
  },
});

// FAQ schema template
export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

// Contact page schema
export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Neural Nexus Strategies",
  description: "Get in touch with our data leadership experts",
  url: "https://neuralnexusstrategies.ai/contact",
  provider: {
    "@type": "Organization",
    ...baseOrganization,
  },
};