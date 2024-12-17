import type { Meta, StoryObj } from "@storybook/react";
import { FormSubmit } from "./index";
import { FormField } from "../form-field";
import { FormSection } from "../form-section";
import { Input } from "@/components/ui/input";

const meta = {
  title: "Composite/Form/FormSubmit",
  component: FormSubmit,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A component for rendering form submit and reset buttons with consistent styling and layout.
Supports custom button text, loading states, and alignment options.

## Usage

\`\`\`tsx
import { FormSubmit } from "@/components/composite/form/form-submit"

<FormSubmit
  submitText="Save Changes"
  showReset
  onReset={() => form.reset()}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormSubmit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    submitText: "Submit",
  },
};

export const WithReset: Story = {
  args: {
    submitText: "Save Changes",
    resetText: "Cancel",
    showReset: true,
    onReset: () => console.log("Reset clicked"),
  },
};

export const Loading: Story = {
  args: {
    submitText: "Save",
    showReset: true,
    isSubmitting: true,
  },
};

export const RightAligned: Story = {
  args: {
    submitText: "Submit",
    showReset: true,
    align: "right",
  },
};

export const Centered: Story = {
  args: {
    submitText: "Submit",
    showReset: true,
    align: "center",
  },
};

export const CompleteForm: Story = {
  render: () => (
    <form
      className="w-[600px] rounded-lg border p-6 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Form submitted");
      }}
    >
      <FormSection
        title="Personal Information"
        description="Please fill out your information"
      >
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
      </FormSection>

      <div className="mt-6">
        <FormSubmit submitText="Create Account" showReset align="right" />
      </div>
    </form>
  ),
};
