import type { Meta, StoryObj } from "@storybook/react";
import { SignupForm } from "./signup-form";

const meta = {
  title: "Examples/SignupForm",
  component: SignupForm,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A complete signup form implementation showcasing:
- Form validation with Zod
- Error handling
- Loading states
- Form sections
- Reset functionality
        `,
      },
    },
  },
} satisfies Meta<typeof SignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
