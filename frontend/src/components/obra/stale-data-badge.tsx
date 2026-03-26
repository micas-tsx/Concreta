"use client";

import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StaleDataBadgeProps {
  daysSinceUpdate: number;
  threshold?: number;
}

export function StaleDataBadge({
  daysSinceUpdate,
  threshold = 30,
}: StaleDataBadgeProps) {
  if (daysSinceUpdate <= threshold) {
    return null;
  }

  return (
    <Badge variant="warning" className="gap-1 text-xs">
      <AlertTriangle className="h-3 w-3" />
      Dados desatualizados ({daysSinceUpdate} dias)
    </Badge>
  );
}
