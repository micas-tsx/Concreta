"use client";

import { useEffect } from "react";
import { useFilterStore } from "@/store/filter-store";

export function KeyboardShortcutsProvider() {
  const { setFilter, filters } = useFilterStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>('[placeholder*="Buscar"]');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }

      if (event.key === "Escape" && filters.busca) {
        setFilter("busca", "");
        const searchInput = document.querySelector<HTMLInputElement>('[placeholder*="Buscar"]');
        if (searchInput) {
          searchInput.blur();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filters.busca, setFilter]);

  return null;
}
