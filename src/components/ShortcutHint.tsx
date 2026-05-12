type Props = {
  value?: string | string[];
  active?: boolean;
};

export function ShortcutHint({ value, active }: Props) {
  if (!value) return null;

  // Normalize into array
  const rawKeys =
    typeof value === "string"
      ? value
          .split("+")
          .map((k) => k.trim())
          .filter(Boolean)
      : value;

  // OS detection
  const isMac =
    /Mac|iPod|iPhone|iPad/.test(navigator.platform) ||
    /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);

  // Normalize aliases
  const normalizedKeys = rawKeys.map((k) => {
    const lower = k.toLowerCase();

    switch (lower) {
      case "cmd":
      case "command":
      case "meta":
        return "meta";

      case "ctrl":
      case "control":
        return "ctrl";

      case "shift":
        return "shift";

      case "alt":
      case "option":
        return "alt";

      case "arrowup":
        return "arrowup";

      case "arrowdown":
        return "arrowdown";

      case "arrowleft":
        return "arrowleft";

      case "arrowright":
        return "arrowright";

      case "backspace":
        return "backspace";

      default:
        return k;
    }
  });

  // OS-aware display mapping
  const displayKeys = normalizedKeys.map((k) => {
    switch (k) {
      case "meta":
        return isMac ? "⌘" : "Win";

      case "ctrl":
        return isMac ? "⌃" : "Ctrl";

      case "shift":
        return isMac ? "⇧" : "Shift";

      case "alt":
        return isMac ? "⌥" : "Alt";

      case "arrowup":
        return "↑";

      case "arrowdown":
        return "↓";

      case "arrowleft":
        return "←";

      case "arrowright":
        return "→";

      case "backspace":
        return isMac ? "⌫" : "Backspace";

      default:
        return k.length === 1 ? k.toUpperCase() : k;
    }
  });

  const baseClasses =
    "px-1.5 py-0.5 text-xs font-mono rounded border transition-colors duration-150";

  const colorClasses = active
    ? "bg-blue-100 dark:bg-blue-500/20 border-blue-200 dark:border-blue-700/50 text-blue-600 dark:text-blue-300"
    : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400";

  return (
    <span
      className="flex gap-1 items-center"
      aria-label={displayKeys.join(" + ")}
    >
      {displayKeys.map((k, i) => (
        <kbd
          key={i}
          className={`${baseClasses} ${colorClasses}`}
          aria-hidden="true"
        >
          {k}
        </kbd>
      ))}
    </span>
  );
}
