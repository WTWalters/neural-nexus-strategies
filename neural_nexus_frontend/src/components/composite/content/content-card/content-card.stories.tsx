import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { ContentCard } from "./index";

const meta = {
  title: "Composite/Content/ContentCard",
  component: ContentCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A versatile card component for displaying content with images, actions, and various styling options.

## Usage

\`\`\`tsx
import { ContentCard } from "@/components/composite/content/content-card"

<ContentCard
  title="Getting Started"
  description="Learn how to get started with our platform"
  image={{ src: "/placeholder.jpg", alt: "Getting Started" }}
  actions={<Button>Learn More</Button>}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Getting Started with Neural Nexus",
    description:
      "Learn how to integrate AI into your business processes effectively and scale your operations.",
    image: {
      src: "/api/placeholder/800/400",
      alt: "Getting Started",
    },
  },
};

export const WithActions: Story = {
  args: {
    title: "Enterprise Solutions",
    description:
      "Discover our enterprise-grade AI solutions designed for large-scale operations.",
    image: {
      src: "/api/placeholder/800/400",
      alt: "Enterprise Solutions",
    },
    actions: (
      <>
        <Button variant="outline">Learn More</Button>
        <Button>Get Started</Button>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    title: "Custom AI Models",
    description:
      "Build and deploy custom AI models tailored to your specific needs.",
    variant: "elevated",
    image: {
      src: "/api/placeholder/800/400",
      alt: "Custom AI",
    },
    actions: <Button>Contact Sales</Button>,
  },
};

export const WithFooter: Story = {
  args: {
    title: "Case Study: AI in Healthcare",
    description:
      "How we helped a major healthcare provider implement AI solutions.",
    image: {
      src: "/api/placeholder/800/400",
      alt: "Healthcare AI",
    },
    footer: (
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Read Time: 5 min</span>
        <span>Healthcare Industry</span>
      </div>
    ),
  },
};

export const Loading: Story = {
  args: {
    title: "Loading State Example",
    description: "This card demonstrates the loading state animation.",
    isLoading: true,
  },
};

export const AsLink: Story = {
  args: {
    title: "Clickable Card",
    description: "This entire card is clickable and navigates to a new page.",
    href: "#",
    image: {
      src: "/api/placeholder/800/400",
      alt: "Clickable Card",
    },
  },
};

export const GridLayout: Story = {
  args: {
    // Provide default args that will be available to the render function
    title: "Grid Example",
    description: "Example of cards in a grid layout",
    image: {
      src: "/api/placeholder/400/300",
      alt: "Grid Example",
    },
  },
  render: () => (
    <div className="grid grid-cols-3 gap-6 w-[1200px]">
      {[1, 2, 3].map((i) => (
        <ContentCard
          key={i}
          title={`Card ${i}`}
          description="Example of cards in a grid layout"
          image={{
            src: "/api/placeholder/400/300",
            alt: `Card ${i}`,
          }}
          actions={<Button>Learn More</Button>}
        />
      ))}
    </div>
  ),
};
