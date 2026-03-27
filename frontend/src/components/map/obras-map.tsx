"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import type { Obra } from "@/types";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { obraStatusLabels } from "@/types";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import "leaflet.markercluster";

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

const createClusterIcon = (cluster: L.MarkerCluster) => {
  const count = cluster.getChildCount();
  let size = "small";
  let radius = 30;
  
  if (count >= 100) {
    size = "large";
    radius = 50;
  } else if (count >= 50) {
    size = "medium";
    radius = 40;
  }

  return L.divIcon({
    html: `<div class="cluster-icon cluster-${size}"><span>${count}</span></div>`,
    className: "custom-cluster-icon",
    iconSize: L.point(radius, radius),
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

function MarkerClusterLayer({ obras }: { obras: Obra[] }) {
  const map = useMap();
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    if (clusterGroupRef.current) {
      map.removeLayer(clusterGroupRef.current);
    }

    const clusterGroup = L.markerClusterGroup({
      chunkedLoading: true,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      maxClusterRadius: 60,
      disableClusteringAtZoom: 18,
      iconCreateFunction: createClusterIcon,
      animate: true,
      animateAddingMarkers: false,
    });

    obras.forEach((obra) => {
      if (!obra.localização.latitude || !obra.localização.longitude) {
        return;
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

      const popupContent = `
        <div class="border-0 shadow-none w-64">
          <div class="p-2">
            <div class="text-sm font-semibold line-clamp-1 mb-2">
              ${obra.nome}
            </div>
            <div class="flex items-center gap-2 mb-2">
              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                obra.status === "em_andamento"
                  ? "bg-emerald-100 text-emerald-800"
                  : obra.status === "paralisada"
                    ? "bg-amber-100 text-amber-800"
                    : obra.status === "concluida"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
              }">
                ${obraStatusLabels[obra.status]}
              </span>
              <span class="text-xs text-gray-500">
                ${obra.localização.bairro}
              </span>
            </div>
            ${
              contrato
                ? `
            <div class="space-y-1 text-xs mb-2">
              <div class="flex justify-between">
                <span class="text-gray-500">Valor:</span>
                <span class="font-mono">${formatCurrency(contrato.valorContratado)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Execução:</span>
                <span class="font-mono font-semibold">${formatPercent(contrato.percentualExecutado)}</span>
              </div>
            </div>
            `
                : ""
            }
            <a href="/obras/${obra.id}" class="block text-center text-xs bg-primary text-primary-foreground rounded px-3 py-1.5 hover:bg-primary/90 transition-colors">
              Ver Detalhes
            </a>
          </div>
        </div>
      `;

      const marker = L.marker([obra.localização.latitude, obra.localização.longitude], {
        icon: createMarkerIcon(obra.status),
      });

      marker.bindPopup(popupContent, {
        className: "map-popup",
        maxWidth: 280,
      });

      clusterGroup.addLayer(marker);
    });

    map.addLayer(clusterGroup);
    clusterGroupRef.current = clusterGroup;

    return () => {
      if (clusterGroupRef.current) {
        map.removeLayer(clusterGroupRef.current);
      }
    };
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
    try {
      setMounted(true);
      if (typeof window !== "undefined") {
        delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }, []);

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
      <MarkerClusterLayer obras={obras} />
    </MapContainer>
  );
}
