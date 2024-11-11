/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Primary (Deep Space Blue)
        primary: {
          50: '#ebeeff',
          100: '#c8d0f0',
          200: '#a6b2dd',
          300: '#8494c6',
          400: '#6276ae',
          500: '#415896',
          600: '#374b80',
          700: '#2d3e69',
          800: '#243153',
          900: '#1a2342',
        },
        // Success (Neural Green)
        success: {
          300: '#1dbf8a',
          400: '#1aa477',
          500: '#168964',
          600: '#126e52',
          700: '#0d543f',
        },
        // Innovation (Data Purple)
        innovation: {
          300: '#8b5cf6',
          400: '#7c3aed',
          500: '#6d28d9',
          600: '#5b21b6',
          700: '#4c1d95',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: '0' },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: '0' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
