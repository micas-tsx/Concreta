import { useEffect, useState, useCallback } from "react";

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

export function useReducedMotionValue<T>(
  valueForMotion: T,
  valueForNoMotion: T
): T {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? valueForNoMotion : valueForMotion;
}

export function getAnimationDuration(duration: number): number {
  if (typeof window === "undefined") return duration;
  
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  
  return prefersReducedMotion ? 0 : duration;
}
