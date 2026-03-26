"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Contrato } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface ContractComparisonProps {
  contrato: Contrato;
}

export function ContractComparison({ contrato }: ContractComparisonProps) {
  const difference = contrato.valorContratado - contrato.valorLicitado;
  const percentIncrease = ((difference / contrato.valorLicitado) * 100).toFixed(1);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Comparativo de Valores
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Valor Licitado (Original)</span>
              <span className="font-mono">
                {formatCurrency(contrato.valorLicitado)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Valor Contratado</span>
              <span className="font-mono">
                {formatCurrency(contrato.valorContratado)}
              </span>
            </div>
            {difference > 0 && (
              <div className="flex justify-between text-sm text-amber-500 font-medium border-t pt-2">
                <span className="flex items-center gap-2">
                  <Badge variant="warning" className="text-xs h-5">
                    +
                  </Badge>
                  Aditivo de Valor
                </span>
                <span className="font-mono">
                  +{formatCurrency(difference)} (+{percentIncrease}%)
                </span>
              </div>
            )}
          </div>

          <div className="relative pt-4 border-t">
            <div className="absolute left-0 right-0 top-0 h-1 bg-border rounded-full overflow-hidden flex">
              <div
                className="h-full bg-blue-500"
                style={{
                  width: `${Math.min(
                    100,
                    (contrato.valorLicitado / contrato.valorContratado) * 100
                  )}%`,
                }}
              />
              <div
                className="h-full bg-amber-500"
                style={{
                  width: `${Math.max(
                    0,
                    ((contrato.valorContratado - contrato.valorLicitado) /
                      contrato.valorContratado) *
                      100
                  )}%`,
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <span className="text-muted-foreground">Original</span>
              <span className="text-muted-foreground">Com Aditivos</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
