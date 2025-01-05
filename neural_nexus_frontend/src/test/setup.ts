// Path: src/test/setup.ts
import "@testing-library/jest-dom";
import "jest-styled-components";

type CSSCustomProperties = {
  "--font-heading": string;
  "--font-body": string;
};

// Mock CSS custom properties
Object.defineProperty(window, "getComputedStyle", {
  value: (elem: Element) => ({
    getPropertyValue: (prop: keyof CSSCustomProperties) => {
      const properties: CSSCustomProperties = {
        "--font-heading": "heading-font",
        "--font-body": "body-font",
      };
      return properties[prop] || "";
    },
  }),
});
