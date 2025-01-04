// Path: neural_nexus_frontend/src/components/ui/label/label.test.tsx
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
    expect(screen.getByText("Required Field")).toBeInTheDocument();
    // Check for asterisk icon
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
  });

  it("applies error styles", () => {
    render(<Label error>Error Label</Label>);
    expect(screen.getByText("Error Label")).toHaveClass("text-destructive");
  });

  it("applies disabled styles", () => {
    render(<Label disabled>Disabled Label</Label>);
    expect(screen.getByText("Disabled Label")).toHaveClass(
      "text-muted-foreground",
    );
  });

  it("applies screen reader only class", () => {
    render(<Label srOnly>Screen Reader Label</Label>);
    expect(screen.getByText("Screen Reader Label")).toHaveClass("sr-only");
  });
});
