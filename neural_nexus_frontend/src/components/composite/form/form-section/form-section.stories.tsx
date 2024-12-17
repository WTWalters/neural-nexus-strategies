import type { Meta, StoryObj } from "@storybook/react";
import { FormSection } from "./index";
import { FormField } from "../form-field";
import { Input } from "@/components/ui/input";

const meta = {
  title: "Composite/Form/FormSection",
  component: FormSection,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A component for grouping related form fields with a title and optional description.
Used to organize long forms into logical sections.

## Usage

\`\`\`tsx
import { FormSection } from "@/components/composite/form/form-section"

<FormSection
  title="Personal Information"
  description="Please provide your basic information"
>
  {/* Form fields */}
</FormSection>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Personal Information",
    description: "Please provide your basic information",
    children: (
      <>
        <FormField label="First Name">
          <Input placeholder="Enter your first name" />
        </FormField>
        <FormField label="Last Name">
          <Input placeholder="Enter your last name" />
        </FormField>
      </>
    ),
  },
};

export const WithoutDivider: Story = {
  args: {
    title: "Contact Details",
    divider: false,
    children: (
      <>
        <FormField label="Email">
          <Input type="email" placeholder="Enter your email" />
        </FormField>
        <FormField label="Phone">
          <Input type="tel" placeholder="Enter your phone number" />
        </FormField>
      </>
    ),
  },
};

export const DifferentSpacing: Story = {
  args: {
    title: "Account Preferences",
    fieldSpacing: "loose",
    children: (
      <>
        <FormField label="Username">
          <Input placeholder="Choose a username" />
        </FormField>
        <FormField label="Password" description="Must be at least 8 characters">
          <Input type="password" placeholder="Choose a password" />
        </FormField>
      </>
    ),
  },
};

export const CompleteForm: Story = {
  render: () => (
    <form className="w-[600px] rounded-lg border p-6 shadow-sm">
      <FormSection
        title="Personal Information"
        description="Please provide your basic information"
        divider={false}
      >
        <FormField label="First Name" required>
          <Input placeholder="Enter your first name" />
        </FormField>
        <FormField label="Last Name" required>
          <Input placeholder="Enter your last name" />
        </FormField>
      </FormSection>

      <FormSection title="Contact Details" description="How can we reach you?">
        <FormField
          label="Email"
          required
          description="We'll never share your email"
        >
          <Input type="email" placeholder="Enter your email" />
        </FormField>
        <FormField label="Phone">
          <Input type="tel" placeholder="Enter your phone number" />
        </FormField>
      </FormSection>
    </form>
  ),
};
