"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Cronograma, Etapa } from "@/types";
import { etapaStatusLabels } from "@/types";
import { formatDate } from "@/lib/utils";

interface ObraTimelineProps {
  cronograma: Cronograma;
}

export function ObraTimeline({ cronograma }: ObraTimelineProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Etapas do Cronograma
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cronograma.etapas.map((etapa, index) => (
            <EtapaItem
              key={etapa.id}
              etapa={etapa}
              isLast={index === cronograma.etapas.length - 1}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface EtapaItemProps {
  etapa: Etapa;
  isLast: boolean;
}

function EtapaItem({ etapa, isLast }: EtapaItemProps) {
  const statusVariant =
    etapa.status === "concluida"
      ? "success"
      : etapa.status === "atrasada"
        ? "danger"
        : etapa.status === "em_andamento"
          ? "default"
          : "secondary";

  const statusColor =
    etapa.status === "concluida"
      ? "bg-emerald-500"
      : etapa.status === "atrasada"
        ? "bg-red-500"
        : etapa.status === "em_andamento"
          ? "bg-blue-500 animate-pulse"
          : "bg-gray-400";

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full ${statusColor}`} />
        {!isLast && <div className="w-0.5 flex-1 bg-border min-h-[40px]" />}
      </div>
      <div className="flex-1 pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="font-medium text-sm">{etapa.nome}</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {etapa.descricao}
            </div>
          </div>
          <Badge variant={statusVariant} className="text-xs shrink-0">
            {etapaStatusLabels[etapa.status]}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
          <span>
            <span className="text-muted-foreground">Previsto:</span>{" "}
            {formatDate(etapa.dataInicioPrevista)} - {formatDate(etapa.dataFimPrevista)}
          </span>
          {etapa.dataFimReal && (
            <span className="text-emerald-500">
              <span className="text-muted-foreground">Concluído:</span>{" "}
              {formatDate(etapa.dataFimReal)}
            </span>
          )}
        </div>

        <div className="mt-2">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-mono">{etapa.percentualExecutado}%</span>
          </div>
          <Progress
            value={etapa.percentualExecutado}
            className="h-1.5"
          />
        </div>
      </div>
    </div>
  );
}
