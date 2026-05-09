import { renderHook, act } from "@testing-library/react";
import { useExitAnimation } from "../hooks/useExitAnimation";

describe("useExitAnimation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("mounts immediately with enter animation", () => {
    const { result } = renderHook(() => useExitAnimation(true, 200));
    expect(result.current.shouldRender).toBe(true);
    expect(result.current.animationClass).toBe("animate-toast-enter");
  });

  it("delays unmount during exit animation", () => {
    const { result, rerender } = renderHook(
      ({ open }) => useExitAnimation(open, 200),
      { initialProps: { open: true } },
    );

    act(() => rerender({ open: false }));
    expect(result.current.animationClass).toBe("animate-toast-exit");
    expect(result.current.shouldRender).toBe(true);

    act(() => vi.advanceTimersByTime(199));
    expect(result.current.shouldRender).toBe(true);

    act(() => vi.advanceTimersByTime(1));
    expect(result.current.shouldRender).toBe(false);
  });

  it("clears timeout safely on unmount", () => {
    const { unmount } = renderHook(() => useExitAnimation(false, 200));
    expect(() => unmount()).not.toThrow();
  });
});
