"use client";

import { useState } from "react";
import { Download, FileText, Table2, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { Obra } from "@/types";
import { exportToCsv, downloadCsv } from "@/lib/export-csv";

interface ExportModalProps {
  obras: Obra[];
  filename?: string;
  trigger?: React.ReactNode;
}

type ExportFormat = "csv" | "pdf";

export function ExportModal({ obras, filename = "obras", trigger }: ExportModalProps) {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<ExportFormat>("csv");
  const [includeDetails, setIncludeDetails] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      if (format === "csv") {
        const csv = exportToCsv(obras);
        const date = new Date().toISOString().split("T")[0];
        downloadCsv(csv, `${filename}-${date}.csv`);
      } else {
        window.print();
      }
      setOpen(false);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Exportar Dados</DialogTitle>
          <DialogDescription>
            Selecione o formato e as opções de exportação.
            {obras.length > 0 && ` ${obras.length} obra(s) será(ão) exportada(s).`}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Formato</Label>
            <RadioGroup value={format} onValueChange={(v) => setFormat(v as ExportFormat)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="flex items-center gap-2 cursor-pointer">
                  <Table2 className="h-4 w-4" />
                  CSV (Planilha)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center gap-2 cursor-pointer">
                  <FileText className="h-4 w-4" />
                  PDF (Impressão)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {format === "csv" && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeDetails"
                checked={includeDetails}
                onCheckedChange={(checked) => setIncludeDetails(checked as boolean)}
              />
              <Label htmlFor="includeDetails" className="text-sm cursor-pointer">
                Incluir detalhes completos (endereço, coordenadas, fontes)
              </Label>
            </div>
          )}

          {format === "pdf" && (
            <p className="text-sm text-muted-foreground">
              O PDF será gerado usando a função de impressão do navegador. 
              Configure a impressora para &quot;Salvar como PDF&quot;.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isExporting}>
            Cancelar
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Exportando...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Exportar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
