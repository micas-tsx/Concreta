"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SortButton } from "./sort-button";
import { useObras } from "@/hooks/use-obras";
import { useFilterStore } from "@/store/filter-store";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { obraTipoLabels, obraStatusLabels } from "@/types";

export function ObrasList() {
  const { obras } = useObras();
  const { sort, setSort } = useFilterStore();

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Lista de Obras ({obras.length})
          </CardTitle>
          <SortButton sort={sort} onSortChange={setSort} />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {obras.map((obra) => {
            const contrato = obra.contratos[0];
            const statusVariant =
              obra.status === "em_andamento"
                ? "success"
                : obra.status === "paralisada"
                  ? "warning"
                  : obra.status === "concluida"
                    ? "default"
                    : "secondary";

            return (
              <Link
                key={obra.id}
                href={`/obras/${obra.id}`}
                className="block p-4 hover:bg-accent transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm truncate">
                        {obra.nome}
                      </h3>
                      <Badge variant={statusVariant} className="text-xs shrink-0">
                        {obraStatusLabels[obra.status]}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{obra.localização.bairro}</span>
                      <span>{obraTipoLabels[obra.tipo]}</span>
                    </div>
                  </div>
                  {contrato && (
                    <div className="text-right shrink-0">
                      <div className="font-mono text-sm font-medium">
                        {formatCurrency(contrato.valorContratado)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatPercent(contrato.percentualExecutado)}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
