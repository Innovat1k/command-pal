import { useCallback } from "react";
import type { CommandAction } from "../types/command";

type UseCmdPalExecutionParams = {
  actions: CommandAction[];
  onToastShow: (
    msg: string,
    opts?: { type?: "success" | "error" | "info"; duration?: number },
  ) => void;
  onClose: () => void;
};

// Executes command palette actions with success feedback and auto-close
export function useCmdPalExecution({
  actions,
  onToastShow,
  onClose,
}: UseCmdPalExecutionParams) {
  // Shared internal function: execute an action + feedback + close
  const runAction = useCallback(
    (action: CommandAction) => {
      if (action.showFeedback || action.successMessage) {
        onToastShow(action.successMessage || `✓ ${action.label}`, {
          type: "success",
          duration: 2500,
        });
      }

      action.execute();
      onClose();
    },
    [onToastShow, onClose],
  );

  // For keyboard navigation: executes the selected item by index
  const executeSelected = useCallback(
    (selectedIndex: number) => {
      const action = actions[selectedIndex];
      if (!action) return;
      runAction(action);
    },
    [actions, runAction],
  );

  // For mobile click/tap: executes the targeted element directly
  const executeByIndex = useCallback(
    (index: number) => {
      const action = actions[index];
      if (!action) return;
      runAction(action);
    },
    [actions, runAction],
  );

  return { executeSelected, executeByIndex };
}
