"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useFilters } from "@/hooks/use-filters";
import { BAIRROS } from "@/lib/utils";
import { obraTipoLabels, obraStatusLabels } from "@/types";
import type { ObraTipo, ObraStatus } from "@/types";

export function FilterBar() {
  const {
    filters,
    setBusca,
    toggleBairro,
    toggleTipo,
    toggleStatus,
    clearFilters,
    hasActiveFilters,
    activeFilterCount,
  } = useFilters();

  const [localBusca, setLocalBusca] = useState(filters.busca);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBusca(localBusca);
    }, 150);
    return () => clearTimeout(timer);
  }, [localBusca, setBusca]);

  const tipos: ObraTipo[] = [
    "educacao",
    "saude",
    "mobilidade",
    "saneamento",
    "lazer",
    "seguranca",
    "infraestrutura",
  ];

  const statuses: ObraStatus[] = [
    "em_andamento",
    "nao_iniciada",
    "paralisada",
    "concluida",
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nome, descrição ou bairro..."
            className="pl-9 font-mono text-sm"
            value={localBusca}
            onChange={(e) => setLocalBusca(e.target.value)}
            aria-label="Buscar obras"
          />
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Limpar Filtros
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Bairro
          </label>
          <div className="flex flex-wrap gap-1">
            {BAIRROS.slice(0, 5).map((bairro) => (
              <Button
                key={bairro}
                variant={filters.bairro.includes(bairro) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleBairro(bairro)}
                className="text-xs h-7"
              >
                {bairro}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Tipo
          </label>
          <div className="flex flex-wrap gap-1">
            {tipos.map((tipo) => (
              <Button
                key={tipo}
                variant={filters.tipo.includes(tipo) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleTipo(tipo)}
                className="text-xs h-7"
              >
                {obraTipoLabels[tipo]}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Status
          </label>
          <div className="flex flex-wrap gap-1">
            {statuses.map((status) => (
              <Button
                key={status}
                variant={filters.status.includes(status) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleStatus(status)}
                className="text-xs h-7"
              >
                {obraStatusLabels[status]}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
