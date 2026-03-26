import { ExportModal } from "./export-modal";
import type { Obra } from "@/types";

interface ExportButtonProps {
  obras: Obra[];
  filename?: string;
}

export function ExportButton({ obras, filename = "obras" }: ExportButtonProps) {
  return <ExportModal obras={obras} filename={filename} />;
}
