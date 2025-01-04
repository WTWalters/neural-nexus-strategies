// src/mocks/browser.ts
import { setupWorker } from "msw"; // Changed from msw/browser
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
