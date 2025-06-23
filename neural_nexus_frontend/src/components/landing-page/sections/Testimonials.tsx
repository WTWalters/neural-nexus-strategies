// src/components/landing-page/sections/Testimonials.tsx
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  name: string;
  title: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialsProps {
  content: {
    headline?: string;
    subheadline?: string;
    testimonials: Testimonial[];
    layout?: "carousel" | "grid" | "single";
  };
}

export function Testimonials({ content }: TestimonialsProps) {
  const { headline, subheadline, testimonials, layout = "grid" } = content;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case "single":
        return "max-w-4xl mx-auto";
      case "carousel":
        return "flex overflow-x-auto space-x-6 pb-4";
      default:
        return "grid md:grid-cols-2 lg:grid-cols-3 gap-8";
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {(headline || subheadline) && (
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {headline && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {headline}
              </h2>
            )}
            {subheadline && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {subheadline}
              </p>
            )}
          </motion.div>
        )}

        <motion.div 
          className={getLayoutClasses()}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className={`bg-white p-6 rounded-lg shadow-lg ${layout === "carousel" ? "flex-shrink-0 w-80" : ""}`}
              variants={itemVariants}
            >
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-primary-600 mr-3" />
                {testimonial.rating && (
                  <div className="flex space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                )}
              </div>
              
              <blockquote className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center">
                {testimonial.avatar && (
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.title}
                    {testimonial.company && (
                      <span> at {testimonial.company}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}