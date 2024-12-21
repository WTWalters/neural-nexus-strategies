// File: src/styles/tokens/typography.ts

export const typography = {
  // Base definitions
  scale: {
    /* existing scale */
  },
  fonts: {
    /* existing fonts */
  },

  // Semantic tokens
  heading: {
    1: {
      size: "var(--font-size-4xl)",
      weight: "var(--font-weight-bold)",
      lineHeight: "var(--line-height-tight)",
    },
    2: {
      /* ... */
    },
  },
  body: {
    large: {
      size: "var(--font-size-lg)",
      weight: "var(--font-weight-regular)",
      lineHeight: "var(--line-height-relaxed)",
    },
    default: {
      /* ... */
    },
    small: {
      /* ... */
    },
  },

  // Component-specific tokens
  components: {
    navigation: {
      item: {
        size: "var(--font-size-sm)",
        weight: "var(--font-weight-medium)",
      },
      // ... other navigation typography
    },
    // ... other components
  },
};
