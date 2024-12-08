// src/components/landing-page/sections/ValueProps.tsx
//
import { LineChart, ClipboardList, Shield } from "lucide-react";

// Map icon names to Lucide components
const iconMap = {
  "chart-line": LineChart,
  "clipboard-list": ClipboardList,
  "shield-check": Shield,
};

interface ValuePropsProps {
  content: {
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
}

export function ValueProps({ content }: ValuePropsProps) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {content.items.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];

            return (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="text-primary-600 mb-4">
                  {Icon && <Icon size={24} />}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
