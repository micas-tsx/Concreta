import { useEffect, useCallback } from "react";

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  handler: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrlKey ? event.ctrlKey : true;
        const metaMatch = shortcut.metaKey ? event.metaKey : true;
        const shiftMatch = shortcut.shiftKey ? event.shiftKey : true;
        const altMatch = shortcut.altKey ? event.altKey : true;

        if (
          keyMatch &&
          (shortcut.ctrlKey ? event.ctrlKey : true) &&
          (shortcut.metaKey ? event.metaKey : true) &&
          (shortcut.shiftKey ? event.shiftKey : true) &&
          (shortcut.altKey ? event.altKey : true)
        ) {
          if (
            (shortcut.ctrlKey && !event.ctrlKey) ||
            (shortcut.metaKey && !event.metaKey) ||
            (shortcut.shiftKey && !event.shiftKey) ||
            (shortcut.altKey && !event.altKey)
          ) {
            continue;
          }

          event.preventDefault();
          shortcut.handler();
          return;
        }
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}

export const KEYBOARD_SHORTCUTS = {
  SEARCH: {
    key: "k",
    ctrlKey: true,
    description: "Focar na busca",
  },
  CLEAR_SEARCH: {
    key: "Escape",
    description: "Limpar busca",
  },
  FILTER: {
    key: "f",
    ctrlKey: true,
    description: "Abrir filtros",
  },
  EXPORT: {
    key: "e",
    ctrlKey: true,
    description: "Abrir exportação",
  },
} as const;
