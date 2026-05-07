import type { CommandAction } from '../types/command';

type Props = {
  actions: CommandAction[];
  selected: number;
};

export function CmdPalList({ actions, selected }: Props) {
  if (actions.length === 0) {
    return (
      <div 
        role="status" 
        aria-live="polite" 
        className="p-4 text-center text-slate-500 text-sm"
      >
        No results found.
      </div>
    );
  }

  return (
    <ul 
      className="max-h-60 overflow-y-auto py-2" 
      role="listbox"
      aria-label="Available commands"
      aria-activedescendant={selected >= 0 && selected < actions.length ? `cmd-opt-${actions[selected].id}` : undefined}
    >
      {actions.map((action, idx) => (
        <li
          key={action.id}
          id={`cmd-opt-${action.id}`}
          role="option"
          aria-selected={idx === selected}
          tabIndex={-1}
          className={`flex items-center justify-between px-4 py-2 transition-colors ${
            idx === selected 
              ? 'bg-blue-600/20 text-blue-400 font-medium' 
              : 'text-slate-300 hover:bg-slate-800 cursor-pointer'
          }`}
          onClick={() => action.execute()}
        >
          <span>{action.label}</span>
          {action.shortcut && (
            <span className="text-xs text-slate-500 font-mono bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
              {action.shortcut}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}