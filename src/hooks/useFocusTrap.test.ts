import { renderHook, act } from "@testing-library/react";
import { useFocusTrap } from "./useFocusTrap";

describe("useFocusTrap", () => {
  let container: HTMLElement;
  let focusableElements: HTMLElement[];

  beforeEach(() => {
    container = document.createElement("div");
    container.innerHTML = `
      <input data-testid="input-1" />
      <button data-testid="button-1">Btn 1</button>
      <button data-testid="button-2">Btn 2</button>
      <input data-testid="input-2" />
    `;
    document.body.appendChild(container);

    focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    );
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("does nothing when isOpen is false", () => {
    const ref = { current: container };
    renderHook(() => useFocusTrap(false, ref));

    expect(document.activeElement).not.toBe(focusableElements[0]);
  });

  it("does nothing when containerRef.current is null", () => {
    const ref = { current: null };
    renderHook(() => useFocusTrap(true, ref));

    expect(document.activeElement).not.toBe(focusableElements[0]);
  });

  it("focuses first focusable element when opened", () => {
    const ref = { current: container };

    act(() => {
      renderHook(() => useFocusTrap(true, ref));
    });

    expect(focusableElements[0]).toBe(document.activeElement);
  });

  it("traps Tab key: loops from last to first", () => {
    const ref = { current: container };

    act(() => {
      renderHook(() => useFocusTrap(true, ref));
    });

    focusableElements[0].focus();
    expect(document.activeElement).toBe(focusableElements[0]);

    act(() => {
      focusableElements[focusableElements.length - 1].focus();
      container.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }));
    });

    expect(document.activeElement).toBe(focusableElements[0]);
  });

  it("traps Shift+Tab: loops from first to last", () => {
    const ref = { current: container };

    act(() => {
      renderHook(() => useFocusTrap(true, ref));
    });

    focusableElements[0].focus();

    act(() => {
      container.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Tab", shiftKey: true }),
      );
    });

    expect(document.activeElement).toBe(
      focusableElements[focusableElements.length - 1],
    );
  });

  it("ignores non-Tab keys", () => {
    const ref = { current: container };

    act(() => {
      renderHook(() => useFocusTrap(true, ref));
    });

    focusableElements[0].focus();

    act(() => {
      container.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    });

    expect(document.activeElement).toBe(focusableElements[0]);
  });

  it("handles empty focusable list gracefully", () => {
    const emptyContainer = document.createElement("div");
    emptyContainer.innerHTML = "<p>No interactive elements</p>";
    document.body.appendChild(emptyContainer);

    const ref = { current: emptyContainer };

    expect(() => {
      act(() => {
        renderHook(() => useFocusTrap(true, ref));
      });
    }).not.toThrow();

    document.body.removeChild(emptyContainer);
  });
});
