// src/test/test-utils.tsx
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@/components/theme-provider";

function render(ui: React.ReactElement, options = {}) {
  return {
    ...rtlRender(ui, {
      wrapper: ({ children }) => (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      ),
      ...options,
    }),
    user: userEvent.setup(),
  };
}

export * from "@testing-library/react";
export { render };
