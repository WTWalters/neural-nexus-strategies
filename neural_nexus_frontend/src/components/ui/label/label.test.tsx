// Path: src/components/ui/label/label.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { Label } from "./index";

describe("Label", () => {
  it("renders with basic props", () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders with required indicator", () => {
    render(<Label required>Required Field</Label>);
    const label = screen.getByText("Required Field");
    expect(label).toBeInTheDocument();
    // Check for asterisk
    expect(label.nextElementSibling).toHaveAttribute("aria-hidden", "true");
  });

  it("applies error styles", () => {
    render(<Label error>Error Label</Label>);
    const label = screen.getByText("Error Label");
    expect(label.parentElement).toHaveClass("text-destructive");
  });

  it("applies disabled styles", () => {
    render(<Label disabled>Disabled Label</Label>);
    const label = screen.getByText("Disabled Label");
    expect(label.parentElement).toHaveClass("text-muted-foreground");
  });

  it("applies screen reader only class", () => {
    render(<Label srOnly>Screen Reader Label</Label>);
    const label = screen.getByText("Screen Reader Label");
    expect(label.parentElement).toHaveClass("sr-only");
  });
});
