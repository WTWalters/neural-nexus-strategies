//File: src/components/ui/label/label.test.tsx
import { render, screen } from "@testing-library/react";
import { Label } from "./index";

describe("Label", () => {
  it("renders correctly with default props", () => {
    render(<Label>Test Label</Label>);
    const label = screen.getByText("Test Label");
    expect(label).toHaveClass("text-sm");
    expect(label).toHaveClass("text-[var(--colors-label-foreground)]");
  });

  it("applies error state correctly", () => {
    render(<Label error>Error Label</Label>);
    const label = screen.getByText("Error Label");
    expect(label).toHaveClass("text-[var(--colors-label-error)]");
  });

  it("applies disabled state correctly", () => {
    render(<Label disabled>Disabled Label</Label>);
    const label = screen.getByText("Disabled Label");
    expect(label).toHaveClass("text-[var(--colors-label-disabled)]");
    expect(label).toHaveClass("cursor-not-allowed");
  });

  it("renders required indicator when required prop is true", () => {
    render(<Label required>Required Label</Label>);
    const asterisk = screen.getByText("Required Label").nextElementSibling;
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveAttribute("aria-hidden", "true");
  });

  it("applies srOnly class when srOnly prop is true", () => {
    render(<Label srOnly>Screen Reader Label</Label>);
    expect(screen.getByText("Screen Reader Label")).toHaveClass("sr-only");
  });

  it("renders in different sizes", () => {
    const { rerender } = render(<Label size="sm">Small Label</Label>);
    expect(screen.getByText("Small Label")).toHaveClass("text-xs");

    rerender(<Label size="lg">Large Label</Label>);
    expect(screen.getByText("Large Label")).toHaveClass("text-base");
  });

  it("combines error and required states correctly", () => {
    render(
      <Label error required>
        Error Required Label
      </Label>,
    );
    const label = screen.getByText("Error Required Label");
    const asterisk = label.nextElementSibling;

    expect(label).toHaveClass("text-[var(--colors-label-error)]");
    expect(asterisk).toHaveClass("text-[var(--colors-label-error)]");
  });

  it("applies custom className correctly", () => {
    render(<Label className="custom-class">Custom Label</Label>);
    expect(screen.getByText("Custom Label")).toHaveClass("custom-class");
  });

  it("forwards htmlFor prop to label element", () => {
    render(<Label htmlFor="test-input">Input Label</Label>);
    expect(screen.getByText("Input Label")).toHaveAttribute(
      "for",
      "test-input",
    );
  });

  it("prioritizes disabled state over error state", () => {
    render(
      <Label disabled error>
        State Priority Label
      </Label>,
    );
    const label = screen.getByText("State Priority Label");
    expect(label).toHaveClass("text-[var(--colors-label-disabled)]");
    expect(label).not.toHaveClass("text-[var(--colors-label-error)]");
  });
});
