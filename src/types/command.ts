export type ActionCategory = "navigation" | "action" | "settings";

export type CommandAction = {
  id: string;
  label: string;
  shortcut?: string;
  category: ActionCategory;
  execute: () => void;
  showFeedback?: boolean;
  successMessage?: string;
};

export type CommandState = {
  isOpen: boolean;
  query: string;
  selectedIndex: number;
};
