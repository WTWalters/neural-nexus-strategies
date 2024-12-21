// File: src/components/ui/form/form.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./index";

interface TestFormValues {
  test: string;
}

const MessageFormWithIcon = () => {
  const form = useForm<TestFormValues>({
    defaultValues: { test: "" },
  });

  return (
    <Form {...form}>
      <FormField<TestFormValues>
        control={form.control}
        name="test"
        render={({ field }) => (
          <FormItem>
            <FormMessage>Required field</FormMessage>
          </FormItem>
        )}
      />
    </Form>
  );
};

const MessageFormWithoutIcon = () => {
  const form = useForm({
    defaultValues: { test: "" },
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="test"
        render={({ field }) => (
          <FormItem>
            <FormMessage showIcon={false}>Required field</FormMessage>
          </FormItem>
        )}
      />
    </Form>
  );
};

const ErrorForm = () => {
  const form = useForm({
    defaultValues: { test: "" },
  });

  // Use React.useEffect to ensure the error is set after render
  React.useEffect(() => {
    form.setError("test", { type: "required", message: "Required" });
  }, []); // Empty dependency array

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="test"
        render={() => (
          <FormItem>
            <FormLabel>Test Label</FormLabel>
            <FormControl>
              <input type="text" />
            </FormControl>
          </FormItem>
        )}
      />
    </Form>
  );
};

describe("Form Components", () => {
  describe("FormDescription", () => {
    it("renders with info icon when withIcon is true", () => {
      const TestComponent = () => {
        const form = useForm({
          defaultValues: { test: "" },
        });

        return (
          <Form {...form}>
            <FormField
              control={form.control}
              name="test"
              render={() => (
                <FormItem>
                  <FormDescription withIcon>Help text</FormDescription>
                </FormItem>
              )}
            />
          </Form>
        );
      };

      render(<TestComponent />);

      const icon = screen.getByTestId("form-info-icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("h-4", "w-4");
    });
  });
});

describe("FormLabel", () => {
  it("renders with error styles when form has error", async () => {
    render(<ErrorForm />);
    const label = await screen.findByText("Test Label");
    expect(label).toHaveClass("text-[var(--colors-label-error)]");
  });
});

describe("FormMessage", () => {
  it("renders error message with icon", () => {
    render(<MessageFormWithIcon />);
    const message = screen.getByText("Required field");
    expect(message).toBeInTheDocument();
    const icon = screen.getByTestId("form-error-icon");
    expect(icon).toHaveClass("h-4", "w-4");
  });

  it("renders error message without icon when showIcon is false", () => {
    render(<MessageFormWithoutIcon />);
    const message = screen.getByText("Required field");
    expect(message).toBeInTheDocument();
    expect(screen.queryByTestId("form-error-icon")).not.toBeInTheDocument();
  });
});

describe("FormLabel", () => {
  it("renders with error styles when form has error", () => {
    render(<ErrorForm />);
    const label = screen.getByText("Test Label");
    expect(label.className).toContain("text-[var(--colors-label-error)]");
  });
});
