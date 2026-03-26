"use client";

import { Progress } from "@/components/ui/progress";
import type { Etapa } from "@/types";

interface EtapaProgressProps {
  etapa: Etapa;
  showLabel?: boolean;
}

export function EtapaProgress({ etapa, showLabel = true }: EtapaProgressProps) {
  const progressColor =
    etapa.status === "concluida"
      ? "bg-emerald-500"
      : etapa.status === "atrasada"
        ? "bg-red-500"
        : "bg-blue-500";

  return (
    <div className="space-y-1">
      {showLabel && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{etapa.nome}</span>
          <span className="font-mono">{etapa.percentualExecutado}%</span>
        </div>
      )}
      <Progress
        value={etapa.percentualExecutado}
        className="h-2"
        indicatorClassName={progressColor}
      />
    </div>
  );
}
