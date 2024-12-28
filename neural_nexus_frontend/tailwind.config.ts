// tailwind.config.ts - Updated
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Blues
        primary: {
          navy: "#000080", // Navy Blue base
          DEFAULT: "#0047AB", // Cobalt Blue base
          light: "#0067CD", // Lighter variation
          lighter: "#0087FF", // Even lighter for hover states
        },
        // Foreground section
        foreground: {
          DEFAULT: "#FFFFFF", // White text for dark backgrounds
          muted: "#334155", // Dark text for light backgrounds
        },
        // Accent Colors (Yellow-Green)
        accent: {
          DEFAULT: "#9ACD32", // Yellow-Green base
          light: "#B8DC70", // Lighter variation
          dark: "#7BA428", // Darker variation
        },
        // Neutral tones
        neutral: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#334155", // Updated to neutral-700
            a: {
              color: "#0047AB", // Updated to primary
              "&:hover": {
                color: "#0067CD", // Updated to primary-light
              },
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
