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

  it("focuses provided initial focus element", () => {
    const ref = { current: container };

    const target = focusableElements[2];

    const initialFocusRef = {
      current: target,
    };

    act(() => {
      renderHook(() => useFocusTrap(true, ref, initialFocusRef));
    });

    expect(document.activeElement).toBe(target);
  });

  it("traps Tab key from last to first", () => {
    const ref = { current: container };

    act(() => {
      renderHook(() => useFocusTrap(true, ref));
    });

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    act(() => {
      last.focus();

      container.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Tab",
        }),
      );
    });

    expect(document.activeElement).toBe(first);
  });

  it("traps Shift+Tab from first to last", () => {
    const ref = { current: container };

    act(() => {
      renderHook(() => useFocusTrap(true, ref));
    });

    const first = focusableElements[0];

    const last = focusableElements[focusableElements.length - 1];

    act(() => {
      first.focus();

      container.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Tab",
          shiftKey: true,
        }),
      );
    });

    expect(document.activeElement).toBe(last);
  });

  it("ignores non-Tab keys", () => {
    const ref = { current: container };

    act(() => {
      renderHook(() => useFocusTrap(true, ref));
    });

    focusableElements[0].focus();

    act(() => {
      container.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Enter",
        }),
      );
    });

    expect(document.activeElement).toBe(focusableElements[0]);
  });

  it("handles empty focusable list gracefully", () => {
    const emptyContainer = document.createElement("div");

    emptyContainer.innerHTML = "<p>No interactive elements</p>";

    document.body.appendChild(emptyContainer);

    const ref = {
      current: emptyContainer,
    };

    expect(() => {
      act(() => {
        renderHook(() => useFocusTrap(true, ref));
      });
    }).not.toThrow();

    document.body.removeChild(emptyContainer);
  });
});
