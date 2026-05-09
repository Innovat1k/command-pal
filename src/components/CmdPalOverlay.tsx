import { useRef, useCallback } from "react";
import { useCommandEngine } from "../hooks/useCommandEngine";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useExitAnimation } from "../hooks/useExitAnimation";
import { CmdPalInput } from "./CmdPalInput";
import { CmdPalList } from "./CmdPalList";

type Props = {
  onToastShow: (
    message: string,
    options?: { type?: "success" | "error" | "info"; duration?: number },
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

  useFocusTrap(state.isOpen, containerRef);
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

  if (!shouldRender) return null;
  const isExiting = !state.isOpen;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className={`fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm ${animationClass}`}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div
        ref={containerRef}
        className={`w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/10 outline-none ${isExiting ? "pointer-events-none" : ""}`}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleExecute();
          } else {
            handleOverlayKeyDown(e);
          }
        }}
        style={{ maxHeight: "80vh" }}
      >
        <CmdPalInput query={state.query} onChange={setQuery} />
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
