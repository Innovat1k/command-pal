import { useEffect } from "react";
import type { CommandAction } from "../types/command";
import { CmdPalEmptyState } from "./CmdPalEmptyState";
import { ShortcutHint } from "./ShortcutHint";

type Props = {
  actions: CommandAction[];
  selected: number;
  query: string;
  onSelectByIndex?: (idx: number) => void;
  onExecute: (idx: number) => void;
};

export function CmdPalList({
  actions,
  selected,
  query,
  onSelectByIndex,
  onExecute,
}: Props) {
  // Auto scroll to selected element
  useEffect(() => {
    if (selected >= 0 && actions[selected]) {
      const selectedElement = document.getElementById(
        `cmd-opt-${actions[selected].id}`,
      );

      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "auto",
        });
      }
    }
  }, [selected, actions]);

  if (actions.length === 0) {
    return <CmdPalEmptyState query={query} />;
  }

  return (
    <ul
      id="cmd-list"
      role="listbox"
      aria-label="Available commands"
      className="h-full sm:max-h-60 overflow-y-auto py-2"
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
            className={`flex items-center justify-between px-4 py-3 sm:py-2 transition-all duration-150 min-h-11 ${
              isSelected
                ? "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 font-medium"
                : "text-slate-700 dark:text-slate-300 sm:hover:bg-slate-100 dark:sm:hover:bg-slate-800 cursor-pointer"
            }`}
            onMouseEnter={() => onSelectByIndex?.(idx)}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onExecute(idx)}
          >
            <span>{action.label}</span>

            {action.shortcut && (
              <ShortcutHint value={action.shortcut} active={isSelected} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
