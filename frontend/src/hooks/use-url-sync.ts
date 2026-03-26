import { useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFilterStore } from "@/store/filter-store";

export function useUrlSync() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filters, sort, setFilter, setSort } = useFilterStore();

  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();

    if (filters.busca) params.set("q", filters.busca);
    if (filters.bairro.length > 0) params.set("bairro", filters.bairro.join(","));
    if (filters.tipo.length > 0) params.set("tipo", filters.tipo.join(","));
    if (filters.status.length > 0) params.set("status", filters.status.join(","));
    if (filters.faixaValor.min !== null) params.set("minValor", filters.faixaValor.min.toString());
    if (filters.faixaValor.max !== null) params.set("maxValor", filters.faixaValor.max.toString());

    if (sort.field !== "nome") params.set("sort", sort.field);
    if (sort.direction === "desc") params.set("dir", "desc");

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : "/";
    router.replace(newUrl, { scroll: false });
  }, [filters, sort, router]);

  const syncFromUrl = useCallback(() => {
    const q = searchParams.get("q");
    const bairro = searchParams.get("bairro");
    const tipo = searchParams.get("tipo");
    const status = searchParams.get("status");
    const minValor = searchParams.get("minValor");
    const maxValor = searchParams.get("maxValor");
    const sortField = searchParams.get("sort");
    const sortDir = searchParams.get("dir");

    if (q !== null) setFilter("busca", q);
    if (bairro !== null) setFilter("bairro", bairro.split(","));
    if (tipo !== null) setFilter("tipo", tipo.split(",") as any);
    if (status !== null) setFilter("status", status.split(",") as any);
    if (minValor !== null) setFilter("faixaValor", { min: parseInt(minValor), max: filters.faixaValor.max });
    if (maxValor !== null) setFilter("faixaValor", { min: filters.faixaValor.min, max: parseInt(maxValor) });

    if (sortField !== null) {
      setSort({ field: sortField as any, direction: sortDir === "desc" ? "desc" : "asc" });
    }
  }, [searchParams, setFilter, setSort, filters.faixaValor]);

  return { updateUrl, syncFromUrl };
}
