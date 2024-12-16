import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme } from "./themes";
import { GlobalStyles } from "../global/GlobalStyles";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <StyledThemeProvider theme={lightTheme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
};
