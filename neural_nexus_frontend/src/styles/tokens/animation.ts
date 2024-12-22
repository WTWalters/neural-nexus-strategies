// src/styles/tokens/animation.ts

// Duration tokens
const durations = {
  instant: '0ms',
  fastest: '100ms',
  fast: '200ms',
  normal: '300ms',
  slow: '400ms',
  slowest: '500ms',
} as const;

// Easing tokens
const easings = {
  // Standard easings
  linear: 'linear',
  
  // Ease-out (most UI elements)
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeOutFast: 'cubic-bezier(0.0, 0, 0.1, 1)',
  easeOutSlow: 'cubic-bezier(0.0, 0, 0.3, 1)',
  
  // Ease-in (elements exiting view)
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeInFast: 'cubic-bezier(0.3, 0, 1, 1)',
  easeInSlow: 'cubic-bezier(0.5, 0, 1, 1)',
  
  // Ease-in-out (changing states)
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeInOutFast: 'cubic-bezier(0.3, 0, 0.1, 1)',
  easeInOutSlow: 'cubic-bezier(0.5, 0, 0.3, 1)',
} as const;

// Animation preset tokens
const presets = {
  fade: {
    in: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    out: {
      from: { opacity: 1 },
      to: { opacity: 0 },
    },
  },
  slideUp: {
    in: {
      from: { transform: 'translateY(10px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    out: {
      from: { transform: 'translateY(0)', opacity: 1 },
      to: { transform: 'translateY(-10px)', opacity: 0 },
    },
  },
  slideDown: {
    in: {
      from: { transform: 'translateY(-10px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    out: {
      from: { transform: 'translateY(0)', opacity: 1 },
      to: { transform: 'translateY(10px)', opacity: 0 },
    },
  },
  scale: {
    in: {
      from: { transform: 'scale(0.95)', opacity: 0 },
      to: { transform: 'scale(1)', opacity: 1 },
    },
    out: {
      from: { transform: 'scale(1)', opacity: 1 },
      to: { transform: 'scale(0.95)', opacity: 0 },
    },
  },
} as const;

// Specific component animation configurations
const components = {
  button: {
    hover: {
      duration: 'fast',
      easing: 'easeOut',
    },
    active: {
      duration: 'fastest',
      easing: 'easeOut',
    },
  },
  dialog: {
    enter: {
      duration: 'normal',
      easing: 'easeOut',
      preset: 'slideUp',
    },
    exit: {
      duration: 'fast',
      easing: 'easeIn',
      preset: 'fade',
    },
  },
  tooltip: {
    enter: {
      duration: 'fast',
      easing: 'easeOutFast',
      preset: 'fade',
    },
    exit: {
      duration: 'fastest',
      easing: 'easeIn',
      preset: 'fade',
    },
  },
  menu: {
    enter: {
      duration: 'normal',
      easing: 'easeOutFast',
      preset: 'scale',
    },
    exit: {
      duration: 'fast',
      easing: 'easeIn',
      preset: 'fade',
    },
  },
} as const;

export const animation = {
  durations,
  easings,
  presets,
  components,
} as const;

// Type exports
export type AnimationDurations = typeof durations;
export type AnimationEasings = typeof easings;
export type AnimationPresets = typeof presets;
export type ComponentAnimations = typeof components;