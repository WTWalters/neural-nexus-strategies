// src/components/landing-page/sections/Hero.tsx
interface HeroProps {
  content: {
    headline: string;
    subheadline: string;
    image: string;
    cta: {
      text: string;
      action: string;
    };
  };
}

export function Hero({ content }: HeroProps) {
  return (
    <section className="bg-gradient-to-r from-primary-900 to-primary-800 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {content.headline}
            </h1>
            <p className="text-xl mb-8 text-gray-200">{content.subheadline}</p>
            <button
              onClick={() => {
                if (content.cta.action === "scroll-to-form") {
                  // Add smooth scroll to form
                  document.getElementById("download-form")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
              className="bg-white text-primary-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {content.cta.text}
            </button>
          </div>
          <div>
            <img
              src="/api/placeholder/800/600" // Using your placeholder API
              alt="AI Readiness"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
