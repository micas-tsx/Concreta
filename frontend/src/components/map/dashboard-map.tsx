"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useObras } from "@/hooks/use-obras";

const ObrasMap = dynamic(
  () => import("./obras-map").then((mod) => mod.ObrasMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-muted rounded-lg">
        <div className="text-muted-foreground">Carregando mapa...</div>
      </div>
    ),
  }
);

export function DashboardMap() {
  const { obras } = useObras();

  return (
    <Card className="h-[calc(100vh-200px)] min-h-[400px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Mapa de Obras Públicas
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-60px)]">
        <ObrasMap obras={obras} />
      </CardContent>
    </Card>
  );
}
