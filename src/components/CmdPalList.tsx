import type { CommandAction } from '../types/command';

type Props = {
  actions: CommandAction[];
  selected: number;
  onSelect: (dir: 'up' | 'down') => void;
  onExecute: () => void;
};

export function CmdPalList({ actions, selected, onExecute }: Props) {
  if (actions.length === 0) {
    return <div className="p-4 text-center text-slate-500 text-sm">No results found.</div>;
  }

  return (
    <ul className="max-h-60 overflow-y-auto py-2" role="listbox">
      {actions.map((action, idx) => (
        <li
          key={action.id}
          role="option"
          aria-selected={idx === selected}
          className={`flex items-center justify-between px-4 py-2 cursor-pointer transition-colors ${
            idx === selected ? 'bg-blue-600/20 text-blue-400' : 'text-slate-300 hover:bg-slate-800'
          }`}
          onClick={onExecute}
        >
          <span>{action.label}</span>
          {action.shortcut && <span className="text-xs text-slate-500 font-mono bg-slate-800 px-1.5 py-0.5 rounded">{action.shortcut}</span>}
        </li>
      ))}
    </ul>
  );
}