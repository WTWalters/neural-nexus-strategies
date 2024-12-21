// File: src/docs/token-mapping-guide.ts

/**
 * Token Mapping Guide
 * This guide shows how to map our new semantic tokens to components
 */

// BUTTON COMPONENT EXAMPLE
// Before:
const buttonBefore = {
  variants: {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent",
  },
};

// After:
const buttonAfter = {
  variants: {
    default: cn(
      "bg-[var(--colors-button-primary-background)]",
      "text-[var(--colors-button-primary-foreground)]",
      "hover:bg-[var(--colors-button-primary-hover)]",
      "active:bg-[var(--colors-button-primary-active)]",
      "disabled:bg-[var(--colors-button-primary-disabled)]",
    ),
    destructive: cn(
      "bg-[var(--colors-destructive)]",
      "text-[var(--colors-destructive-foreground)]",
      "hover:bg-[var(--colors-destructive-darker)]",
    ),
    outline: cn(
      "border border-[var(--colors-button-outline-border)]",
      "bg-[var(--colors-button-outline-background)]",
      "hover:bg-[var(--colors-button-outline-hover)]",
    ),
  },
};

// NAVIGATION COMPONENT EXAMPLE
// Before:
const navBefore = {
  item: "text-foreground/70 hover:text-foreground hover:bg-accent",
  active: "bg-accent text-accent-foreground",
};

// After:
const navAfter = {
  item: cn(
    "text-[var(--colors-navigation-item-text)]",
    "hover:text-[var(--colors-navigation-item-text-hover)]",
    "hover:bg-[var(--colors-navigation-item-background-hover)]",
  ),
  active: cn(
    "text-[var(--colors-navigation-item-text-active)]",
    "bg-[var(--colors-navigation-item-background-active)]",
  ),
};

// INPUT COMPONENT EXAMPLE
// Before:
const inputBefore = {
  base: "border border-input bg-background",
  focus: "focus-visible:ring-2 focus-visible:ring-ring",
};

// After:
const inputAfter = {
  base: cn(
    "border border-[var(--colors-input-border)]",
    "bg-[var(--colors-input-background)]",
    "placeholder:text-[var(--colors-input-placeholder)]",
  ),
  focus: cn(
    "focus-visible:border-[var(--colors-input-focus)]",
    "focus-visible:ring-2",
    "focus-visible:ring-[var(--colors-input-focus)]",
  ),
  disabled: cn(
    "bg-[var(--colors-input-disabled-background)]",
    "text-[var(--colors-input-disabled-text)]",
  ),
};

/**
 * Migration Steps:
 * 1. Update component styles to use new semantic tokens
 * 2. Use the `cn()` utility for combining classes
 * 3. Test all states: default, hover, active, disabled
 * 4. Verify contrast ratios meet accessibility standards
 *
 * Benefits:
 * - More consistent component styles
 * - Better state management
 * - Clearer component-specific tokens
 * - Improved maintainability
 */
