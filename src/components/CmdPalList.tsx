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
  if (actions.length === 0) {
    return <CmdPalEmptyState query={query} />;
  }

  return (
    <ul
      id="cmd-list"
      role="listbox"
      aria-label="Available commands"
      className="max-h-60 overflow-y-auto py-2"
    >
      {actions.map((action, idx) => {
        const isSelected = idx === selected;

        return (
          <li
            key={action.id}
            id={`cmd-opt-${action.id}`}
            role="option"
            aria-selected={isSelected}
            tabIndex={-1}
            className={`flex items-center justify-between px-4 py-2 transition-all duration-150 ${
              isSelected
                ? "bg-blue-600/20 text-blue-400 font-medium"
                : "cursor-pointer text-slate-300 hover:bg-slate-800"
            }`}
            onMouseEnter={() => onSelectByIndex?.(idx)}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onClick={onExecute}
          >
            <span>{action.label}</span>

            {action.shortcut && (
              <span
                className={`rounded border px-1.5 py-0.5 font-mono text-xs transition-colors duration-150 ${
                  isSelected
                    ? "border-blue-700/50 bg-blue-900/40 text-blue-200"
                    : "border-slate-700 bg-slate-800 text-slate-400"
                }`}
              >
                {action.shortcut}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
