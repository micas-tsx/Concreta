"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";

interface SortOption {
  value: "nome" | "valor" | "percentual" | "data";
  label: string;
}

const sortOptions: SortOption[] = [
  { value: "nome", label: "Nome" },
  { value: "valor", label: "Valor" },
  { value: "percentual", label: "Execução" },
  { value: "data", label: "Data" },
];

interface SortButtonProps {
  sort: { field: "nome" | "valor" | "percentual" | "data"; direction: "asc" | "desc" };
  onSortChange: (sort: { field: "nome" | "valor" | "percentual" | "data"; direction: "asc" | "desc" }) => void;
}

export function SortButton({ sort, onSortChange }: SortButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = sortOptions.find((opt) => opt.value === sort.field);

  const handleSort = (field: SortOption["value"]) => {
    if (field === sort.field) {
      onSortChange({ field, direction: sort.direction === "asc" ? "desc" : "asc" });
    } else {
      onSortChange({ field, direction: "asc" });
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-7 text-xs gap-1"
      >
        <Search className="h-3 w-3" />
        Ordenar: {currentOption?.label}
        {sort.direction === "desc" ? " ↓" : " ↑"}
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-20 bg-card border rounded-md shadow-lg py-1 min-w-[120px]">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSort(option.value)}
                className={cn(
                  "w-full px-3 py-1.5 text-left text-sm hover:bg-accent transition-colors",
                  sort.field === option.value && "bg-accent font-medium"
                )}
              >
                {option.label}
                {sort.field === option.value && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    {sort.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
