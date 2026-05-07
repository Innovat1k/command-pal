import { useState, useEffect, useCallback, useMemo } from 'react';
import type { CommandState, CommandAction } from '../types/command';
import { DEFAULT_ACTIONS } from '../lib/commands';

export function useCommandEngine() {
  const [state, setState] = useState<CommandState>({
    isOpen: false,
    query: '',
    selectedIndex: 0,
  });

// Global Ctrl/Cmd+K and Escape event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setState(prev => ({ ...prev, isOpen: !prev.isOpen, query: '', selectedIndex: 0 }));
      }
      if (e.key === 'Escape' && state.isOpen) {
        setState(prev => ({ ...prev, isOpen: false }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isOpen]);

  // Real-time filtering
  const filteredActions: CommandAction[] = useMemo(() => {
    if (!state.query.trim()) return DEFAULT_ACTIONS;
    const lower = state.query.toLowerCase();
    return DEFAULT_ACTIONS.filter(a => a.label.toLowerCase().includes(lower));
  }, [state.query]);

  const setQuery = useCallback((q: string) => setState(p => ({ ...p, query: q, selectedIndex: 0 })), []);
  
  const navigate = useCallback((dir: 'up' | 'down') => {
    setState(p => {
      const len = filteredActions.length;
      if (len === 0) return p;
      const next = dir === 'down' 
        ? (p.selectedIndex + 1) % len 
        : (p.selectedIndex - 1 + len) % len;
      return { ...p, selectedIndex: next };
    });
  }, [filteredActions]);

  const execute = useCallback(() => {
    const action = filteredActions[state.selectedIndex];
    if (action) {
      action.execute();
      setState(p => ({ ...p, isOpen: false }));
    }
  }, [filteredActions, state.selectedIndex]);

  return { state, filteredActions, setQuery, navigate, execute };
}