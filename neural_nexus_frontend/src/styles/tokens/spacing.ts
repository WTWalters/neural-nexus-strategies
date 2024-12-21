// File: src/styles/tokens/spacing.ts

export const spacing = {
  // Base scale
  scale: {
    px: "1px",
    0.5: "0.125rem",
    1: "0.25rem",
    // ... continue scale
  },

  // Semantic tokens
  layout: {
    page: {
      x: "var(--spacing-6)",
      y: "var(--spacing-8)",
    },
    section: {
      x: "var(--spacing-4)",
      y: "var(--spacing-6)",
    },
  },

  // Component-specific tokens
  components: {
    navigation: {
      item: "var(--spacing-4)",
      gap: "var(--spacing-2)",
    },
    // ... other components
  },
};
