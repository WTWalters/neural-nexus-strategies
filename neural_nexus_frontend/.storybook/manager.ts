import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Neural Nexus Strategies",
    brandUrl: "https://neuralnexus.com",
    brandTarget: "_self",
  }),
});
