import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./index";
import { Input } from "@/components/ui/input";

const meta = {
  title: "Composite/Form/FormField",
  component: FormField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A form field component that combines a label, optional description, and error message with any form control.
It provides a consistent layout and styling for form inputs across the application.

## Usage

\`\`\`tsx
import { FormField } from "@/components/composite/form/form-field"
import { Input } from "@/components/ui/input"

<FormField
  label="Email"
  required
  description="We'll never share your email"
>
  <Input type="email" placeholder="Enter email" />
</FormField>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      description: "The label text for the form field",
      control: "text",
    },
    description: {
      description: "Optional helper text shown below the label",
      control: "text",
    },
    error: {
      description: "Error message to display when validation fails",
      control: "text",
    },
    required: {
      description: "Whether the field is required",
      control: "boolean",
    },
    className: {
      description: "Additional CSS classes to apply",
      control: "text",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Email",
    children: <Input placeholder="Enter your email" />,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Email",
    description: "We'll never share your email",
    children: <Input placeholder="Enter your email" />,
  },
};

export const WithError: Story = {
  args: {
    label: "Username",
    error: "This username is already taken",
    children: <Input placeholder="Choose a username" />,
  },
  parameters: {
    docs: {
      description: {
        story: "Display validation errors below the input field.",
      },
    },
  },
};

export const Required: Story = {
  args: {
    label: "Password",
    required: true,
    description: "Must be at least 8 characters",
    children: <Input type="password" placeholder="Enter password" />,
  },
};

export const WithCustomClasses: Story = {
  args: {
    label: "Custom Spacing",
    className: "space-y-4",
    children: <Input placeholder="With extra spacing" />,
  },
  parameters: {
    docs: {
      description: {
        story: "The component can be customized using Tailwind classes.",
      },
    },
  },
};

export const InForm: Story = {
  render: () => (
    <form className="w-[400px] space-y-6 rounded-lg border p-4 shadow-sm">
      <FormField label="Name" required>
        <Input placeholder="Enter your name" />
      </FormField>

      <FormField
        label="Email"
        required
        description="We'll never share your email"
      >
        <Input type="email" placeholder="Enter your email" />
      </FormField>

      <FormField
        label="Password"
        required
        description="Must be at least 8 characters"
      >
        <Input type="password" placeholder="Choose a password" />
      </FormField>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of multiple FormFields in a complete form layout.",
      },
    },
  },
};
