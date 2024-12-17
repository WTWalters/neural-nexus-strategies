import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./index";

const meta = {
  title: "Composite/Content/SectionHeader",
  component: SectionHeader,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A flexible header component for sections, supporting various sizes, alignments, and optional actions.

## Usage

\`\`\`tsx
import { SectionHeader } from "@/components/composite/content/section-header"

<SectionHeader
  title="Latest Posts"
  subtitle="Check out our newest content"
  actions={<Button>View All</Button>}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Latest Posts",
    subtitle: "Check out our newest content",
  },
};

export const WithActions: Story = {
  args: {
    title: "Team Members",
    subtitle: "Manage your team members and their account permissions here",
    actions: (
      <>
        <Button variant="outline">Import</Button>
        <Button>Add Member</Button>
      </>
    ),
  },
};

export const Large: Story = {
  args: {
    title: "Welcome Back!",
    subtitle: "Here's what you've missed while you were away",
    size: "lg",
    divider: true,
  },
};

export const Centered: Story = {
  args: {
    title: "Featured Products",
    subtitle: "Hand-picked products just for you",
    align: "center",
    actions: <Button>View All</Button>,
  },
};

export const Small: Story = {
  args: {
    title: "Recent Activity",
    subtitle: "Your latest updates and notifications",
    size: "sm",
  },
};

export const TitleOnly: Story = {
  args: {
    title: "Quick Actions",
  },
};

export const WithDivider: Story = {
  render: () => (
    <div className="space-y-8 w-[800px]">
      <SectionHeader
        title="Account Settings"
        subtitle="Manage your account preferences and settings"
        divider
        actions={<Button variant="outline">Edit Profile</Button>}
      />
      <div className="p-4 bg-muted rounded-lg">Content goes here</div>
    </div>
  ),
};
