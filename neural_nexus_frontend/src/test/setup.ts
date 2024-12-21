import "@testing-library/jest-dom";
import "jest-styled-components";

// Mock CSS custom properties
Object.defineProperty(window, "getComputedStyle", {
  value: (elem) => ({
    getPropertyValue: (prop) => {
      return (
        {
          "--font-heading": "heading-font",
          "--font-body": "body-font",
        }[prop] || ""
      );
    },
  }),
});
