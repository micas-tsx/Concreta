"use client";

import { useEffect, useRef } from "react";

interface UseLiveAnnouncerOptions {
  politeness?: "polite" | "assertive";
}

export function useLiveAnnouncer(
  message: string,
  options: UseLiveAnnouncerOptions = {}
) {
  const { politeness = "polite" } = options;
  const announcerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!announcerRef.current) {
      const announcer = document.createElement("div");
      announcer.setAttribute("role", "status");
      announcer.setAttribute("aria-live", politeness);
      announcer.setAttribute("aria-atomic", "true");
      announcer.className = "sr-only";
      announcer.style.cssText =
        "position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;";
      document.body.appendChild(announcer);
      announcerRef.current = announcer;
    }

    const announcer = announcerRef.current;
    announcer.textContent = "";

    requestAnimationFrame(() => {
      announcer.textContent = message;
    });

    return () => {
      if (announcerRef.current) {
        document.body.removeChild(announcerRef.current);
        announcerRef.current = null;
      }
    };
  }, [message, politeness]);
}
