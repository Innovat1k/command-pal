import { useEffect } from "react";

// Selector for focusable elements (keyboard-accessible)
const FOCUSABLE_SELECTOR =
  "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";

// Traps focus inside container (e.g., modal) when open, with initial focus and looped Tab navigation  
export function useFocusTrap(
  isOpen: boolean,
  containerRef: React.RefObject<HTMLElement | null>,
  initialFocusRef?: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    // Early exit if not open or container not ready
    if (!isOpen || !containerRef.current) {
      return;
    }

    const container = containerRef.current;

    // Set initial focus: explicit ref or first focusable element
    if (initialFocusRef?.current) {
      initialFocusRef.current.focus();
    } else {
      const firstFocusable =
        container.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      firstFocusable?.focus();
    }

    // Helper: get all focusable elements inside container
    const getFocusableElements = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

    // Handle Tab key to trap focus within container
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) {
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        // Shift + Tab: if on first element or outside container, loop to last
        if (active === first || !container.contains(active as Node)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab: if on last element or outside container, loop to first
        if (active === last || !container.contains(active as Node)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    // Cleanup: remove event listener on unmount or dependencies change
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, containerRef, initialFocusRef]);
}
