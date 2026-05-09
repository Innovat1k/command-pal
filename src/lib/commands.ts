import type { CommandAction } from '../types/command';

export const DEFAULT_ACTIONS: CommandAction[] = [
  { id: '1', label: 'Toggle Theme', shortcut: '⌘T', category: 'settings', execute: () => document.documentElement.classList.toggle('dark'), showFeedback: true },
  { id: '2', label: 'Go to Dashboard', shortcut: '⌘D', category: 'navigation', execute: () => console.log('Navigate to /dashboard') },
  { id: '3', label: 'Copy Current URL', shortcut: '⌘C', category: 'action', execute: () => navigator.clipboard?.writeText(window.location.href), successMessage: '✅ URL copied to clipboard' },
  { id: '4', label: 'Open Settings', shortcut: '⌘S', category: 'settings', execute: () => console.log('Settings opened') },
  { id: '5', label: 'Log Out', shortcut: '⌘L', category: 'action', execute: () => console.log('Logged out'), showFeedback: true },
];