import { useCallback, useMemo } from "react";
import { useFilterStore, type FilterState, type SortState } from "@/store/filter-store";
import { debounce } from "@/lib/utils";
import type { ObraTipo, ObraStatus, FonteRecurso } from "@/types";

export function useFilters() {
  const { filters, sort, setFilter, setSort, clearFilters, resetFilters } =
    useFilterStore();

  const setBusca = useCallback(
    (value: string) => {
      setFilter("busca", value);
    },
    [setFilter]
  );

  const setBairro = useCallback(
    (value: string[]) => {
      setFilter("bairro", value);
    },
    [setFilter]
  );

  const setTipo = useCallback(
    (value: ObraTipo[]) => {
      setFilter("tipo", value);
    },
    [setFilter]
  );

  const setStatus = useCallback(
    (value: ObraStatus[]) => {
      setFilter("status", value);
    },
    [setFilter]
  );

  const setFaixaValor = useCallback(
    (value: { min: number | null; max: number | null }) => {
      setFilter("faixaValor", value);
    },
    [setFilter]
  );

  const setFonteRecursos = useCallback(
    (value: FonteRecurso[]) => {
      setFilter("fonteRecursos", value);
    },
    [setFilter]
  );

  const toggleBairro = useCallback(
    (bairro: string) => {
      const current = filters.bairro;
      if (current.includes(bairro)) {
        setFilter("bairro", current.filter((b) => b !== bairro));
      } else {
        setFilter("bairro", [...current, bairro]);
      }
    },
    [filters.bairro, setFilter]
  );

  const toggleTipo = useCallback(
    (tipo: ObraTipo) => {
      const current = filters.tipo;
      if (current.includes(tipo)) {
        setFilter("tipo", current.filter((t) => t !== tipo));
      } else {
        setFilter("tipo", [...current, tipo]);
      }
    },
    [filters.tipo, setFilter]
  );

  const toggleStatus = useCallback(
    (status: ObraStatus) => {
      const current = filters.status;
      if (current.includes(status)) {
        setFilter("status", current.filter((s) => s !== status));
      } else {
        setFilter("status", [...current, status]);
      }
    },
    [filters.status, setFilter]
  );

  const hasActiveFilters = useMemo(() => {
    return (
      filters.busca.length > 0 ||
      filters.bairro.length > 0 ||
      filters.tipo.length > 0 ||
      filters.status.length > 0 ||
      filters.faixaValor.min !== null ||
      filters.faixaValor.max !== null ||
      filters.fonteRecursos.length > 0
    );
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.busca) count++;
    count += filters.bairro.length;
    count += filters.tipo.length;
    count += filters.status.length;
    if (filters.faixaValor.min || filters.faixaValor.max) count++;
    count += filters.fonteRecursos.length;
    return count;
  }, [filters]);

  return {
    filters,
    sort,
    setBusca,
    setBairro,
    setTipo,
    setStatus,
    setFaixaValor,
    setFonteRecursos,
    setSort,
    toggleBairro,
    toggleTipo,
    toggleStatus,
    clearFilters,
    resetFilters,
    hasActiveFilters,
    activeFilterCount,
  };
}
