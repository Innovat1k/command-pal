import type { CommandAction } from '../types/command';

export const DEFAULT_ACTIONS: CommandAction[] = [
  { id: '1', label: 'Toggle Theme', shortcut: '⌘T', category: 'settings', execute: () => console.log('Theme toggled') },
  { id: '2', label: 'Go to Dashboard', shortcut: '⌘D', category: 'navigation', execute: () => console.log('Navigate to Dashboard') },
  { id: '3', label: 'Copy Current URL', shortcut: '⌘C', category: 'action', execute: () => navigator.clipboard?.writeText(window.location.href) },
  { id: '4', label: 'Open Settings', shortcut: '⌘S', category: 'settings', execute: () => console.log('Settings opened') },
  { id: '5', label: 'Log Out', shortcut: '⌘L', category: 'action', execute: () => console.log('Logged out') },
];