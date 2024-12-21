// File: src/components/ui/form/form.test.tsx
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

const TestForm = ({ children }: { children: React.ReactNode }) => {
  const form = useForm();
  return <Form {...form}>{children}</Form>;
};

describe("Form Components", () => {
  describe("FormItem", () => {
    it("renders with default styles", () => {
      render(
        <TestForm>
          <FormItem>Test Content</FormItem>
        </TestForm>,
      );
      const item = screen.getByText("Test Content");
      expect(item).toHaveClass("space-y-2");
      expect(item).toHaveClass("text-[var(--colors-form-foreground)]");
    });

    it("applies custom className", () => {
      render(
        <TestForm>
          <FormItem className="custom-class">Test Content</FormItem>
        </TestForm>,
      );
      expect(screen.getByText("Test Content")).toHaveClass("custom-class");
    });
  });

  describe("FormLabel", () => {
    it("renders with error styles when field has error", () => {
      const form = useForm({
        defaultValues: { test: "" },
      });
      form.setError("test", { type: "required", message: "Required" });

      render(
        <Form {...form}>
          <FormField
            control={form.control}
            name="test"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test Label</FormLabel>
              </FormItem>
            )}
          />
        </Form>,
      );

      expect(screen.getByText("Test Label")).toHaveClass(
        "text-[var(--colors-form-error)]",
      );
    });
  });

  describe("FormDescription", () => {
    it("renders with info icon when withIcon is true", () => {
      render(
        <TestForm>
          <FormDescription withIcon>Help text</FormDescription>
        </TestForm>,
      );

      expect(screen.getByText("Help text").previousSibling).toHaveClass(
        "h-4",
        "w-4",
      );
    });

    it("renders without icon by default", () => {
      render(
        <TestForm>
          <FormDescription>Help text</FormDescription>
        </TestForm>,
      );

      const description = screen.getByText("Help text");
      expect(description.firstChild).toBe(description.lastChild);
    });
  });

  describe("FormMessage", () => {
    it("renders error message with icon", () => {
      const form = useForm({
        defaultValues: { test: "" },
      });
      form.setError("test", { type: "required", message: "Required field" });

      render(
        <Form {...form}>
          <FormField
            control={form.control}
            name="test"
            render={() => (
              <FormItem>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>,
      );

      const message = screen.getByText("Required field");
      expect(message).toHaveClass("text-[var(--colors-form-error)]");
      expect(message.firstChild).toHaveClass("h-4", "w-4");
    });

    it("renders error message without icon when showIcon is false", () => {
      const form = useForm({
        defaultValues: { test: "" },
      });
      form.setError("test", { type: "required", message: "Required field" });

      render(
        <Form {...form}>
          <FormField
            control={form.control}
            name="test"
            render={() => (
              <FormItem>
                <FormMessage showIcon={false} />
              </FormItem>
            )}
          />
        </Form>,
      );

      const message = screen.getByText("Required field");
      expect(message.firstChild).toBe(message.lastChild);
    });
  });
});
