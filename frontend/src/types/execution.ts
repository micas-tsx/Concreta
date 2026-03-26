export interface Execucao {
  id: string;
  obraId: string;
  contratoId: string;
  data: Date;
  percentualAcumulado: number;
  valorExecutado: number;
  observacoes: string;
  responsavel: string;
  isStale: boolean;
}
