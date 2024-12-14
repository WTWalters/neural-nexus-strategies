// src/setupTests.ts
import { TextEncoder, TextDecoder } from "node:util";

// Set up TextEncoder before any other imports
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Now we can safely import the rest
import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";
import { server } from "./mocks/server";
import { JSDOM } from "jsdom";
import { Response, Request, Headers } from "undici";

// Set up window object
const dom = new JSDOM("<!doctype html><html><body></body></html>");
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Set up web API polyfills
global.Response = Response;
global.Request = Request;
global.Headers = Headers;

// Configure Testing Library
configure({
  testIdAttribute: "data-test-id",
});

// Start MSW Server
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Global test setup
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock window.matchMedia
window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));
