import type { Meta, StoryObj } from "@storybook/react";
import { Home, Settings, ExternalLink } from "lucide-react";
import { NavLink } from "./index";

const meta = {
  title: "Composite/Navigation/NavLink",
  component: NavLink,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
An enhanced navigation link component with support for active states, icons, and descriptions.

## Usage

\`\`\`tsx
import { NavLink } from "@/components/composite/navigation/nav-link"
import { Home } from "lucide-react"

<NavLink
  href="/dashboard"
  label="Dashboard"
  icon={<Home />}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "/home",
    label: "Home",
  },
};

export const WithIcon: Story = {
  args: {
    href: "/dashboard",
    label: "Dashboard",
    icon: <Home className="h-4 w-4" />,
  },
};

export const Active: Story = {
  args: {
    href: "/settings",
    label: "Settings",
    icon: <Settings className="h-4 w-4" />,
    isActive: true,
  },
};

export const WithDescription: Story = {
  args: {
    href: "/profile",
    label: "Profile Settings",
    description: "Manage your account preferences",
    icon: <Settings className="h-4 w-4" />,
  },
};

export const External: Story = {
  args: {
    href: "https://example.com",
    label: "Documentation",
    isExternal: true,
    icon: <ExternalLink className="h-4 w-4" />,
  },
};

export const NavigationExample: Story = {
  render: () => (
    <div className="flex flex-col gap-1 w-64 p-4 bg-background border rounded-lg">
      <NavLink
        href="/dashboard"
        label="Dashboard"
        icon={<Home className="h-4 w-4" />}
        isActive
      />
      <NavLink
        href="/settings"
        label="Settings"
        icon={<Settings className="h-4 w-4" />}
        description="Manage your preferences"
      />
      <NavLink
        href="https://docs.example.com"
        label="Documentation"
        isExternal
        variant="subtle"
      />
    </div>
  ),
};
