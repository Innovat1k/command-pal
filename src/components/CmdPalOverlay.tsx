import { useRef } from 'react';
import { useCommandEngine } from '../hooks/useCommandEngine';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { CmdPalInput } from './CmdPalInput';
import { CmdPalList } from './CmdPalList';

export function CmdPalOverlay() {
  const { state, filteredActions, setQuery, close, handleOverlayKeyDown, restoreFocus } = useCommandEngine();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Enables focus trap when open
  useFocusTrap(state.isOpen, containerRef, restoreFocus);

  if (!state.isOpen) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div
        ref={containerRef}
        className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/10 outline-none"
        onKeyDown={handleOverlayKeyDown}
        //Prevent body scrolling when overlay open
        style={{ maxHeight: '80vh' }}
      >
        <CmdPalInput query={state.query} onChange={setQuery} />
        <CmdPalList actions={filteredActions} selected={state.selectedIndex} />
      </div>
    </div>
  );
}