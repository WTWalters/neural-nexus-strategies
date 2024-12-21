// src/styles/__tests__/themes.test.ts
import { lightTheme, darkTheme } from "../theme/themes";
import { colors } from "../tokens";

describe("Themes", () => {
  describe("Light Theme", () => {
    it("uses light color values", () => {
      expect(lightTheme.colors.background.primary).toBe(colors.base.navy[50]);
      expect(lightTheme.colors.text.primary).toBe(colors.base.navy[900]);
    });

    it("includes all token categories", () => {
      expect(lightTheme.typography).toBeDefined();
      expect(lightTheme.spacing).toBeDefined();
      expect(lightTheme.animation).toBeDefined();
    });
  });

  describe("Dark Theme", () => {
    it("uses dark color values", () => {
      expect(darkTheme.colors.background.primary).toBe(colors.base.navy[900]);
      expect(darkTheme.colors.text.primary).toBe(colors.base.navy[50]);
    });

    it("inherits non-color tokens from light theme", () => {
      expect(darkTheme.typography).toEqual(lightTheme.typography);
      expect(darkTheme.spacing).toEqual(lightTheme.spacing);
      expect(darkTheme.animation).toEqual(lightTheme.animation);
    });
  });
});
