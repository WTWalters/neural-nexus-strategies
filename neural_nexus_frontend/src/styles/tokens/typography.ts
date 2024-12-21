// src/styles/tokens/typography.ts
export const typography = {
  // Base scale
  scale: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
  },

  fonts: {
    sans: "var(--font-sans)",
    mono: "var(--font-mono)",
    heading: "var(--font-heading)",
  },

  weights: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  lineHeights: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },

  // Semantic tokens
  heading: {
    1: {
      size: "var(--font-size-4xl)",
      weight: "var(--font-weight-bold)",
      lineHeight: "var(--line-height-tight)",
      font: "var(--font-heading)",
    },
    2: {
      size: "var(--font-size-3xl)",
      weight: "var(--font-weight-bold)",
      lineHeight: "var(--line-height-tight)",
      font: "var(--font-heading)",
    },
    3: {
      size: "var(--font-size-2xl)",
      weight: "var(--font-weight-semibold)",
      lineHeight: "var(--line-height-tight)",
      font: "var(--font-heading)",
    },
    4: {
      size: "var(--font-size-xl)",
      weight: "var(--font-weight-semibold)",
      lineHeight: "var(--line-height-tight)",
      font: "var(--font-heading)",
    },
  },

  body: {
    large: {
      size: "var(--font-size-lg)",
      weight: "var(--font-weight-normal)",
      lineHeight: "var(--line-height-relaxed)",
    },
    default: {
      size: "var(--font-size-base)",
      weight: "var(--font-weight-normal)",
      lineHeight: "var(--line-height-normal)",
    },
    small: {
      size: "var(--font-size-sm)",
      weight: "var(--font-weight-normal)",
      lineHeight: "var(--line-height-normal)",
    },
  },

  // Component-specific tokens
  components: {
    navigation: {
      item: {
        size: "var(--font-size-sm)",
        weight: "var(--font-weight-medium)",
        lineHeight: "var(--line-height-tight)",
      },
      title: {
        size: "var(--font-size-lg)",
        weight: "var(--font-weight-bold)",
        lineHeight: "var(--line-height-tight)",
      },
    },
    button: {
      default: {
        size: "var(--font-size-sm)",
        weight: "var(--font-weight-medium)",
        lineHeight: "var(--line-height-tight)",
      },
      large: {
        size: "var(--font-size-base)",
        weight: "var(--font-weight-medium)",
        lineHeight: "var(--line-height-tight)",
      },
    },
    input: {
      label: {
        size: "var(--font-size-sm)",
        weight: "var(--font-weight-medium)",
        lineHeight: "var(--line-height-tight)",
      },
      text: {
        size: "var(--font-size-base)",
        weight: "var(--font-weight-normal)",
        lineHeight: "var(--line-height-normal)",
      },
    },
  },
} as const;

// Type exports
export type TypographyScale = typeof typography.scale;
export type TypographyFonts = typeof typography.fonts;
export type TypographyWeights = typeof typography.weights;
export type TypographyLineHeights = typeof typography.lineHeights;
