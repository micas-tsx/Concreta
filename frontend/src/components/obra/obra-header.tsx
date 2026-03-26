"use client";

import Link from "next/link";
import { Building2, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Obra } from "@/types";
import { obraTipoLabels, obraStatusLabels } from "@/types";
import { formatDate } from "@/lib/utils";

interface ObraHeaderProps {
  obra: Obra;
}

export function ObraHeader({ obra }: ObraHeaderProps) {
  const statusVariant =
    obra.status === "em_andamento"
      ? "success"
      : obra.status === "paralisada"
        ? "warning"
        : obra.status === "concluida"
          ? "default"
          : "secondary";

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg leading-tight">{obra.nome}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {obra.descricao}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 items-center">
          <Badge variant={statusVariant} className="text-sm">
            {obraStatusLabels[obra.status]}
          </Badge>
          <Badge variant="outline" className="text-sm">
            {obraTipoLabels[obra.tipo]}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground ml-auto">
            <MapPin className="h-3 w-3" />
            <span>{obra.localização.bairro}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
