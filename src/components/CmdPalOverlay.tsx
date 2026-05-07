import { useCommandEngine } from '../hooks/useCommandEngine';
import { CmdPalInput } from './CmdPalInput';
import { CmdPalList } from './CmdPalList';

export function CmdPalOverlay() {
  const { state, filteredActions, setQuery, navigate, execute } = useCommandEngine();

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/10" role='dialog' aria-modal="true">
        <CmdPalInput query={state.query} onChange={setQuery} />
        <CmdPalList 
          actions={filteredActions} 
          selected={state.selectedIndex} 
          onSelect={navigate}
          onExecute={execute}
        />
      </div>
    </div>
  );
}