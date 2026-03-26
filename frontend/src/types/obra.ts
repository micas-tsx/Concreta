export type ObraTipo =
  | "educacao"
  | "saude"
  | "mobilidade"
  | "saneamento"
  | "lazer"
  | "seguranca"
  | "infraestrutura"
  | "outro";

export type ObraStatus =
  | "nao_iniciada"
  | "em_andamento"
  | "paralisada"
  | "concluida";

export interface Obra {
  id: string;
  nome: string;
  descricao: string;
  tipo: ObraTipo;
  status: ObraStatus;
  createdAt: Date;
  updatedAt: Date;
  lastExecutionUpdate: Date | null;
  contratos: import("./contract").Contrato[];
  localização: import("./location").Localização;
  fotos: import("./location").Foto[];
}

export const obraTipoLabels: Record<ObraTipo, string> = {
  educacao: "Educação",
  saude: "Saúde",
  mobilidade: "Mobilidade",
  saneamento: "Saneamento",
  lazer: "Lazer",
  seguranca: "Segurança",
  infraestrutura: "Infraestrutura",
  outro: "Outro",
};

export const obraStatusLabels: Record<ObraStatus, string> = {
  nao_iniciada: "Não Iniciada",
  em_andamento: "Em Andamento",
  paralisada: "Paralisada",
  concluida: "Concluída",
};

export const obraStatusColors: Record<ObraStatus, string> = {
  nao_iniciada: "secondary",
  em_andamento: "success",
  paralisada: "warning",
  concluida: "primary",
};

export interface ComputedObraMetrics {
  valorLicitado: number;
  valorContratado: number;
  valorExecutado: number;
  valorRestante: number;
  percentualMedio: number;
  diasEmAndamento: number;
  diasAtrasado: number;
  etapasConcluidas: number;
  etapasEmAndamento: number;
  etapasAtrasadas: number;
  etapasPendentes: number;
  hasStaleData: boolean;
  hasContractAmendment: boolean;
  isOverBudget: boolean;
  isDelayed: boolean;
}
