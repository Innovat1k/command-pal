import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { CommandState, CommandAction } from '../types/command';
import { DEFAULT_ACTIONS } from '../lib/commands';

// Manages command palette state, filtering, and keyboard navigation with global Ctrl+K toggle
export function useCommandEngine() {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [state, setState] = useState<CommandState>({
    isOpen: false,
    query: '',
    selectedIndex: 0,
  });

  // Global shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();

        // Save current focused element BEFORE opening
        previousFocusRef.current = document.activeElement as HTMLElement;

        setState({
          isOpen: true,
          query: '',
          selectedIndex: 0,
        });
      }

      // Close palette
      if (e.key === 'Escape') {
        setState(prev => ({
          ...prev,
          isOpen: false,
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Filter actions
  const filteredActions: CommandAction[] = useMemo(() => {
    if (!state.query.trim()) return DEFAULT_ACTIONS;

    const lower = state.query.toLowerCase();

    return DEFAULT_ACTIONS.filter(action =>
      action.label.toLowerCase().includes(lower)
    );
  }, [state.query]);

  // Query setter
  const setQuery = useCallback((query: string) => {
    setState(prev => ({
      ...prev,
      query,
      selectedIndex: 0,
    }));
  }, []);

  // Close palette
  const close = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  // Keyboard navigation
  const navigate = useCallback(
    (direction: 'up' | 'down') => {
      setState(prev => {
        const length = filteredActions.length;

        if (length === 0) return prev;

        const nextIndex =
          direction === 'down'
            ? (prev.selectedIndex + 1) % length
            : (prev.selectedIndex - 1 + length) % length;

        return {
          ...prev,
          selectedIndex: nextIndex,
        };
      });
    },
    [filteredActions]
  );

  // Execute selected action
  const execute = useCallback(() => {
    const action = filteredActions[state.selectedIndex];

    if (!action) return;

    action.execute();

    setState(prev => ({
      ...prev,
      isOpen: false,
    }));
  }, [filteredActions, state.selectedIndex]);

  // Overlay keyboard manager
  const handleOverlayKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        navigate('down');
      }

      else if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigate('up');
      }

      else if (e.key === 'Enter') {
        e.preventDefault();
        execute();
      }
    },
    [navigate, execute]
  );

  const restoreFocus = useCallback(() => {
  previousFocusRef.current?.focus();
}, []);

  return {
    state,
    filteredActions,
    setQuery,
    close,
    navigate,
    execute,
    handleOverlayKeyDown,
    restoreFocus,
  };
}