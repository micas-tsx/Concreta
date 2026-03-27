import { useEffect, useRef, useCallback } from "react";

interface FocusTrapOptions {
  enabled?: boolean;
  onEscape?: () => void;
  returnFocus?: boolean;
}

export function useFocusTrap<T extends HTMLElement>(
  options: FocusTrapOptions = {}
) {
  const { enabled = true, onEscape, returnFocus = true } = options;
  const containerRef = useRef<T>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    const selector = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(selector)
    );
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      if (event.key === "Escape" && onEscape) {
        onEscape();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    },
    [enabled, onEscape, getFocusableElements]
  );

  useEffect(() => {
    if (!enabled) return;

    previousActiveElement.current = document.activeElement as HTMLElement;

    const focusable = getFocusableElements();
    if (focusable.length > 0) {
      setTimeout(() => focusable[0].focus(), 0);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (returnFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [enabled, handleKeyDown, getFocusableElements, returnFocus]);

  return containerRef;
}

export function FocusTrap({
  children,
  enabled = true,
  onEscape,
}: {
  children: React.ReactNode;
  enabled?: boolean;
  onEscape?: () => void;
}) {
  const ref = useFocusTrap<HTMLDivElement>({ enabled, onEscape });

  return <div ref={ref}>{children}</div>;
}
