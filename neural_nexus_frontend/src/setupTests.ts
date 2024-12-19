// src/setupTests.ts

// Must come before any imports
import { TextEncoder, TextDecoder } from "node:util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock the BroadcastChannel
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
  BroadcastChannel: jest.fn().mockImplementation(() => mockBroadcastChannel),
});

// Now import everything else
import "@testing-library/jest-dom";
import "whatwg-fetch";
import { configure } from "@testing-library/react";
