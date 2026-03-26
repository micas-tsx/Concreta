"use client";

import { useMap } from "react-leaflet";
import { Layers, ZoomIn, ZoomOut, Locate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface MapControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onLocate?: () => void;
}

export function MapControls({ onZoomIn, onZoomOut, onLocate }: MapControlsProps) {
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <Card className="overflow-hidden">
        <CardContent className="p-1">
          <div className="flex flex-col">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={onZoomIn}
              aria-label="Ampliar"
              title="Ampliar"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <div className="h-px bg-border" />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={onZoomOut}
              aria-label="Reduzir"
              title="Reduzir"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onLocate}
            aria-label="Centralizar no mapa"
            title="Centralizar no mapa"
          >
            <Locate className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Camadas do mapa"
            title="Camadas"
          >
            <Layers className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
