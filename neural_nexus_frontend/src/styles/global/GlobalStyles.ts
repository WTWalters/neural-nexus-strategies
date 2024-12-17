import { createGlobalStyle } from "styled-components";
import { Theme } from "../theme/themes";

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  :root {
    --font-heading: ${(props) => props.theme.typography.fonts.heading};
    --font-body: ${(props) => props.theme.typography.fonts.body};
  }

  html {
    font-size: ${(props) => props.theme.typography.scale.base};
  }

  body {
    margin: 0;
    padding: 0;
    font-family: var(--font-body);
    line-height: ${(props) => props.theme.typography.lineHeights.base};
    color: ${(props) => props.theme.colors.text.primary};
    background-color: ${(props) => props.theme.colors.background.primary};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    margin: 0;
  }
`;
