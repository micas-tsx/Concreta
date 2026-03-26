"use client";

import { useObras } from "@/hooks/use-obras";
import { useFilterStore } from "@/store/filter-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExportButton } from "@/components/dashboard/export-button";
import { formatCurrency } from "@/lib/utils";
import type { ObraTipo, ObraStatus } from "@/types";
import { obraTipoLabels, obraStatusLabels } from "@/types";

export function ActiveFilters() {
  const { obras } = useObras();
  const { filters } = useFilterStore();

  const activeFilterCount = 
    (filters.busca ? 1 : 0) +
    filters.bairro.length +
    filters.tipo.length +
    filters.status.length +
    (filters.faixaValor.min !== null || filters.faixaValor.max !== null ? 1 : 0);

  if (activeFilterCount === 0) {
    return null;
  }

  return (
    <Card className="bg-muted/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span>Filtros Ativos ({activeFilterCount})</span>
          <ExportButton obras={obras} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {filters.busca && (
            <span className="text-xs bg-background px-2 py-1 rounded">
              Busca: {filters.busca}
            </span>
          )}
          {filters.bairro.map((b: string) => (
            <span key={b} className="text-xs bg-background px-2 py-1 rounded">
              Bairro: {b}
            </span>
          ))}
          {filters.tipo.map((t: ObraTipo) => (
            <span key={t} className="text-xs bg-background px-2 py-1 rounded">
              Tipo: {obraTipoLabels[t]}
            </span>
          ))}
          {filters.status.map((s: ObraStatus) => (
            <span key={s} className="text-xs bg-background px-2 py-1 rounded">
              Status: {obraStatusLabels[s]}
            </span>
          ))}
          {(filters.faixaValor.min !== null || filters.faixaValor.max !== null) && (
            <span className="text-xs bg-background px-2 py-1 rounded">
              Valor: {filters.faixaValor.min ? formatCurrency(filters.faixaValor.min) : "0"} - {filters.faixaValor.max ? formatCurrency(filters.faixaValor.max) : "∞"}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
