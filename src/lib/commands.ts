import type { CommandAction } from "../types/command";

declare global {
  interface Window {
    chrome?: {
      devtools?: {
        open?: () => void;
      };
    };
  }
}

export const DEFAULT_ACTIONS: CommandAction[] = [
  // 🧭 Navigation
  {
    id: "nav-dashboard",
    label: "Go to Dashboard",
    shortcut: "Meta+D",
    category: "navigation",
    execute: () => {
      window.location.href = "/dashboard";
    },
  },
  {
    id: "nav-settings",
    label: "Open Settings",
    shortcut: "Meta+S",
    category: "navigation",
    execute: () => {
      window.location.href = "/settings";
    },
  },
  {
    id: "nav-profile",
    label: "View Profile",
    shortcut: "Meta+P",
    category: "navigation",
    execute: () => {
      window.location.href = "/profile";
    },
  },
  {
    id: "nav-back",
    label: "Go Back",
    shortcut: "Meta+[",
    category: "navigation",
    execute: () => {
      window.history.back();
    },
  },
  {
    id: "nav-forward",
    label: "Go Forward",
    shortcut: "Meta+]",
    category: "navigation",
    execute: () => {
      window.history.forward();
    },
  },

  // ⚡ Actions
  {
    id: "action-copy-url",
    label: "Copy Current URL",
    shortcut: "Meta+C",
    category: "action",
    execute: async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch (err) {
        console.error("Failed to copy URL:", err);
      }
    },
    successMessage: "✅ URL copied to clipboard",
    showFeedback: true,
  },
  {
    id: "action-copy-title",
    label: "Copy Page Title",
    shortcut: "Meta+T",
    category: "action",
    execute: async () => {
      try {
        await navigator.clipboard.writeText(document.title);
      } catch (err) {
        console.error("Failed to copy title:", err);
      }
    },
    successMessage: "✅ Page title copied",
    showFeedback: true,
  },
  {
    id: "action-print",
    label: "Print Page",
    shortcut: "Meta+P",
    category: "action",
    execute: () => {
      window.print();
    },
  },
  {
    id: "action-scroll-top",
    label: "Scroll to Top",
    shortcut: "Meta+↑",
    category: "action",
    execute: () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    showFeedback: true,
  },
  {
    id: "action-scroll-bottom",
    label: "Scroll to Bottom",
    shortcut: "Meta+↓",
    category: "action",
    execute: () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    },
    showFeedback: true,
  },

  // ⚙️ Settings
  {
    id: "settings-toggle-theme",
    label: "Toggle Dark Mode",
    shortcut: "Meta+L",
    category: "settings",
    execute: () => {
      const html = document.documentElement;
      const isDark = html.classList.toggle("dark");
      localStorage.setItem("cmdpal-theme", isDark ? "dark" : "light");
    },
    showFeedback: true,
    get successMessage() {
      return document.documentElement.classList.contains("dark")
        ? "☀️ Light mode activated"
        : "🌙 Dark mode activated";
    },
  },
  {
    id: "settings-clear-storage",
    label: "Clear Local Storage",
    shortcut: "Meta+⌫",
    category: "settings",
    execute: () => {
      if (confirm("Clear all local storage for this site?")) {
        localStorage.clear();
        sessionStorage.clear();
      }
    },
    successMessage: "🗑️ Storage cleared",
    showFeedback: true,
  },
  {
    id: "settings-view-storage",
    label: "View Local Storage",
    category: "settings",
    execute: () => {
      const data = Object.entries(localStorage)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      alert(`Local Storage:\n\n${data || "(empty)"}`);
    },
  },
  {
    id: "settings-devtools",
    label: "Open DevTools",
    shortcut: "Meta+I",
    category: "settings",
    execute: () => {
      (window as any).chrome?.devtools?.open();
      console.log("💡 Press F12 or Ctrl+Shift+I to open DevTools");
    },
  },
];
