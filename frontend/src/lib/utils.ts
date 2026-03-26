import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function calculateDaysBetween(start: Date, end: Date): number {
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function isStale(lastUpdate: Date | null, daysThreshold = 30): boolean {
  if (!lastUpdate) return true;
  const now = new Date();
  const diffDays = calculateDaysBetween(lastUpdate, now);
  return diffDays > daysThreshold;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    nao_iniciada: "bg-gray-500",
    em_andamento: "bg-emerald-500",
    paralisada: "bg-amber-500",
    concluida: "bg-blue-500",
    atrasada: "bg-red-500",
  };
  return colors[status] || "bg-gray-500";
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function generateId(): string {
  return crypto.randomUUID();
}

export const BAIRROS = [
  "Centro",
  "Jardim das Flores",
  "Vila Nova",
  "Parque Industrial",
  "Bairro Alto",
  "Rio Novo",
  "Cidade Jardim",
  "Vila São José",
  "Distrito Empresarial",
  "Residencial Esperança",
] as const;

export type Bairro = (typeof BAIRROS)[number];
