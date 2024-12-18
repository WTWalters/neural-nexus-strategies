/**
 * @fileoverview Configuration file for Storybook manager UI customization.
 * Sets up custom theming and branding for the Storybook interface.
 */

import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

/**
 * Configure Storybook's manager UI with custom theming.
 * Sets light mode as base theme and customizes branding elements.
 */
addons.setConfig({
  theme: create({
    /** Base theme setting - 'light' or 'dark' */
    base: "light",
    /** Custom title displayed in Storybook's header */
    brandTitle: "Neural Nexus Strategies",
    /** URL for brand title link */
    brandUrl: "https://neuralnexus.com",
    /** Target attribute for brand URL link */
    brandTarget: "_self",
  }),
});
