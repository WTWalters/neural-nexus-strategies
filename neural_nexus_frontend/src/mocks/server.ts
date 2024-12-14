// src/mocks/server.ts
const { setupServer } = require("msw/node"); // Use require instead of import
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

export function createServer() {
  return server;
}
