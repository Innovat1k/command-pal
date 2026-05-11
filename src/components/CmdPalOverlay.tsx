import { useRef, useCallback } from "react";
import { useCommandEngine } from "../hooks/useCommandEngine";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useExitAnimation } from "../hooks/useExitAnimation";
import { CmdPalInput } from "./CmdPalInput";
import { CmdPalList } from "./CmdPalList";

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
  const {
    state,
    filteredActions,
    setQuery,
    close,
    handleOverlayKeyDown,
    execute,
  } = useCommandEngine();

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useFocusTrap(state.isOpen, containerRef, inputRef);

  const { shouldRender, animationClass } = useExitAnimation(state.isOpen, 200);

  const handleExecute = useCallback(() => {
    const action = filteredActions[state.selectedIndex];

    if (!action) return;

    if (action.showFeedback || action.successMessage) {
      onToastShow(action.successMessage || `✓ ${action.label}`, {
        type: "success",
        duration: 2500,
      });
    }

    execute();
  }, [filteredActions, state.selectedIndex, execute, onToastShow]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        handleExecute();
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
      className={`fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[20vh] backdrop-blur-sm ${animationClass}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          close();
        }
      }}
    >
      <div
        ref={containerRef}
        className="w-full max-w-lg overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl dark:shadow-black/40 ring-1 ring-black/5 dark:ring-white/10"
        style={{ maxHeight: "80vh" }}
      >
        <CmdPalInput
          ref={inputRef}
          query={state.query}
          onChange={setQuery}
          isExpanded={filteredActions.length > 0}
          selectedId={selectedId}
          onKeyDown={handleInputKeyDown}
        />

        <CmdPalList
          actions={filteredActions}
          selected={state.selectedIndex}
          query={state.query}
          onSelectByIndex={() => {}}
          onExecute={handleExecute}
        />
      </div>
    </div>
  );
}
