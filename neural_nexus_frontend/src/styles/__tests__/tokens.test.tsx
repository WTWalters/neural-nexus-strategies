// src/styles/__tests__/tokens.test.ts
import { colors, typography, spacing, animation } from "../tokens";

// Add type definitions
type ColorScale = keyof typeof colors.base;
type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type TypographySize = keyof typeof typography.scale;

describe("Design Tokens", () => {
  describe("Colors", () => {
    it("has complete base color scales", () => {
      const scales: ColorScale[] = ["navy", "blue", "red", "green"];
      const shades: ColorShade[] = [
        50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
      ];

      scales.forEach((scale) => {
        shades.forEach((shade) => {
          expect(colors.base[scale][shade]).toBeDefined();
          expect(colors.base[scale][shade]).toMatch(/^#[0-9A-F]{6}$/i);
        });
      });
    });

    it("has semantic color tokens mapped to base colors", () => {
      expect(colors.theme.primary).toBe("var(--color-navy-500)");
      expect(colors.theme.secondary).toBe("var(--color-blue-500)");
      expect(colors.theme.destructive).toBe("var(--color-red-500)");
    });

    it("has component-specific color tokens", () => {
      expect(colors.components.button.primary).toBeDefined();
      expect(colors.components.input).toBeDefined();
      expect(colors.components.navigation).toBeDefined();
    });
  });

  describe("Typography", () => {
    it("has complete scale values", () => {
      const expectedSizes: TypographySize[] = [
        "xs",
        "sm",
        "base",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
      ];
      expectedSizes.forEach((size) => {
        expect(typography.scale[size]).toBeDefined();
        expect(typography.scale[size]).toMatch(/^\d*\.?\d+rem$/);
      });
    });

    it("has semantic heading tokens", () => {
      [1, 2, 3, 4].forEach((level) => {
        const heading = typography.heading[level];
        expect(heading.size).toBeDefined();
        expect(heading.weight).toBeDefined();
        expect(heading.lineHeight).toBeDefined();
      });
    });

    it("has component-specific typography tokens", () => {
      expect(typography.components.navigation).toBeDefined();
      expect(typography.components.button).toBeDefined();
      expect(typography.components.input).toBeDefined();
    });
  });

  describe("Spacing", () => {
    it("has scale values", () => {
      Object.entries(spacing.scale).forEach(([key, value]) => {
        // Allow "0" as a valid value
        expect(value).toMatch(/^(0|\d*\.?\d+(px|rem))$/);
      });
    });

    it("has semantic layout tokens", () => {
      expect(spacing.layout.page).toBeDefined();
      expect(spacing.layout.section).toBeDefined();
    });
  });

  describe("Animation", () => {
    it("has duration tokens", () => {
      Object.entries(animation.duration).forEach(([key, value]) => {
        expect(value).toMatch(/^\d+ms$/);
      });
    });

    it("has easing tokens", () => {
      Object.entries(animation.easing).forEach(([key, value]) => {
        expect(value).toMatch(/^cubic-bezier/);
      });
    });
  });
});
