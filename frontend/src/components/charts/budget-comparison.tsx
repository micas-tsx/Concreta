"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface BudgetComparisonData {
  name: string;
  value: number;
  color: string;
}

interface BudgetComparisonChartProps {
  licitado: number;
  contratado: number;
  executado: number;
}

export function BudgetComparisonChart({
  licitado,
  contratado,
  executado,
}: BudgetComparisonChartProps) {
  const data: BudgetComparisonData[] = [
    { name: "Licitado", value: licitado, color: "#6b7280" },
    { name: "Contratado", value: contratado, color: "#3b82f6" },
    { name: "Executado", value: executado, color: "#10b981" },
  ];

  const maxValue = Math.max(licitado, contratado, executado);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Comparativo Orçamentário
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 10 }}
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                  return value;
                }}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  fontSize: 12,
                }}
                formatter={(value: number) => [formatCurrency(value), ""]}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-between text-xs">
          <span className="text-muted-foreground">
            Total: {formatCurrency(contratado)}
          </span>
          <span className="text-emerald-500">
            {((executado / contratado) * 100).toFixed(1)}% executado
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
