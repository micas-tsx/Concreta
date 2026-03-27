/// <reference types="vitest" />
import { describe, it, expect } from "vitest";
import { obras } from "@/data/mock/obras";
import { contratos } from "@/data/mock/contracts";
import { executions } from "@/data/mock/executions";
import type { Contrato } from "@/types";

describe("Mock Data - Obras", () => {
  it("deve ter array de obras", () => {
    expect(Array.isArray(obras)).toBe(true);
    expect(obras.length).toBeGreaterThan(0);
  });

  it("deve ter obras com campos obrigatórios", () => {
    const obra = obras[0];
    expect(obra).toHaveProperty("id");
    expect(obra).toHaveProperty("nome");
    expect(obra).toHaveProperty("descricao");
    expect(obra).toHaveProperty("tipo");
    expect(obra).toHaveProperty("status");
    expect(obra).toHaveProperty("localização");
    expect(obra).toHaveProperty("contratos");
  });

  it("deve ter contratos com dados financeiros", () => {
    const obra = obras.find((o) => o.contratos.length > 0);
    expect(obra).toBeDefined();
    const contrato = obra!.contratos[0];
    expect(contrato).toHaveProperty("valorLicitado");
    expect(contrato).toHaveProperty("valorContratado");
    expect(contrato).toHaveProperty("valorExecutado");
    expect(contrato).toHaveProperty("percentualExecutado");
  });

  it("deve ter localizações válidas", () => {
    const obrasComLocalizacao = obras.filter(
      (o) => o.localização.latitude && o.localização.longitude
    );
    expect(obrasComLocalizacao.length).toBeGreaterThan(0);
    obrasComLocalizacao.forEach((obra) => {
      expect(obra.localização.latitude).toBeGreaterThan(-90);
      expect(obra.localização.latitude).toBeLessThan(90);
      expect(obra.localização.longitude).toBeGreaterThan(-180);
      expect(obra.localização.longitude).toBeLessThan(180);
    });
  });
});

describe("Mock Data - Contratos", () => {
  it("deve ter array de contratos", () => {
    expect(Array.isArray(contratos)).toBe(true);
    expect(contratos.length).toBeGreaterThan(0);
  });

  it("deve ter aditivos", () => {
    const contratoComAditivo = contratos.find((c: Contrato) => c.aditivos && c.aditivos.length > 0);
    if (contratoComAditivo) {
      const aditivo = contratoComAditivo.aditivos![0];
      expect(aditivo).toHaveProperty("tipo");
      expect(aditivo).toHaveProperty("valorAdicional");
      expect(aditivo).toHaveProperty("justificativa");
    }
  });
});

describe("Mock Data - Execuções", () => {
  it("deve ter array de execuções", () => {
    expect(Array.isArray(executions)).toBe(true);
  });

  it("deve ter dados de execução", () => {
    if (executions.length > 0) {
      const execution = executions[0];
      expect(execution).toHaveProperty("obraId");
      expect(execution).toHaveProperty("percentualAcumulado");
      expect(execution).toHaveProperty("data");
    }
  });
});
