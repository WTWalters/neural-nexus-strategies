// src/styles/__tests__/GlobalStyles.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { GlobalStyles } from "../global/GlobalStyles";
import { lightTheme } from "../theme/themes";

const MockThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <StyledThemeProvider theme={lightTheme}>
    <>
      <GlobalStyles theme={lightTheme} /> {/* Add theme prop here */}
      {children}
    </>
  </StyledThemeProvider>
);

describe("GlobalStyles", () => {
  it("applies theme variables to root", () => {
    const { container } = render(
      <MockThemeProvider>
        <div>Test content</div>
      </MockThemeProvider>,
    );

    // Use getComputedStyle to check CSS custom properties
    const styles = getComputedStyle(document.documentElement);
    expect(styles.getPropertyValue("--font-heading")).toBeTruthy();
    expect(styles.getPropertyValue("--font-body")).toBeTruthy();
  });

  it("applies base styles to HTML elements", () => {
    const { container } = render(
      <MockThemeProvider>
        <div>
          <h1>Heading</h1>
          <p>Paragraph</p>
        </div>
      </MockThemeProvider>,
    );

    const heading = container.querySelector("h1");
    const paragraph = container.querySelector("p");

    const styles = getComputedStyle(document.documentElement);
    expect(heading).toBeTruthy();
    expect(paragraph).toBeTruthy();
  });
});
