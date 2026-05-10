import { forwardRef } from "react";

type Props = {
  query: string;
  onChange: (q: string) => void;
  isExpanded: boolean;
  selectedId?: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const CmdPalInput = forwardRef<HTMLInputElement, Props>(
  ({ query, onChange, isExpanded, selectedId, onKeyDown }, ref) => {
    return (
      <div className="flex items-center border-b border-slate-700 px-4 py-3">
        <span aria-hidden="true" className="mr-2 text-slate-400">
          🔍
        </span>

        <input
          ref={ref}
          type="text"
          role="combobox"
          aria-label="Search for a command or action"
          aria-expanded={isExpanded}
          aria-controls="cmd-list"
          aria-autocomplete="list"
          aria-activedescendant={selectedId}
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type a command or search..."
          className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
          autoFocus
        />
      </div>
    );
  },
);

CmdPalInput.displayName = "CmdPalInput";
