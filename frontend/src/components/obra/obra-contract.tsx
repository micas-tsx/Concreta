"use client";

import { DollarSign, FileText, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Contrato } from "@/types";
import { modalidadeLicitacaoLabels, fonteRecursoLabels } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";

interface ObraContractProps {
  contrato: Contrato;
}

export function ObraContract({ contrato }: ObraContractProps) {
  const hasAmendment = contrato.valorContratado > contrato.valorLicitado;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Contrato {contrato.numero}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Processo</div>
            <div className="font-mono text-sm">{contrato.processo}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Modalidade</div>
            <div className="text-sm">
              {modalidadeLicitacaoLabels[contrato.modalidade]}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Assinatura</div>
            <div className="font-mono text-sm">
              {formatDate(contrato.dataAssinatura)}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Prazo</div>
            <div className="flex items-center gap-1 text-sm">
              <Clock className="h-3 w-3 text-muted-foreground" />
              {contrato.prazoDias} dias
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="text-xs text-muted-foreground mb-2">Valores</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Valor Licitado:</span>
              <span className="font-mono text-sm font-medium">
                {formatCurrency(contrato.valorLicitado)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Valor Contratado:</span>
              <span className="font-mono text-sm">
                {formatCurrency(contrato.valorContratado)}
              </span>
            </div>
            {hasAmendment && (
              <div className="flex justify-between items-center text-amber-500">
                <span className="text-sm flex items-center gap-1">
                  <Badge variant="warning" className="text-xs h-5">
                    ADITIVO
                  </Badge>
                  Valor adicional:
                </span>
                <span className="font-mono text-sm font-medium">
                  +{formatCurrency(contrato.valorContratado - contrato.valorLicitado)}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center text-emerald-500 font-medium border-t pt-2 mt-2">
              <span className="text-sm">Valor Executado:</span>
              <span className="font-mono text-sm">
                {formatCurrency(contrato.valorExecutado)}
              </span>
            </div>
          </div>
        </div>

        {contrato.fonteRecursos.length > 0 && (
          <div className="border-t pt-4">
            <div className="text-xs text-muted-foreground mb-2">Fontes de Recursos</div>
            <div className="flex flex-wrap gap-1">
              {contrato.fonteRecursos.map((fonte) => (
                <Badge key={fonte} variant="outline" className="text-xs">
                  {fonteRecursoLabels[fonte]}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
