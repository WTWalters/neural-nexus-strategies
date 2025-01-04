// src/test/setup.ts
import "@testing-library/jest-dom";
import "jest-styled-components";

// Mock CSS custom properties
Object.defineProperty(window, "getComputedStyle", {
  value: (elem: Element) => ({
    getPropertyValue: (prop: string) => {
      return prop === "--font-heading" ? "heading-font" : "body-font";
    },
  }),
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
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

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

Object.assign(global, {
  BroadcastChannel: jest.fn().mockImplementation(() => mockBroadcastChannel),
});

// Now import everything else
import "@testing-library/jest-dom";
import "whatwg-fetch";
import { configure } from "@testing-library/react";
