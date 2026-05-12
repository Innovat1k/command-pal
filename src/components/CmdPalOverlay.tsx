import { useRef } from "react";
import { useCommandEngine } from "../hooks/useCommandEngine";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useExitAnimation } from "../hooks/useExitAnimation";
import { CmdPalInput } from "./CmdPalInput";
import { CmdPalList } from "./CmdPalList";
import { useCmdPalExecution } from "../hooks/useCmdPalExecution";

type Props = {
  onToastShow: (
    message: string,
    options?: {
      type?: "success" | "error" | "info";
      duration?: number;
    },
  ) => void;
};

export function CmdPalOverlay({ onToastShow }: Props) {
  const { state, filteredActions, setQuery, close, handleOverlayKeyDown } =
    useCommandEngine();

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useFocusTrap(state.isOpen, containerRef, inputRef);

  const { shouldRender, animationClass } = useExitAnimation(state.isOpen, 200);

  const { executeSelected, executeByIndex } = useCmdPalExecution({
    actions: filteredActions,
    onToastShow,
    onClose: close,
  });

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        executeSelected(state.selectedIndex);
        break;

      default:
        handleOverlayKeyDown(e);
        break;
    }
  };

  if (!shouldRender) return null;

  const selectedId =
    state.selectedIndex >= 0 && state.selectedIndex < filteredActions.length
      ? `cmd-opt-${filteredActions[state.selectedIndex].id}`
      : undefined;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className={`fixed inset-0 z-50 flex flex-col sm:items-center sm:justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-200 sm:pt-[15vh] sm:px-4 ${animationClass}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          close();
        }
      }}
    >
      <div
        ref={containerRef}
        className={`w-full flex flex-col overflow-hidden bg-white dark:bg-slate-900 shadow-2xl
        sm:border sm:border-slate-200 dark:sm:border-slate-700 sm:shadow-xl sm:ring-1 sm:ring-black/5 dark:sm:ring-white/10 h-dvh sm:h-auto sm:max-w-lg sm:rounded-xl sm:m-4 sm:max-h-[80vh] rounded-t-2xl`}
        style={{ maxHeight: "80vh" }}
      >
        <div className="shrink-0 border-b border-slate-200 dark:border-slate-700">
          <CmdPalInput
            ref={inputRef}
            query={state.query}
            onChange={setQuery}
            isExpanded={filteredActions.length > 0}
            selectedId={selectedId}
            onKeyDown={handleInputKeyDown}
          />
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 overscroll-contain">
          <CmdPalList
            actions={filteredActions}
            selected={state.selectedIndex}
            query={state.query}
            onExecute={executeByIndex}
          />
        </div>
      </div>
    </div>
  );
}
