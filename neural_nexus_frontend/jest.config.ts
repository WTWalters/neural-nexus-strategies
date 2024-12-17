const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Add Storybook support
  transform: {
    "^.+\\.stories\\.[jt]sx?$": "@storybook/addon-storyshots/injectFileName",
  },
};

module.exports = createJestConfig(customJestConfig);
