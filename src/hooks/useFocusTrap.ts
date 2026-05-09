import { useEffect } from "react";

// Traps focus inside container (e.g., modal) when open, with initial focus and looped Tab navigation
export function useFocusTrap(
  isOpen: boolean,
  containerRef: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const container = containerRef.current;

    // Focusable selector
    const selector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(selector),
    );

    // Initial focus
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    // Focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const active = document.activeElement;

      // Shift + Tab
      if (e.shiftKey) {
        if (active === first || !container.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      }

      // Tab
      else {
        if (active === last || !container.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, containerRef]);
}
