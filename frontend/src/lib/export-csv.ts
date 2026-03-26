import type { Obra } from "@/types";
import { formatCurrency, formatDate } from "./utils";
import { obraTipoLabels, obraStatusLabels } from "@/types";

export function exportToCsv(obras: Obra[]): string {
  const headers = [
    "ID",
    "Nome",
    "Tipo",
    "Status",
    "Bairro",
    "Endereço",
    "Valor Licitado",
    "Valor Contratado",
    "Valor Executado",
    "Percentual Execução",
    "Data Início",
    "Data Conclusão Prevista",
    "Fonte Recursos",
    "Tem Aditivo",
    "Latitude",
    "Longitude",
  ];

  const rows = obras.map((obra) => {
    const contrato = obra.contratos[0];
    return [
      obra.id,
      `"${obra.nome}"`,
      obraTipoLabels[obra.tipo],
      obraStatusLabels[obra.status],
      `"${obra.localização.bairro}"`,
      `"${obra.localização.endereco}"`,
      contrato ? (contrato.valorLicitado / 100).toFixed(2) : "",
      contrato ? (contrato.valorContratado / 100).toFixed(2) : "",
      contrato ? (contrato.valorExecutado / 100).toFixed(2) : "",
      contrato ? contrato.percentualExecutado.toFixed(1) : "",
      contrato ? formatDate(contrato.dataInicioPrevista) : "",
      contrato ? formatDate(contrato.dataConclusaoPrevista) : "",
      contrato ? contrato.fonteRecursos.join(", ") : "",
      contrato?.emAditivo ? "Sim" : "Não",
      obra.localização.latitude?.toString() || "",
      obra.localização.longitude?.toString() || "",
    ];
  });

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  return csvContent;
}

export function downloadCsv(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
