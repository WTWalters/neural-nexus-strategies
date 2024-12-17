import { render, screen } from "@testing-library/react";
import { FormField } from "./index";
import { Input } from "@/components/ui/input";

describe("FormField", () => {
  it("renders with label and children", () => {
    render(
      <FormField label="Email">
        <Input placeholder="Enter email" />
      </FormField>,
    );

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
  });

  it("shows required indicator when required prop is true", () => {
    render(
      <FormField label="Username" required>
        <Input placeholder="Enter username" />
      </FormField>,
    );

    const label = screen.getByText("Username");
    expect(screen.getByText("*")).toHaveClass("text-destructive");
  });

  it("displays error message when error prop is provided", () => {
    const errorMessage = "This field is required";
    render(
      <FormField label="Password" error={errorMessage}>
        <Input type="password" />
      </FormField>,
    );

    expect(screen.getByText(errorMessage)).toHaveClass("text-destructive");
  });

  it("renders description when provided", () => {
    const description = "Must be at least 8 characters";
    render(
      <FormField label="Password" description={description}>
        <Input type="password" />
      </FormField>,
    );

    expect(screen.getByText(description)).toHaveClass("text-muted-foreground");
  });

  it("passes className to wrapper element", () => {
    render(
      <FormField label="Test" className="mt-4">
        <Input />
      </FormField>,
    );

    expect(screen.getByTestId("form-field")).toHaveClass("mt-4");
  });

  it("applies error styles to label when error is present", () => {
    render(
      <FormField label="Test" error="Error message">
        <Input />
      </FormField>,
    );

    expect(screen.getByText("Test")).toHaveClass("text-destructive");
  });
});
