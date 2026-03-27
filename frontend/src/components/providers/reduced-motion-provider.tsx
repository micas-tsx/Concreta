"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ReducedMotionProvider() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
  }, [prefersReducedMotion]);

  return null;
}
