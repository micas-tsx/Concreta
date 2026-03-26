"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Foto } from "@/types";
import { fotoCategoriaLabels } from "@/types";
import { formatDate } from "@/lib/utils";

interface ObraPhotosProps {
  fotos: Foto[];
}

export function ObraPhotos({ fotos }: ObraPhotosProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (fotos.length === 0) {
    return null;
  }

  const openViewer = (index: number) => setSelectedIndex(index);
  const closeViewer = () => setSelectedIndex(null);
  const goNext = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % fotos.length : null
    );
  const goPrev = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + fotos.length) % fotos.length : null
    );

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Fotos do Canteiro de Obras ({fotos.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {fotos.map((foto, index) => (
              <button
                key={foto.id}
                onClick={() => openViewer(index)}
                className="relative aspect-video rounded overflow-hidden group focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <img
                  src={foto.thumbnailUrl}
                  alt={foto.legenda || "Foto da obra"}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {fotoCategoriaLabels[foto.categoria]}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={closeViewer}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
            aria-label="Fechar"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={goPrev}
            className="absolute left-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
            aria-label="Próxima foto"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="max-w-4xl max-h-[80vh] px-16">
            <img
              src={fotos[selectedIndex].url}
              alt={fotos[selectedIndex].legenda || "Foto da obra"}
              className="max-w-full max-h-[75vh] object-contain rounded"
            />
            <div className="mt-4 text-center">
              {fotos[selectedIndex].legenda && (
                <p className="text-white text-sm">
                  {fotos[selectedIndex].legenda}
                </p>
              )}
              <div className="flex justify-center gap-4 mt-2">
                <Badge variant="outline" className="text-white border-white">
                  {fotoCategoriaLabels[fotos[selectedIndex].categoria]}
                </Badge>
                <span className="text-white/60 text-xs">
                  {formatDate(fotos[selectedIndex].dataCaptura)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
