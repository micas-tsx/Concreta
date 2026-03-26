"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label: string;
  options: MultiSelectOption[];
  selected: string[];
  onToggle: (value: string) => void;
  onClear?: () => void;
}

export function MultiSelect({
  label,
  options,
  selected,
  onToggle,
  onClear,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </label>
        {selected.length > 0 && onClear && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-5 text-xs text-muted-foreground hover:text-foreground"
          >
            Limpar
          </Button>
        )}
      </div>
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between h-8 text-xs"
        >
          <span>
            {selected.length === 0
              ? `Selecionar ${label.toLowerCase()}`
              : `${selected.length} selecionado(s)`}
          </span>
          {isOpen ? (
            <ChevronUp className="h-3 w-3 ml-2" />
          ) : (
            <ChevronDown className="h-3 w-3 ml-2" />
          )}
        </Button>

        {isOpen && (
          <div className="absolute z-10 top-full left-0 mt-1 w-48 bg-card border rounded-md shadow-lg py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => onToggle(option.value)}
                className={cn(
                  "w-full px-3 py-1.5 text-left text-sm hover:bg-accent transition-colors",
                  selected.includes(option.value) && "bg-accent"
                )}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-4 h-4 border rounded flex items-center justify-center",
                      selected.includes(option.value)
                        ? "bg-primary border-primary"
                        : "border-muted-foreground"
                    )}
                  >
                    {selected.includes(option.value) && (
                      <svg
                        className="w-3 h-3 text-primary-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  {option.label}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selected.map((value) => {
            const option = options.find((o) => o.value === value);
            return (
              <Badge
                key={value}
                variant="secondary"
                className="text-xs h-5 gap-1 cursor-pointer hover:bg-destructive/20"
                onClick={() => onToggle(value)}
              >
                {option?.label}
                <span className="ml-1">×</span>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
