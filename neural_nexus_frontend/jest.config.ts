import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
    "^msw/node$": "<rootDir>/node_modules/msw/node/index.js",
    "^msw/browser$": "<rootDir>/node_modules/msw/browser/index.js",
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transformIgnorePatterns: ["node_modules/(?!(msw|@mswjs)/)"],
  modulePathIgnorePatterns: ["<rootDir>/node_modules/msw/node"],
};

export default createJestConfig(customJestConfig);
