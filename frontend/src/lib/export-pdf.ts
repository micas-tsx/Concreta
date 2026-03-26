import type { Obra } from "@/types";
import { formatCurrency, formatDate, formatPercent } from "./utils";
import { obraTipoLabels, obraStatusLabels } from "@/types";

export function generatePdfContent(obra: Obra): string {
  const contrato = obra.contratos[0];
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${obra.nome} - CONCRETA</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 40px; color: #333; }
    h1 { font-size: 24px; border-bottom: 2px solid #333; padding-bottom: 10px; }
    h2 { font-size: 16px; margin-top: 30px; color: #666; }
    .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 8px; }
    .badge-success { background: #dcfce7; color: #166534; }
    .badge-warning { background: #fef3c7; color: #92400e; }
    .badge-default { background: #e5e7eb; color: #374151; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
    .card { border: 1px solid #ddd; border-radius: 8px; padding: 20px; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
    .row:last-child { border-bottom: none; }
    .label { color: #666; font-size: 14px; }
    .value { font-weight: 500; font-family: monospace; }
    .progress { background: #e5e7eb; border-radius: 4px; height: 8px; margin-top: 8px; }
    .progress-bar { background: #10b981; height: 8px; border-radius: 4px; }
    .footer { margin-top: 40px; text-align: center; color: #999; font-size: 12px; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <h1>${obra.nome}</h1>
  <p>${obra.descricao}</p>
  
  <div style="margin-top: 20px;">
    <span class="badge badge-${obra.status === 'em_andamento' ? 'success' : obra.status === 'paralisada' ? 'warning' : 'default'}">${obraStatusLabels[obra.status]}</span>
    <span class="badge badge-default">${obraTipoLabels[obra.tipo]}</span>
    ${contrato?.emAditivo ? '<span class="badge badge-warning">Com Aditivo</span>' : ''}
  </div>
  
  <div class="grid">
    <div class="card">
      <h2>Localização</h2>
      <div class="row">
        <span class="label">Endereço</span>
        <span>${obra.localização.endereco}</span>
      </div>
      <div class="row">
        <span class="label">Bairro</span>
        <span>${obra.localização.bairro}</span>
      </div>
      <div class="row">
        <span class="label">Cidade</span>
        <span>${obra.localização.cidade}</span>
      </div>
    </div>
    
    ${contrato ? `
    <div class="card">
      <h2>Dados Financeiros</h2>
      <div class="row">
        <span class="label">Valor Licitado</span>
        <span class="value">${formatCurrency(contrato.valorLicitado)}</span>
      </div>
      <div class="row">
        <span class="label">Valor Contratado</span>
        <span class="value">${formatCurrency(contrato.valorContratado)}</span>
      </div>
      <div class="row">
        <span class="label">Valor Executado</span>
        <span class="value" style="color: #10b981;">${formatCurrency(contrato.valorExecutado)}</span>
      </div>
      <div class="row">
        <span class="label">Execução</span>
        <span class="value">${formatPercent(contrato.percentualExecutado)}</span>
      </div>
      <div class="progress">
        <div class="progress-bar" style="width: ${contrato.percentualExecutado}%;"></div>
      </div>
    </div>
    ` : ''}
  </div>
  
  ${contrato ? `
  <div class="card" style="margin-top: 20px;">
    <h2>Contrato ${contrato.numero}</h2>
    <div class="grid">
      <div>
        <div class="row"><span class="label">Processo</span><span>${contrato.processo}</span></div>
        <div class="row"><span class="label">Modalidade</span><span>${contrato.modalidade}</span></div>
      </div>
      <div>
        <div class="row"><span class="label">Assinatura</span><span>${formatDate(contrato.dataAssinatura)}</span></div>
        <div class="row"><span class="label">Prazo</span><span>${contrato.prazoDias} dias</span></div>
      </div>
    </div>
  </div>
  ` : ''}
  
  <div class="footer">
    <p>CONCRETA - Painel de Monitoramento Urbano de Obras Públicas</p>
    <p>Gerado em ${new Date().toLocaleDateString("pt-BR")}</p>
  </div>
</body>
</html>
  `.trim();

  return html;
}

export function openPdfPreview(obra: Obra): void {
  const content = generatePdfContent(obra);
  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const printWindow = window.open(url, "_blank");
  
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
    };
  }
}
