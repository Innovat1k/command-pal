import { useEffect, useState } from "react";
import { useExitAnimation } from "../hooks/useExitAnimation";
import type { Toast } from "../hooks/useToast";

type Props = { toast: Toast | null; onClose: () => void };

export function CmdPalToast({ toast, onClose }: Props) {
  const [displayToast, setDisplayToast] = useState<Toast | null>(null);

  const { shouldRender, animationClass } = useExitAnimation(!!toast, 200);

  useEffect(() => {
    // Legitimate pattern: we “freeze” the toast during the exit animation
    // to prevent it from becoming empty before the end of the fade-out.
    if (toast) setDisplayToast(toast);
  }, [toast]);

  if (!shouldRender) return null;

  const base =
    "bg-white/90 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white backdrop-blur-md";

  const accents = {
    success: "border-l-4 border-emerald-500",
    error: "border-l-4 border-red-500",
    info: "border-l-4 border-slate-400",
  };

  const type = displayToast?.type || "info";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg dark:shadow-black/40 transition-all ${base} ${accents[type]} ${animationClass}`}
    >
      <span className="text-sm font-medium">{displayToast?.message}</span>

      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
        aria-label="Close notification"
        type="button"
      >
        ✕
      </button>
    </div>
  );
}
