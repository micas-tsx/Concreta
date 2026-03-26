import { create } from "zustand";
import type { ObraTipo, ObraStatus, FonteRecurso } from "@/types";

export interface FilterState {
  busca: string;
  bairro: string[];
  tipo: ObraTipo[];
  status: ObraStatus[];
  faixaValor: {
    min: number | null;
    max: number | null;
  };
  fonteRecursos: FonteRecurso[];
}

export interface SortState {
  field: "nome" | "valor" | "percentual" | "data";
  direction: "asc" | "desc";
}

interface FilterStore {
  filters: FilterState;
  sort: SortState;
  setFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => void;
  setSort: (sort: SortState) => void;
  clearFilters: () => void;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  busca: "",
  bairro: [],
  tipo: [],
  status: [],
  faixaValor: { min: null, max: null },
  fonteRecursos: [],
};

export const useFilterStore = create<FilterStore>((set) => ({
  filters: initialFilters,
  sort: { field: "nome", direction: "asc" },

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  setSort: (sort) => set({ sort }),

  clearFilters: () =>
    set((state) => ({
      filters: {
        ...state.filters,
        bairro: [],
        tipo: [],
        status: [],
        faixaValor: { min: null, max: null },
        fonteRecursos: [],
      },
    })),

  resetFilters: () => set({ filters: initialFilters }),
}));
