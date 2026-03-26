import { useMemo } from "react";
import { obras as allObras, getObraById, obraStats } from "@/data/mock/obras";
import type { Obra } from "@/types";
import { useFilterStore } from "@/store/filter-store";

export function useObras() {
  const { filters, sort } = useFilterStore();

  const filteredObras = useMemo(() => {
    let result = [...allObras];

    if (filters.busca) {
      const search = filters.busca.toLowerCase();
      result = result.filter(
        (o) =>
          o.nome.toLowerCase().includes(search) ||
          o.descricao.toLowerCase().includes(search) ||
          o.localização.bairro.toLowerCase().includes(search)
      );
    }

    if (filters.bairro.length > 0) {
      result = result.filter((o) => filters.bairro.includes(o.localização.bairro));
    }

    if (filters.tipo.length > 0) {
      result = result.filter((o) => filters.tipo.includes(o.tipo));
    }

    if (filters.status.length > 0) {
      result = result.filter((o) => filters.status.includes(o.status));
    }

    if (filters.faixaValor.min !== null) {
      result = result.filter((o) => {
        const valor = o.contratos[0]?.valorContratado || 0;
        return valor >= filters.faixaValor.min!;
      });
    }

    if (filters.faixaValor.max !== null) {
      result = result.filter((o) => {
        const valor = o.contratos[0]?.valorContratado || 0;
        return valor <= filters.faixaValor.max!;
      });
    }

    result.sort((a, b) => {
      let comparison = 0;
      switch (sort.field) {
        case "nome":
          comparison = a.nome.localeCompare(b.nome);
          break;
        case "valor":
          const valorA = a.contratos[0]?.valorContratado || 0;
          const valorB = b.contratos[0]?.valorContratado || 0;
          comparison = valorA - valorB;
          break;
        case "percentual":
          const percA = a.contratos[0]?.percentualExecutado || 0;
          const percB = b.contratos[0]?.percentualExecutado || 0;
          comparison = percA - percB;
          break;
        case "data":
          comparison =
            (a.lastExecutionUpdate?.getTime() || 0) -
            (b.lastExecutionUpdate?.getTime() || 0);
          break;
      }
      return sort.direction === "asc" ? comparison : -comparison;
    });

    return result;
  }, [filters, sort]);

  return {
    obras: filteredObras,
    total: allObras.length,
    filtered: filteredObras.length,
    stats: obraStats,
    getObraById,
  };
}
