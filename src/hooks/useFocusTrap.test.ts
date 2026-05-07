import { renderHook, act } from '@testing-library/react';
import { useFocusTrap } from './useFocusTrap';

describe('useFocusTrap', () => {
  let container: HTMLElement;
  let focusableElements: HTMLElement[];
  let restoreFocusMock: () => void;

  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = `
      <input data-testid="input-1" />
      <button data-testid="button-1">Btn 1</button>
      <button data-testid="button-2">Btn 2</button>
      <input data-testid="input-2" />
    `;
    document.body.appendChild(container);

    focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );

    restoreFocusMock = vi.fn();
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('does nothing when isOpen is false', () => {
    const ref = { current: container };
    renderHook(() => useFocusTrap(false, ref, restoreFocusMock));

    expect(document.activeElement).not.toBe(focusableElements[0]);
    expect(restoreFocusMock).not.toHaveBeenCalled();
  });

  it('does nothing when containerRef.current is null', () => {
    const ref = { current: null };
    renderHook(() => useFocusTrap(true, ref, restoreFocusMock));

    expect(document.activeElement).not.toBe(focusableElements[0]);
    expect(restoreFocusMock).not.toHaveBeenCalled();
  });

  it('focuses first focusable element when opened', () => {
    const ref = { current: container };
    
    act(() => {
      renderHook(() => useFocusTrap(true, ref, restoreFocusMock));
    });

    expect(focusableElements[0]).toBe(document.activeElement);
  });

  it('traps Tab key: loops from last to first', () => {
    const ref = { current: container };
    
    act(() => {
      renderHook(() => useFocusTrap(true, ref, restoreFocusMock));
    });

    focusableElements[0].focus();
    expect(document.activeElement).toBe(focusableElements[0]);

    act(() => {
      focusableElements[focusableElements.length - 1].focus();
      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    });

    expect(document.activeElement).toBe(focusableElements[0]);
  });

  it('traps Shift+Tab: loops from first to last', () => {
    const ref = { current: container };
    
    act(() => {
      renderHook(() => useFocusTrap(true, ref, restoreFocusMock));
    });

    focusableElements[0].focus();

    act(() => {
      container.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true })
      );
    });

    expect(document.activeElement).toBe(
      focusableElements[focusableElements.length - 1]
    );
  });

  it('ignores non-Tab keys', () => {
    const ref = { current: container };
    
    act(() => {
      renderHook(() => useFocusTrap(true, ref, restoreFocusMock));
    });

    focusableElements[0].focus();

    act(() => {
      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });

    expect(document.activeElement).toBe(focusableElements[0]);
  });

  it('restores focus via callback on cleanup', () => {
    const ref = { current: container };
    const { unmount } = renderHook(() =>
      useFocusTrap(true, ref, restoreFocusMock)
    );

    act(() => {
      unmount();
    });

    expect(restoreFocusMock).toHaveBeenCalledTimes(1);
  });

  it('handles empty focusable list gracefully', () => {
    const emptyContainer = document.createElement('div');
    emptyContainer.innerHTML = '<p>No interactive elements</p>';
    document.body.appendChild(emptyContainer);

    const ref = { current: emptyContainer };
    
    expect(() => {
      act(() => {
        renderHook(() => useFocusTrap(true, ref, restoreFocusMock));
      });
    }).not.toThrow();

    expect(restoreFocusMock).not.toHaveBeenCalled();

    document.body.removeChild(emptyContainer);
  });

  it('updates when isOpen changes', () => {
    const ref = { current: container };
    const { rerender } = renderHook(
      ({ open }) => useFocusTrap(open, ref, restoreFocusMock),
      { initialProps: { open: false } }
    );

    expect(document.activeElement).not.toBe(focusableElements[0]);

    act(() => {
      rerender({ open: true });
    });
    expect(focusableElements[0]).toBe(document.activeElement);

    act(() => {
      rerender({ open: false });
    });
    expect(restoreFocusMock).toHaveBeenCalledTimes(1);
  });
});