import { renderHook, act } from '@testing-library/react';
import { useCommandEngine } from './useCommandEngine';
import { DEFAULT_ACTIONS } from '../lib/commands';

type MockAction = {
  id: string;
  label: string;
  shortcut: string;
  category: string;
  execute: ReturnType<typeof vi.fn>;
};

vi.mock('../lib/commands', () => ({
  DEFAULT_ACTIONS: [
    { id: '1', label: 'Toggle Theme', shortcut: '⌘T', category: 'settings', execute: vi.fn() },
    { id: '2', label: 'Go to Dashboard', shortcut: '⌘D', category: 'navigation', execute: vi.fn() },
    { id: '3', label: 'Copy URL', shortcut: 'C', category: 'action', execute: vi.fn() },
  ],
}));

describe('useCommandEngine', () => {
  beforeEach(() => {
    // Reset global state
    (DEFAULT_ACTIONS as MockAction[]).forEach(a => a.execute.mockClear());
  });

  it('initializes closed with empty query', () => {
    const { result } = renderHook(() => useCommandEngine());
    expect(result.current.state.isOpen).toBe(false);
    expect(result.current.state.query).toBe('');
  });

  it('opens with Ctrl+K and resets state', () => {
    const { result } = renderHook(() => useCommandEngine());
    
    act(() => {
   // Simulate Ctrl+K
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
    });

    expect(result.current.state.isOpen).toBe(true);
    expect(result.current.state.query).toBe('');
    expect(result.current.state.selectedIndex).toBe(0);
  });

  it('filters actions based on query', () => {
    const { result } = renderHook(() => useCommandEngine());
    
    act(() => result.current.setQuery('dash'));
    expect(result.current.filteredActions).toHaveLength(1);
    expect(result.current.filteredActions[0].label).toBe('Go to Dashboard');
  });

  it('executes selected action and closes', () => {
    const { result } = renderHook(() => useCommandEngine());
    
    act(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true })));

    expect(result.current.state.isOpen).toBe(true);

    act(() => result.current.navigate('down'));
    act(() => result.current.execute());

    expect((DEFAULT_ACTIONS[1] as MockAction).execute).toHaveBeenCalled();
    expect(result.current.state.isOpen).toBe(false);
  });

  describe('Navigation & Exécution (J2)', () => {
  it('navigates down and loops correctly', () => {
    const { result } = renderHook(() => useCommandEngine());
    act(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true })));
    
    expect(result.current.state.selectedIndex).toBe(0);
    act(() => result.current.navigate('down'));
    expect(result.current.state.selectedIndex).toBe(1);
    act(() => result.current.navigate('down'));
    expect(result.current.state.selectedIndex).toBe(2);

    // Loop back to start
    act(() => result.current.navigate('down'));
    expect(result.current.state.selectedIndex).toBe(0);
  });

  it('navigates up and loops correctly', () => {
    const { result } = renderHook(() => useCommandEngine());
    act(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true })));
    
    // Go to the end
    act(() => result.current.navigate('down'));
    act(() => result.current.navigate('down'));
    expect(result.current.state.selectedIndex).toBe(2);
    
    act(() => result.current.navigate('up'));
    expect(result.current.state.selectedIndex).toBe(1);

    // Loop towards the end
    act(() => result.current.navigate('up'));
    expect(result.current.state.selectedIndex).toBe(0);
  });

  it('executes the currently selected action via Enter', () => {
    const { result } = renderHook(() => useCommandEngine());
    act(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true })));
    
    act(() => result.current.navigate('down'));
    act(() => result.current.execute());
    
    expect((DEFAULT_ACTIONS[1] as MockAction).execute).toHaveBeenCalled();
    expect(result.current.state.isOpen).toBe(false);
  });
});
});