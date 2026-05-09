import type { CommandAction } from "../types/command";
import { CmdPalEmptyState } from "./CmdPalEmptyState";

type Props = {
  actions: CommandAction[];
  selected: number;
  query: string;
  onSelectByIndex?: (idx: number) => void;
  onExecute: () => void;
};

export function CmdPalList({
  actions,
  selected,
  query,
  onSelectByIndex,
  onExecute,
}: Props) {
  if (actions.length === 0) return <CmdPalEmptyState query={query} />;

  return (
    <ul
      className="max-h-60 overflow-y-auto py-2"
      role="listbox"
      aria-label="Available commands"
      aria-activedescendant={
        selected >= 0 && selected < actions.length
          ? `cmd-opt-${actions[selected].id}`
          : undefined
      }
    >
      {actions.map((action, idx) => (
        <li
          key={action.id}
          id={`cmd-opt-${action.id}`}
          role="option"
          aria-selected={idx === selected}
          tabIndex={-1}
          className={`flex items-center justify-between px-4 py-2 transition-all duration-150 ${
            idx === selected
              ? "bg-blue-600/20 text-blue-400 font-medium"
              : "text-slate-300 hover:bg-slate-800 cursor-pointer"
          }`}
          onClick={onExecute}
          onMouseEnter={() => onSelectByIndex?.(idx)}
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
