import "@testing-library/jest-dom";
import { beforeEach, vi } from "vitest";

beforeEach(() => {
  vi.clearAllMocks();
});

// Mock scrollIntoView for jsdom environment
Object.defineProperty(window.HTMLElement.prototype, "scrollIntoView", {
  value: function (_options?: ScrollIntoViewOptions) {},
  writable: true,
});
