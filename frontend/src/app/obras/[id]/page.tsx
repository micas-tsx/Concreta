import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, DollarSign, FileText, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getObraById } from "@/data/mock/obras";
import { getCronogramaByContratoId } from "@/data/mock/contracts";
import { getExecutionsByObraId, getChartData } from "@/data/mock/executions";
import { ExecutionChart } from "@/components/charts/execution-chart";
import { BudgetComparisonChart } from "@/components/charts/budget-comparison";
import {
  formatCurrency,
  formatDate,
  formatPercent,
  isStale,
} from "@/lib/utils";
import {
  obraTipoLabels,
  obraStatusLabels,
  etapaStatusLabels,
  fonteRecursoLabels,
} from "@/types";
import type { Metadata } from "next";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const obra = getObraById(params.id);
  if (!obra) {
    return { title: "Obra não encontrada - CONCRETA" };
  }
  return {
    title: `${obra.nome} - CONCRETA`,
    description: obra.descricao,
  };
}

export default function ObraDetailPage({ params }: PageProps) {
  const obra = getObraById(params.id);

  if (!obra) {
    return (
      <main className="container mx-auto py-24 px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <svg className="h-16 w-16 text-muted-foreground mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-2xl font-bold mb-2">Obra não encontrada</h1>
        <p className="text-muted-foreground mb-6 text-center max-w-md">
          A obra que você está procurando não existe ou foi removida. Verifique o
          ID e tente novamente.
        </p>
        <Link href="/">
          <Button>Voltar ao Mapa</Button>
        </Link>
      </main>
    );
  }

  const contrato = obra.contratos[0];
  const cronograma = contrato ? getCronogramaByContratoId(contrato.id) : undefined;
  const executions = getExecutionsByObraId(obra.id);
  const chartData = getChartData(obra.id);
  const latestExecution = executions[executions.length - 1];
  const hasStaleData = isStale(obra.lastExecutionUpdate);

  const statusVariant =
    obra.status === "em_andamento"
      ? "success"
      : obra.status === "paralisada"
        ? "warning"
        : obra.status === "concluida"
          ? "default"
          : "secondary";

  return (
    <main id="main-content" className="container mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="icon" aria-label="Voltar ao mapa">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight">{obra.nome}</h1>
          <p className="text-sm text-muted-foreground">{obra.descricao}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <Badge variant={statusVariant} className="text-sm">
          {obraStatusLabels[obra.status]}
        </Badge>
        <Badge variant="outline">{obraTipoLabels[obra.tipo]}</Badge>
        {hasStaleData && (
          <Badge variant="warning" className="text-xs">
            Dados desatualizados
          </Badge>
        )}
        {contrato?.emAditivo && (
          <Badge variant="destructive" className="text-xs">
            Com aditivo
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Localização
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="font-mono">{obra.localização.endereco}</div>
            <div className="text-muted-foreground">
              {obra.localização.bairro}, {obra.localização.cidade}
            </div>
            {obra.localização.locationUnconfirmed && (
              <Badge variant="warning" className="text-xs mt-2">
                Localização não confirmada
              </Badge>
            )}
          </CardContent>
        </Card>

        {contrato && (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Dados Financeiros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor Licitado:</span>
                  <span className="font-mono font-semibold">
                    {formatCurrency(contrato.valorLicitado)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor Contratado:</span>
                  <span className="font-mono">
                    {formatCurrency(contrato.valorContratado)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor Executado:</span>
                  <span className="font-mono text-emerald-500">
                    {formatCurrency(contrato.valorExecutado)}
                  </span>
                </div>
                {contrato.valorContratado > contrato.valorLicitado && (
                  <div className="flex justify-between text-amber-500">
                    <span>Aditivo:</span>
                    <span className="font-mono">
                      +{formatCurrency(contrato.valorContratado - contrato.valorLicitado)}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Cronograma
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Início Previsto:</span>
                  <span className="font-mono">
                    {formatDate(contrato.dataInicioPrevista)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Conclusão:</span>
                  <span className="font-mono">
                    {formatDate(contrato.dataConclusaoPrevista)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Execução:</span>
                  <span className="font-mono font-semibold">
                    {formatPercent(contrato.percentualExecutado)}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all"
                      style={{ width: `${contrato.percentualExecutado}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {contrato && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Contrato {contrato.numero}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
              <div>
                <div className="text-muted-foreground text-xs">Processo</div>
                <div className="font-mono">{contrato.processo}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">Modalidade</div>
                <div>{contrato.modalidade}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">Assinatura</div>
                <div className="font-mono">{formatDate(contrato.dataAssinatura)}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">Prazo</div>
                <div>{contrato.prazoDias} dias</div>
              </div>
            </div>

            {contrato.fonteRecursos.length > 0 && (
              <div className="mb-4">
                <div className="text-muted-foreground text-xs mb-1">
                  Fontes de Recursos
                </div>
                <div className="flex flex-wrap gap-1">
                  {contrato.fonteRecursos.map((fonte) => (
                    <Badge key={fonte} variant="outline" className="text-xs">
                      {fonteRecursoLabels[fonte]}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {contrato.aditivos.length > 0 && (
              <div>
                <div className="text-muted-foreground text-xs mb-2">
                  Aditivos ({contrato.aditivos.length})
                </div>
                <div className="space-y-2">
                  {contrato.aditivos.map((aditivo) => (
                    <div
                      key={aditivo.id}
                      className="flex items-center justify-between p-2 bg-muted rounded text-xs"
                    >
                      <div>
                        <span className="font-mono">{aditivo.numero}</span>
                        <span className="text-muted-foreground ml-2">
                          {aditivo.tipo === "valor"
                            ? "Aditivo de Valor"
                            : aditivo.tipo === "prazo"
                              ? "Aditivo de Prazo"
                              : "Aditivo de Valor e Prazo"}
                        </span>
                      </div>
                      <div className="font-mono">
                        {aditivo.tipo !== "prazo" &&
                          `+${formatCurrency(aditivo.valorAdicional)}`}
                        {aditivo.tipo === "valor_prazo" && " + "}
                        {aditivo.tipo !== "valor" && `${aditivo.novoPrazoDias} dias`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {cronograma && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Etapas do Cronograma
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cronograma.etapas.map((etapa, index) => (
                <div key={etapa.id} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        etapa.status === "concluida"
                          ? "bg-emerald-500"
                          : etapa.status === "em_andamento"
                            ? "bg-blue-500 animate-pulse"
                            : etapa.status === "atrasada"
                              ? "bg-red-500"
                              : "bg-gray-400"
                      }`}
                    />
                    {index < cronograma.etapas.length - 1 && (
                      <div className="w-0.5 h-8 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pb-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{etapa.nome}</span>
                      <Badge
                        variant={
                          etapa.status === "concluida"
                            ? "success"
                            : etapa.status === "atrasada"
                              ? "danger"
                              : etapa.status === "em_andamento"
                                ? "default"
                                : "secondary"
                        }
                        className="text-xs"
                      >
                        {etapaStatusLabels[etapa.status]}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Previsto: {formatDate(etapa.dataInicioPrevista)} -{" "}
                      {formatDate(etapa.dataFimPrevista)}
                    </div>
                    {etapa.dataFimReal && (
                      <div className="text-xs text-emerald-500 mt-0.5">
                        Concluído: {formatDate(etapa.dataFimReal)}
                      </div>
                    )}
                    <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                      <div
                        className={`h-1.5 rounded-full ${
                          etapa.status === "concluida"
                            ? "bg-emerald-500"
                            : etapa.status === "atrasada"
                              ? "bg-red-500"
                              : "bg-blue-500"
                        }`}
                        style={{ width: `${etapa.percentualExecutado}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {chartData.length > 0 && (
        <section aria-labelledby="evolution-heading">
          <h2 id="evolution-heading" className="text-lg font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Evolução da Execução
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExecutionChart
              data={chartData}
              title="Andamento Planejado vs Realizado"
            />
            {contrato && (
              <BudgetComparisonChart
                licitado={contrato.valorLicitado}
                contratado={contrato.valorContratado}
                executado={contrato.valorExecutado}
              />
            )}
          </div>
        </section>
      )}

      {obra.fotos.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fotos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {obra.fotos.map((foto) => (
                <div key={foto.id} className="relative aspect-video rounded overflow-hidden">
                  <img
                    src={foto.thumbnailUrl}
                    alt={foto.legenda || "Foto da obra"}
                    className="object-cover w-full h-full"
                  />
                  {foto.legenda && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                      {foto.legenda}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-xs text-muted-foreground text-center py-4 border-t">
        Última atualização:{" "}
        {obra.lastExecutionUpdate
          ? formatDate(obra.lastExecutionUpdate)
          : "Não disponível"}
      </div>
    </main>
  );
}
