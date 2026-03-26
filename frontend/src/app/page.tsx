"use client";

import { useEffect, Suspense, useState } from "react";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { DashboardMap } from "@/components/map/dashboard-map";
import { ObrasList } from "@/components/dashboard/obra-list";
import { useUrlSync } from "@/hooks/use-url-sync";
import { useLiveAnnouncer } from "@/hooks/use-live-announcer";
import { useFilterStore } from "@/store/filter-store";
import { useObras } from "@/hooks/use-obras";

function DashboardContent() {
  const { syncFromUrl, updateUrl } = useUrlSync();
  const { filters } = useFilterStore();
  const { filtered, total } = useObras();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    syncFromUrl();
  }, [syncFromUrl]);

  useEffect(() => {
    updateUrl();
  }, [filters, updateUrl]);

  useEffect(() => {
    if (filtered !== total) {
      setAnnouncement(`${filtered} obras encontradas de ${total} total`);
    } else {
      setAnnouncement(`${total} obras carregadas`);
    }
  }, [filtered, total]);

  useLiveAnnouncer(announcement);

  return (
    <>
      <StatsGrid />
      <FilterBar />
      <DashboardMap />
      <ObrasList />
    </>
  );
}

export default function HomePage() {
  return (
    <main id="main-content" className="container mx-auto py-6 px-4 space-y-6">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-bold tracking-tight">
          CONCRETA
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Painel de Monitoramento Urbano de Obras Públicas
        </p>
      </header>

      <Suspense fallback={<div className="text-center py-8">Carregando...</div>}>
        <DashboardContent />
      </Suspense>
    </main>
  );
}
