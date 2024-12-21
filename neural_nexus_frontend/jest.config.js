// neural_nexus_frontend/jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: [
    "<rootDir>/src/test/setup.ts", // Updated path to match our new setup file
    "<rootDir>/src/setupTests.ts", // Keep existing setup if needed
  ],
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
};

module.exports = createJestConfig(customJestConfig);
