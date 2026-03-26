export type EtapaStatus =
  | "nao_iniciada"
  | "em_andamento"
  | "concluida"
  | "atrasada";

export interface Etapa {
  id: string;
  cronogramaId: string;
  nome: string;
  descricao: string;
  ordem: number;
  dataInicioPrevista: Date;
  dataFimPrevista: Date;
  percentualPrevisto: number;
  dataInicioReal: Date | null;
  dataFimReal: Date | null;
  percentualExecutado: number;
  status: EtapaStatus;
}

export interface Cronograma {
  id: string;
  contratoId: string;
  etapas: Etapa[];
}

export const etapaStatusLabels: Record<EtapaStatus, string> = {
  nao_iniciada: "Não Iniciada",
  em_andamento: "Em Andamento",
  concluida: "Concluída",
  atrasada: "Atrasada",
};

export const etapaStatusColors: Record<EtapaStatus, string> = {
  nao_iniciada: "secondary",
  em_andamento: "primary",
  concluida: "success",
  atrasada: "danger",
};
