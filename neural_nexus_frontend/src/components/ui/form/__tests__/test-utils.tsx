// src/components/ui/form/__tests__/test-utils.tsx
import React from "react";
import { render as rtlRender, screen } from "@testing-library/react";
import { ThemeProvider } from "@/components/theme-provider";

export function render(ui: React.ReactElement) {
  return rtlRender(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {ui}
    </ThemeProvider>,
  );
}

describe("render utility", () => {
  it("renders component with theme provider", () => {
    render(<div>Test Content</div>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
