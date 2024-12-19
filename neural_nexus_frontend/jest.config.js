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
  // Silence console output in tests
  silent: true,
  // Only show test summaries, not individual test output
  verbose: false,
  // Only show errors and warnings, not info logs
  maxWorkers: 1,
  // Add custom reporters for cleaner output
  reporters: [
    "default",
    ["jest-summary-reporter", { "failuresOnly": true }]
  ]
};

module.exports = createJestConfig(customJestConfig);