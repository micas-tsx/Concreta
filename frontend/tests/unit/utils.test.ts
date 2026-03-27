/// <reference types="vitest" />
import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatDate,
  formatPercent,
  calculateDaysBetween,
  isStale,
  getStatusColor,
  debounce,
  generateId,
} from "@/lib/utils";

describe("formatCurrency", () => {
  it("deve formatar valor em reais", () => {
    const result1 = formatCurrency(100000);
    expect(result1).toContain("R$");
    expect(result1).toContain("1.000,00");
    
    const result2 = formatCurrency(500);
    expect(result2).toContain("R$");
    expect(result2).toContain("5,00");
  });

  it("deve lidar com valores grandes", () => {
    const result = formatCurrency(100000000);
    expect(result).toContain("R$");
    expect(result).toContain("1.000.000,00");
  });
});

describe("formatDate", () => {
  it("deve formatar data retornando string", () => {
    const result = formatDate(new Date(2024, 2, 15));
    expect(typeof result).toBe("string");
    expect(result).toContain("/");
  });

  it("deve aceitar string de data", () => {
    const result = formatDate("2024-06-15");
    expect(typeof result).toBe("string");
    expect(result).toContain("/");
  });
});

describe("formatPercent", () => {
  it("deve formatar percentual com uma casa decimal", () => {
    expect(formatPercent(75.5)).toBe("75.5%");
    expect(formatPercent(100)).toBe("100.0%");
    expect(formatPercent(0)).toBe("0.0%");
  });
});

describe("calculateDaysBetween", () => {
  it("deve calcular dias entre duas datas", () => {
    const start = new Date("2024-01-01");
    const end = new Date("2024-01-10");
    expect(calculateDaysBetween(start, end)).toBe(9);
  });

  it("deve retornar 0 para mesma data", () => {
    const date = new Date("2024-01-01");
    expect(calculateDaysBetween(date, date)).toBe(0);
  });

  it("deve funcionar com datas em ordem reversa", () => {
    const start = new Date("2024-01-10");
    const end = new Date("2024-01-01");
    expect(calculateDaysBetween(start, end)).toBe(9);
  });
});

describe("isStale", () => {
  it("deve retornar true para dados antigos", () => {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 31);
    expect(isStale(oldDate)).toBe(true);
  });

  it("deve retornar false para dados recentes", () => {
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 5);
    expect(isStale(recentDate)).toBe(false);
  });

  it("deve retornar true para null", () => {
    expect(isStale(null)).toBe(true);
  });

  it("deve respeitar threshold customizado", () => {
    const date = new Date();
    date.setDate(date.getDate() - 10);
    expect(isStale(date, 5)).toBe(true);
    expect(isStale(date, 15)).toBe(false);
  });
});

describe("getStatusColor", () => {
  it("deve retornar cor correta para cada status", () => {
    expect(getStatusColor("nao_iniciada")).toBe("bg-gray-500");
    expect(getStatusColor("em_andamento")).toBe("bg-emerald-500");
    expect(getStatusColor("paralisada")).toBe("bg-amber-500");
    expect(getStatusColor("concluida")).toBe("bg-blue-500");
    expect(getStatusColor("atrasada")).toBe("bg-red-500");
  });

  it("deve retornar cor padrão para status desconhecido", () => {
    expect(getStatusColor("desconhecido")).toBe("bg-gray-500");
  });
});

describe("debounce", () => {
  it("deve atrasar execução", async () => {
    let callCount = 0;
    const fn = debounce(() => { callCount++; }, 100);
    fn();
    fn();
    fn();
    expect(callCount).toBe(0);
    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(callCount).toBe(1);
  });
});

describe("generateId", () => {
  it("deve gerar UUID válido", () => {
    const id = generateId();
    expect(id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    );
  });

  it("deve gerar IDs únicos", () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()));
    expect(ids.size).toBe(100);
  });
});
