export type ModalidadeLicitacao =
  | "pregao"
  | "tomada_precos"
  | "concorrencia"
  | "dispensado"
  | "inexigivel";

export type FonteRecurso =
  | "tesouro_municipal"
  | "tesouro_estadual"
  | "tesouro_federal"
  | "tesouro_distrital"
  | "operacao_credito"
  | "parceria_privada";

export type AditivoTipo = "valor" | "prazo" | "valor_prazo";

export interface Aditivo {
  id: string;
  contratoId: string;
  tipo: AditivoTipo;
  valorAdicional: number;
  novoPrazoDias: number;
  justificativa: string;
  dataAprovacao: Date;
  numero: string;
}

export interface Contrato {
  id: string;
  obraId: string;
  numero: string;
  processo: string;
  valorLicitado: number;
  valorContratado: number;
  dataAssinatura: Date;
  prazoDias: number;
  dataInicioPrevista: Date;
  dataConclusaoPrevista: Date;
  modalidade: ModalidadeLicitacao;
  fonteRecursos: FonteRecurso[];
  aditivos: Aditivo[];
  valorExecutado: number;
  percentualExecutado: number;
  emAditivo: boolean;
}

export const modalidadeLicitacaoLabels: Record<ModalidadeLicitacao, string> = {
  pregao: "Pregão",
  tomada_precos: "Tomada de Preços",
  concorrencia: "Concorrência",
  dispensado: "Dispensa",
  inexigivel: "Inexigível",
};

export const fonteRecursoLabels: Record<FonteRecurso, string> = {
  tesouro_municipal: "Tesouro Municipal",
  tesouro_estadual: "Tesouro Estadual",
  tesouro_federal: "Tesouro Federal",
  tesouro_distrital: "Tesouro Distrital",
  operacao_credito: "Operação de Crédito",
  parceria_privada: "Parceria Privada",
};

export const fonteRecursoColors: Record<FonteRecurso, string> = {
  tesouro_municipal: "primary",
  tesouro_estadual: "secondary",
  tesouro_federal: "accent",
  tesouro_distrital: "info",
  operacao_credito: "warning",
  parceria_privada: "muted",
};

export const aditivoTipoLabels: Record<AditivoTipo, string> = {
  valor: "Aditivo de Valor",
  prazo: "Aditivo de Prazo",
  valor_prazo: "Aditivo de Valor e Prazo",
};
