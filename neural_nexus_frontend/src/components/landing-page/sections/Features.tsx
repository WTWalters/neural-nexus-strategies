// src/components/landing-page/sections/Features.tsx
import { motion } from "framer-motion";
import { CheckCircle, Star, Zap, Shield } from "lucide-react";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  benefits?: string[];
}

interface FeaturesProps {
  content: {
    headline?: string;
    subheadline?: string;
    items: FeatureItem[];
    layout?: "grid" | "list" | "cards";
  };
}

const getIcon = (iconName: string) => {
  const icons = {
    "check-circle": CheckCircle,
    "star": Star,
    "zap": Zap,
    "shield": Shield,
  };
  
  return icons[iconName as keyof typeof icons] || CheckCircle;
};

export function Features({ content }: FeaturesProps) {
  const { headline, subheadline, items, layout = "grid" } = content;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case "list":
        return "space-y-8";
      case "cards":
        return "grid md:grid-cols-2 lg:grid-cols-3 gap-6";
      default:
        return "grid md:grid-cols-2 lg:grid-cols-3 gap-8";
    }
  };

  return (
    <section className="py-16 bg-white">
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
          {items.map((item, index) => {
            const IconComponent = getIcon(item.icon);
            
            return (
              <motion.div 
                key={index}
                className={`${layout === "cards" ? "bg-gray-50 p-6 rounded-lg" : ""}`}
                variants={itemVariants}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {item.description}
                    </p>
                    
                    {item.benefits && (
                      <ul className="space-y-2">
                        {item.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}