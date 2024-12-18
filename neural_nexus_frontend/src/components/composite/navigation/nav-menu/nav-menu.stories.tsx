import type { Meta, StoryObj } from "@storybook/react";
import {
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  Bell,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavMenu } from "./index";

const meta = {
  title: "Composite/Navigation/NavMenu",
  component: NavMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A dropdown navigation menu component with support for icons, descriptions, and nested items.

## Usage

\`\`\`tsx
import { NavMenu } from "@/components/composite/navigation/nav-menu"
import { LayoutDashboard } from "lucide-react"

<NavMenu
  trigger={<Button>Menu</Button>}
  items={[
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard />,
      description: "View your dashboard"
    }
  ]}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
    description: "View your analytics and reports",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings />,
    description: "Manage your account preferences",
  },
  {
    label: "Team",
    href: "/team",
    icon: <Users />,
    description: "Collaborate with your team members",
  },
  {
    label: "Documentation",
    href: "https://docs.example.com",
    icon: <FileText />,
    description: "Learn how to use the platform",
    isExternal: true,
  },
];

export const Default: Story = {
  args: {
    trigger: <Button>Menu</Button>,
    items: defaultItems,
  },
};

export const WithDisabledItem: Story = {
  args: {
    trigger: <Button variant="outline">Actions</Button>,
    items: [
      ...defaultItems,
      {
        label: "Notifications",
        href: "/notifications",
        icon: <Bell />,
        description: "View your notifications",
        disabled: true,
      },
    ],
  },
};

export const WithClickHandler: Story = {
  args: {
    trigger: <Button>Help</Button>,
    items: [
      {
        label: "Documentation",
        icon: <FileText />,
        description: "Read the documentation",
        href: "https://docs.example.com",
        isExternal: true,
      },
      {
        label: "Support",
        icon: <HelpCircle />,
        description: "Get help from our team",
        onClick: () => alert("Opening support chat..."),
      },
    ],
  },
};

export const NoIcons: Story = {
  args: {
    trigger: <Button>Navigation</Button>,
    items: defaultItems.map(({ icon, ...item }) => item),
    showIcons: false,
  },
};

export const HeaderExample: Story = {
  render: () => (
    <header className="flex items-center justify-between w-full max-w-4xl p-4 border rounded-lg">
      <div className="font-bold text-xl">Logo</div>
      <nav className="flex items-center gap-4">
        <NavMenu
          trigger={<Button variant="ghost">Products</Button>}
          items={defaultItems}
        />
        <NavMenu
          trigger={<Button variant="ghost">Resources</Button>}
          items={[
            {
              label: "Documentation",
              href: "https://docs.example.com",
              icon: <FileText />,
              description: "Learn how to use our platform",
              isExternal: true,
            },
            {
              label: "Help Center",
              href: "/help",
              icon: <HelpCircle />,
              description: "Get support from our team",
            },
          ]}
        />
      </nav>
    </header>
  ),
};
