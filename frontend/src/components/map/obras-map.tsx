"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { Obra } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { obraStatusLabels } from "@/types";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";

const createMarkerIcon = (status: string) => {
  const colors: Record<string, string> = {
    em_andamento: "#10b981",
    concluida: "#3b82f6",
    paralisada: "#f59e0b",
    nao_iniciada: "#6b7280",
  };
  const color = colors[status] || "#6b7280";

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background-color: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

function MapBoundsHandler({ obras }: { obras: Obra[] }) {
  const map = useMap();

  useEffect(() => {
    const validObras = obras.filter(
      (o) => o.localização.latitude && o.localização.longitude
    );
    if (validObras.length > 0) {
      const bounds = L.latLngBounds(
        validObras.map((o) => [o.localização.latitude!, o.localização.longitude!])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [obras, map]);

  return null;
}

interface ObrasMapProps {
  obras: Obra[];
}

export function ObrasMap({ obras }: ObrasMapProps) {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const center: [number, number] = [-23.85, -46.60];

  useEffect(() => {
    console.log("[ObrasMap] Component mounted, initializing...");
    try {
      setMounted(true);
      if (typeof window !== "undefined") {
        console.log("[ObrasMap] Window detected, setting up Leaflet...");
        delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        });
        console.log("[ObrasMap] Leaflet configured successfully");
      }
    } catch (err) {
      console.error("[ObrasMap] Error initializing:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }, []);

  useEffect(() => {
    console.log("[ObrasMap] Received obras:", obras.length, "obras");
  }, [obras]);

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted rounded-lg">
        <div className="text-red-500">Erro ao carregar mapa: {error}</div>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted rounded-lg">
        <div className="text-muted-foreground">Carregando mapa...</div>
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={12}
      className="h-full w-full rounded-lg"
      style={{ background: "hsl(var(--background))" }}
    >
      <MapBoundsHandler obras={obras} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {obras.map((obra) => {
        if (!obra.localização.latitude || !obra.localização.longitude) {
          return null;
        }

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
          <Marker
            key={obra.id}
            position={[obra.localização.latitude, obra.localização.longitude]}
            icon={createMarkerIcon(obra.status)}
          >
            <Popup className="map-popup">
              <Card className="border-0 shadow-none w-64">
                <CardHeader className="p-2">
                  <CardTitle className="text-sm font-semibold line-clamp-1">
                    {obra.nome}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 pt-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={statusVariant} className="text-xs">
                      {obraStatusLabels[obra.status]}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {obra.localização.bairro}
                    </span>
                  </div>
                  {contrato && (
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Valor:</span>
                        <span className="font-mono">
                          {formatCurrency(contrato.valorContratado)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Execução:</span>
                        <span className="font-mono font-semibold">
                          {formatPercent(contrato.percentualExecutado)}
                        </span>
                      </div>
                    </div>
                  )}
                  <Link
                    href={`/obras/${obra.id}`}
                    className="block text-center text-xs bg-primary text-primary-foreground rounded px-3 py-1.5 hover:bg-primary/90 transition-colors"
                  >
                    Ver Detalhes
                  </Link>
                </CardContent>
              </Card>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
