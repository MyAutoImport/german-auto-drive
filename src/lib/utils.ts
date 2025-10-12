import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Status helpers for consistent badge styling
export const STATUS_LABELS: Record<string, string> = {
  Disponible: 'Disponible',
  Reservado: 'Reservado',
  Vendido: 'Vendido',
};

export function getStatusVariant(status?: string): "default" | "warning" | "secondary" {
  if (status === "Disponible") return "default";
  if (status === "Reservado") return "warning";
  return "secondary";
}

export function getStatusClassName(status?: string): string {
  if (status === "Disponible") return "bg-green-600 hover:bg-green-700";
  if (status === "Reservado") return "";
  return "";
}
