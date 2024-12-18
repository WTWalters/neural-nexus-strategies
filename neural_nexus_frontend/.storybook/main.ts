/**
 * @fileoverview Main configuration file for Storybook.
 * Configures stories, addons, framework settings, and webpack for the Storybook instance.
 */

import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

/**
 * Main Storybook configuration object.
 * @type {StorybookConfig}
 */
const config: StorybookConfig = {
  /** Pattern matching for story files */
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  /** List of Storybook addons to be included */
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-styling",
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-styling",
      options: {
        postCss: true,
      },
    },
  ],

  /** Framework configuration */
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  /** Documentation settings */
  docs: {
    autodocs: "tag",
  },

  /** Static files directory */
  staticDirs: ["../public"],

  /**
   * Custom webpack configuration function.
   * @param {Object} config - The default webpack config object
   * @return {Promise<Object>} Modified webpack configuration
   */
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
      };
    }
    return config;
  },
};

export default config;
