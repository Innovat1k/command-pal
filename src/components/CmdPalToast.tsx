import { useEffect, useState } from "react";
import { useExitAnimation } from "../hooks/useExitAnimation";
import type { Toast } from "../hooks/useToast";

type Props = { toast: Toast | null; onClose: () => void };

export function CmdPalToast({ toast, onClose }: Props) {
  const [displayToast, setDisplayToast] = useState<Toast | null>(toast);

  const { shouldRender, animationClass } = useExitAnimation(!!toast, 200);

  // Updating Frozen Content
  useEffect(() => {
    if (toast) setDisplayToast(toast);
  }, [toast]);

  if (!shouldRender) return null;

  const colors = {
    success: "bg-green-600/90 border-green-500",
    error: "bg-red-600/90 border-red-500",
    info: "bg-slate-700/90 border-slate-600",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 right-4 z-60 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg backdrop-blur-sm transition-all ${colors[displayToast?.type || "info"]} ${animationClass}`}
    >
      <span className="text-sm text-white font-medium">
        {displayToast?.message}
      </span>
      <button
        onClick={onClose}
        className="text-white/70 hover:text-white transition-colors ml-2 cursor-pointer"
        aria-label="Close notification"
        type="button"
      >
        ✕
      </button>
    </div>
  );
}
