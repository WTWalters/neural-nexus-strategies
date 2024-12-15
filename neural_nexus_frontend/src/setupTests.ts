// src/setupTests.ts

// Must come before any imports or other code
import { TextEncoder, TextDecoder } from "node:util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock the Node environment
const mockBroadcastChannel = {
  name: "",
  postMessage: jest.fn(),
  onmessage: jest.fn(),
  onmessageerror: jest.fn(),
  close: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
};

Object.assign(global, {
  // Don't redefine TextEncoder/TextDecoder here since we did it above
  BroadcastChannel: jest.fn().mockImplementation(() => mockBroadcastChannel),
  Response: class Response {},
  Request: class Request {},
  Headers: class Headers {},
});

// Now import everything else
import "@testing-library/jest-dom";
import "whatwg-fetch";
import { configure } from "@testing-library/react";
import { server } from "./mocks/server";

// Rest of the setup...
