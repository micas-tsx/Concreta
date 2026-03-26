"use client";

import { Building2, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useObras } from "@/hooks/use-obras";
import { formatCurrency } from "@/lib/utils";

export function StatsGrid() {
  const { stats } = useObras();

  const items = [
    {
      title: "Total de Obras",
      value: stats.total.toString(),
      icon: Building2,
      description: "Obras cadastradas",
    },
    {
      title: "Em Andamento",
      value: stats.emAndamento.toString(),
      icon: TrendingUp,
      variant: "success" as const,
      description: "Obras em execução",
    },
    {
      title: "Concluídas",
      value: stats.concluidas.toString(),
      icon: CheckCircle,
      description: "Obras finalizadas",
    },
    {
      title: "Paralisadas",
      value: stats.paralisadas.toString(),
      icon: AlertTriangle,
      variant: stats.paralisadas > 0 ? ("warning" as const) : undefined,
      description: "Obras paradas",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.title} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {item.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">{item.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {item.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
      <Card className="col-span-2 lg:col-span-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Valor Total
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-mono">
            {formatCurrency(stats.valorTotalLicitado)}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="success" className="text-xs">
              {formatCurrency(stats.valorTotalExecutado)} executado
            </Badge>
            <span className="text-xs text-muted-foreground">
              ({((stats.valorTotalExecutado / stats.valorTotalLicitado) * 100).toFixed(1)}%)
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
