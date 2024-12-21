//src/components/composite/form/form-field/form-field.test.tsx

import { screen } from "@testing-library/react";
import { FormField } from "./index";
import { Input } from "@/components/ui/input";
import { renderWithForm } from "@/test/utils/form";

describe("FormField", () => {
  it("renders with label and children", () => {
    renderWithForm(
      <FormField name="test" label="Email">
        <Input placeholder="Enter email" />
      </FormField>,
    );

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
  });

  it("shows required indicator when required prop is true", () => {
    renderWithForm(
      <FormField name="test" label="Username" required>
        <Input placeholder="Enter username" />
      </FormField>,
    );

    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("*")).toHaveClass("text-destructive");
  });

  it("displays error message when error prop is provided", () => {
    renderWithForm(
      <FormField name="test" label="Password" error="This field is required">
        <Input type="password" />
      </FormField>,
    );

    expect(screen.getByText("This field is required")).toHaveClass(
      "text-[var(--colors-form-error)]",
    );
  });

  it("renders description when provided", () => {
    const description = "Must be at least 8 characters";
    renderWithForm(
      <FormField name="test" label="Password" description={description}>
        <Input type="password" />
      </FormField>,
    );

    expect(screen.getByText(description)).toHaveClass(
      "text-[var(--colors-form-placeholder)]",
    );
  });

  it("passes className to wrapper element", () => {
    renderWithForm(
      <FormField name="test" label="Test" className="mt-4">
        <Input />
      </FormField>,
    );

    expect(screen.getByTestId("form-field")).toHaveClass("mt-4");
  });

  it("applies error styles to label when error is present", () => {
    renderWithForm(
      <FormField name="test" label="Test" error="Error message">
        <Input />
      </FormField>,
    );

    expect(screen.getByText("Test")).toHaveClass("text-destructive");
  });
});
