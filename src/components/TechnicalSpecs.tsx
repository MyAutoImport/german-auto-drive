import { useState } from "react";
import { Button } from "@/components/ui/button";

const LABELS: Record<string, string> = {
  cilindrada_cc: "Cilindrada",
  potencia_kw: "Potencia (kW)",
  par_nm: "Par (Nm)",
  aceleracion_0_100_s: "0–100 km/h",
  vel_max_kmh: "Vel. máx.",
  traccion: "Tracción",
  marchas: "Marchas",
  consumo_mixto_l_100: "Consumo mixto",
  co2_g_km: "CO₂",
  etiqueta: "Etiqueta ambiental",
  maletero_l: "Maletero",
  peso_kg: "Peso",
  deposito_l: "Depósito",
  neumaticos: "Neumáticos",
  frenos: "Frenos",
  dimensiones_mm: "Dimensiones",
  batalla_mm: "Batalla",
  plazas: "Plazas",
  puertas: "Puertas",
  color_ext: "Color exterior",
  color_int: "Color interior"
};

type Car = { power_cv?: number | null; specs?: any };

function buildRows(car: Car) {
  const s = car.specs ?? {};
  const rows: { key: string; label: string; value: string }[] = [];
  const push = (k: string, v: any, fmt?: (x: any) => string) => {
    if (v !== null && v !== undefined && v !== "") {
      rows.push({
        key: k,
        label: LABELS[k] ?? k.replace(/_/g, " "),
        value: fmt ? fmt(v) : String(v)
      });
    }
  };

  // Orden sugerido + formatos
  push("potencia_kw", s.potencia_kw, (v) => `${v} kW${car.power_cv ? ` (${car.power_cv} CV)` : ""}`);
  push("par_nm", s.par_nm, (v) => `${v} Nm`);
  push("aceleracion_0_100_s", s.aceleracion_0_100_s, (v) => `${v} s`);
  push("vel_max_kmh", s.vel_max_kmh, (v) => `${v} km/h`);
  push("traccion", s.traccion);
  push("marchas", s.marchas);
  push("consumo_mixto_l_100", s.consumo_mixto_l_100, (v) => `${v} L/100 km`);
  push("co2_g_km", s.co2_g_km, (v) => `${v} g/km`);
  push("etiqueta", s.etiqueta);
  push("maletero_l", s.maletero_l, (v) => `${v} L`);
  push("peso_kg", s.peso_kg, (v) => `${v} kg`);
  push("deposito_l", s.deposito_l, (v) => `${v} L`);
  push("neumaticos", s.neumaticos);
  push("frenos", s.frenos);
  push("cilindrada_cc", s.cilindrada_cc, (v) => `${v} cc`);
  push("plazas", s.plazas);
  push("puertas", s.puertas);
  push("color_ext", s.color_ext);
  push("color_int", s.color_int);

  // Fix [object Object] para dimensiones
  if (s.dimensiones_mm) {
    const d = s.dimensiones_mm;
    const dims = [d?.largo, d?.ancho, d?.alto].filter(Boolean).join(" × ");
    if (dims) rows.push({ key: "dimensiones_mm", label: LABELS.dimensiones_mm, value: `${dims} mm` });
    if (d?.batalla) rows.push({ key: "batalla_mm", label: LABELS.batalla_mm, value: `${d.batalla} mm` });
  }

  return rows;
}

export default function TechnicalSpecs({ car }: { car: Car }) {
  if (!car) return null;
  
  const rows = buildRows(car);
  const [open, setOpen] = useState(false);
  const INITIAL = 10;
  const hidden = Math.max(rows.length - INITIAL, 0);
  const visible = open ? rows : rows.slice(0, INITIAL);

  if (rows.length === 0) return null;

  return (
    <div className="space-y-3">
      {visible.map((r) => (
        <div key={r.key} className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
          <span className="text-muted-foreground">{r.label}</span>
          <span className="font-medium text-foreground">{r.value}</span>
        </div>
      ))}
      {hidden > 0 && (
        <div className="pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(!open)}
            className="text-primary hover:text-primary/80"
          >
            {open ? "Ver menos" : `Mostrar todo (${hidden} más)`}
          </Button>
        </div>
      )}
    </div>
  );
}