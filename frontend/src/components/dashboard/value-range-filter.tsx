"use client";

import { useState } from "react";
import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";

interface ValueRangeFilterProps {
  min: number | null;
  max: number | null;
  onChange: (range: { min: number | null; max: number | null }) => void;
}

export function ValueRangeFilter({ min, max, onChange }: ValueRangeFilterProps) {
  const [localMin, setLocalMin] = useState<string>(min ? (min / 100).toString() : "");
  const [localMax, setLocalMax] = useState<string>(max ? (max / 100).toString() : "");

  const handleApply = () => {
    const minValue = localMin ? Math.floor(parseFloat(localMin) * 100) : null;
    const maxValue = localMax ? Math.floor(parseFloat(localMax) * 100) : null;
    onChange({ min: minValue, max: maxValue });
  };

  const handleClear = () => {
    setLocalMin("");
    setLocalMax("");
    onChange({ min: null, max: null });
  };

  const hasValue = min !== null || max !== null;

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Faixa de Valor
      </label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            type="number"
            placeholder="Mín"
            className="pl-6 h-8 text-xs font-mono"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
          />
        </div>
        <span className="text-muted-foreground">-</span>
        <div className="relative flex-1">
          <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            type="number"
            placeholder="Máx"
            className="pl-6 h-8 text-xs font-mono"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={handleApply}
          className="h-7 text-xs flex-1"
        >
          Aplicar
        </Button>
        {hasValue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="h-7 text-xs px-2"
          >
            Limpar
          </Button>
        )}
      </div>
      {(min !== null || max !== null) && (
        <div className="text-xs text-muted-foreground">
          {min !== null && max !== null
            ? `${formatCurrency(min)} - ${formatCurrency(max)}`
            : min !== null
              ? `Acima de ${formatCurrency(min)}`
              : `Abaixo de ${formatCurrency(max!)}`}
        </div>
      )}
    </div>
  );
}
