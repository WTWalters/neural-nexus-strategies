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
    // Check for asterisk container with aria-hidden attribute
    const container = document.querySelector('span[aria-hidden="true"]');
    expect(container).toBeInTheDocument();
  });

  it("applies error styles", () => {
    render(<Label error>Error Label</Label>);
    const label = screen.getByText("Error Label").closest('label');
    expect(label).toHaveClass("text-destructive");
  });

  it("applies disabled styles", () => {
    render(<Label disabled>Disabled Label</Label>);
    const label = screen.getByText("Disabled Label").closest('label');
    expect(label).toHaveClass("text-muted-foreground");
  });

  it("applies screen reader only class", () => {
    render(<Label srOnly>Screen Reader Label</Label>);
    const label = screen.getByText("Screen Reader Label").closest('label');
    expect(label).toHaveClass("sr-only");
  });
});
