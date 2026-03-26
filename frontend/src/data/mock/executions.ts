import type { Execucao } from "@/types";

const generateExecutionHistory = (
  obraId: string,
  contratoId: string,
  startDate: Date,
  monthsCount: number,
  isStale = false
): Execucao[] => {
  const executions: Execucao[] = [];
  const now = new Date();
  let currentPercent = 0;
  const monthlyIncrement = 100 / monthsCount;

  for (let i = 0; i < monthsCount; i++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    currentPercent = Math.min(100, (i + 1) * monthlyIncrement);
    const valueExecutado = Math.floor(currentPercent * 4500000);

    let isCurrentStale = false;
    if (isStale && i === monthsCount - 1) {
      const daysSinceLastUpdate = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
      );
      isCurrentStale = daysSinceLastUpdate > 30;
    }

    executions.push({
      id: `exec-${obraId}-${i + 1}`,
      obraId,
      contratoId,
      data: date,
      percentualAcumulado: currentPercent,
      valorExecutado: valueExecutado,
      observacoes:
        i === 0
          ? "Início da obra"
          : i === monthsCount - 1
            ? "Último registro disponível"
            : `Progresso mensal - ${currentPercent.toFixed(1)}%`,
      responsavel: "Eng. Carlos Silva",
      isStale: isCurrentStale,
    });
  }

  return executions;
};

export const executions: Execucao[] = [
  ...generateExecutionHistory("obra-001", "contrato-001", new Date("2024-01-15"), 18, false),
  ...generateExecutionHistory("obra-002", "contrato-002", new Date("2024-01-10"), 18, false),
  ...generateExecutionHistory("obra-003", "contrato-003", new Date("2023-11-01"), 12, false),
  ...generateExecutionHistory("obra-004", "contrato-004", new Date("2022-10-15"), 24, false),
  ...generateExecutionHistory("obra-005", "contrato-005", new Date("2023-09-15"), 14, false),
  ...generateExecutionHistory("obra-006", "contrato-006", new Date("2024-03-01"), 10, false),
  ...generateExecutionHistory("obra-007", "contrato-007", new Date("2023-08-15"), 16, false),
  ...generateExecutionHistory("obra-008", "contrato-008", new Date("2024-02-15"), 9, false),
  ...generateExecutionHistory("obra-009", "contrato-009", new Date("2022-08-01"), 24, false),
  ...generateExecutionHistory("obra-010", "contrato-010", new Date("2023-06-01"), 12, false),
  ...generateExecutionHistory("obra-011", "contrato-011", new Date("2023-10-01"), 14, true),
  ...generateExecutionHistory("obra-012", "contrato-012", new Date("2022-09-01"), 22, true),
  ...generateExecutionHistory("obra-013", "contrato-013", new Date("2023-07-15"), 16, false),
  ...generateExecutionHistory("obra-014", "contrato-014", new Date("2024-04-01"), 8, false),
  ...generateExecutionHistory("obra-015", "contrato-015", new Date("2023-05-15"), 18, false),
];

export function getExecutionsByObraId(obraId: string): Execucao[] {
  return executions
    .filter((e) => e.obraId === obraId)
    .sort((a, b) => a.data.getTime() - b.data.getTime());
}

export function getLatestExecution(obraId: string): Execucao | undefined {
  const obraExecutions = getExecutionsByObraId(obraId);
  return obraExecutions[obraExecutions.length - 1];
}

export function getChartData(obraId: string): { mes: string; planejado: number; executado: number }[] {
  const obraExecutions = getExecutionsByObraId(obraId);
  
  return obraExecutions.map((e) => {
    const mes = e.data.toLocaleDateString("pt-BR", { month: "short", year: "2-digit" });
    const plannedPercent = Math.min(100, (obraExecutions.indexOf(e) + 1) * 5.56);
    return {
      mes,
      planejado: plannedPercent,
      executado: e.percentualAcumulado,
    };
  });
}
