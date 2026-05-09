import { renderHook, act } from '@testing-library/react';
import { useToast } from '../hooks/useToast';

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with no toast', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toast).toBeNull();
  });

  it('shows a toast with default values', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.show('Hello world');
    });

    expect(result.current.toast).toEqual({
      id: expect.any(String),
      message: 'Hello world',
      type: 'info',
      duration: 2000,
    });
  });

  it('shows a toast with custom options', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.show('Custom toast', {
        type: 'success',
        duration: 5000,
      });
    });

    expect(result.current.toast).toEqual({
      id: expect.any(String),
      message: 'Custom toast',
      type: 'success',
      duration: 5000,
    });
  });

  it('hides toast manually', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.show('Test');
    });
    expect(result.current.toast).not.toBeNull();

    act(() => {
      result.current.hide();
    });
    expect(result.current.toast).toBeNull();
  });

  it('auto-dismisses toast after default duration', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.show('Auto-dismiss test');
    });
    expect(result.current.toast).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.toast).toBeNull();
  });

  it('auto-dismisses toast after custom duration', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.show('Custom duration', { duration: 3500 });
    });
    expect(result.current.toast).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(3499);
    });
    expect(result.current.toast).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current.toast).toBeNull();
  });

  it('clears timeout on manual hide (no double-dismiss)', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.show('Test');
    });

    act(() => {
      result.current.hide();
    });
    expect(result.current.toast).toBeNull();

    // Advancing time should not restart anything
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.toast).toBeNull();
  });

  it('does not auto-dismiss if duration is 0 or undefined', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.show('Persistent', { duration: 0 });
    });
    expect(result.current.toast).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(result.current.toast).not.toBeNull();
  });
});