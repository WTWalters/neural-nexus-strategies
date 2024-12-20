// neural_nexus_frontend/jest.config.js
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
  // Only show test summaries
  verbose: false,
  // Only show errors and warnings
  maxWorkers: 1,
  // Removed the reporters configuration that was causing the error
};

module.exports = createJestConfig(customJestConfig);
