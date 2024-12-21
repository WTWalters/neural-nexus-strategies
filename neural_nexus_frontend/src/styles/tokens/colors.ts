// File: src/styles/tokens/colors.ts

// Base color palette
const baseColors = {
  navy: {
    50: "#E6E8ED",
    100: "#C2C7D6",
    200: "#9EA7BC",
    300: "#7A87A3",
    400: "#566789",
    500: "#1B2B4D", // Primary brand color
    600: "#162341",
    700: "#111B35",
    800: "#0D1429",
    900: "#0A1020",
  },
  blue: {
    50: "#EBF8FF",
    100: "#BEE3F8",
    200: "#90CDF4",
    300: "#63B3ED",
    400: "#4299E1",
    500: "#3182CE", // Secondary brand color
    600: "#2B6CB0",
    700: "#2C5282",
    800: "#2A4365",
    900: "#1A365D",
  },
  red: {
    50: "#FFF5F5",
    100: "#FED7D7",
    200: "#FEB2B2",
    300: "#FC8181",
    400: "#F56565",
    500: "#E53E3E", // Destructive actions
    600: "#C53030",
    700: "#9B2C2C",
    800: "#822727",
    900: "#63171B",
  },
  green: {
    50: "#F0FDF4",
    100: "#DCFCE7",
    200: "#BBF7D0",
    300: "#86EFAC",
    400: "#4ADE80",
    500: "#22C55E", // Success state
    600: "#16A34A",
    700: "#15803D",
    800: "#166534",
    900: "#14532D",
  },
} as const;

// Semantic color tokens
const themeColors = {
  // Brand colors
  primary: "var(--color-navy-500)",
  "primary-lighter": "var(--color-navy-400)",
  "primary-darker": "var(--color-navy-600)",
  "primary-foreground": "var(--white)",

  secondary: "var(--color-blue-500)",
  "secondary-lighter": "var(--color-blue-400)",
  "secondary-darker": "var(--color-blue-600)",
  "secondary-foreground": "var(--white)",

  // UI colors
  accent: "var(--color-blue-50)",
  "accent-foreground": "var(--color-blue-900)",
  muted: "var(--color-navy-50)",
  "muted-foreground": "var(--color-navy-500)",

  // Background colors
  background: "var(--white)",
  "background-subtle": "var(--color-navy-50)",
  "background-muted": "var(--color-navy-100)",

  // State colors
  destructive: "var(--color-red-500)",
  "destructive-lighter": "var(--color-red-400)",
  "destructive-darker": "var(--color-red-600)",
  "destructive-foreground": "var(--white)",

  success: "var(--color-green-500)",
  "success-lighter": "var(--color-green-400)",
  "success-darker": "var(--color-green-600)",
  "success-foreground": "var(--white)",
} as const;

// Component-specific color tokens
const componentColors = {
  button: {
    primary: {
      background: "var(--colors-primary)",
      foreground: "var(--colors-primary-foreground)",
      hover: "var(--colors-primary-darker)",
      active: "var(--colors-primary-darker)",
      disabled: "var(--colors-primary-lighter)",
    },
    outline: {
      border: "var(--colors-muted)",
      background: "transparent",
      hover: "var(--colors-accent)",
      active: "var(--colors-accent)",
    },
  },
  input: {
    border: "var(--colors-muted)",
    background: "var(--colors-background)",
    placeholder: "var(--colors-muted-foreground)",
    focus: "var(--colors-primary)",
    disabled: {
      background: "var(--colors-muted)",
      text: "var(--colors-muted-foreground)",
    },
  },
  navigation: {
    background: "var(--colors-background)",
    item: {
      text: "var(--colors-muted-foreground)",
      "text-hover": "var(--colors-primary)",
      "text-active": "var(--colors-primary)",
      "background-hover": "var(--colors-accent)",
      "background-active": "var(--colors-accent)",
    },
  },
} as const;

export const colors = {
  base: baseColors,
  theme: themeColors,
  components: componentColors,
} as const;

// Type exports for type safety
export type BaseColors = typeof baseColors;
export type ThemeColors = typeof themeColors;
export type ComponentColors = typeof componentColors;
