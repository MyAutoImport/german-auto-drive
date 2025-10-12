export const EUR0 = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

function toNumberStrict(v: unknown): number {
  if (typeof v === 'number') return v;
  if (v == null) return NaN;
  // Normaliza strings tipo "80.000", "80.000,50", "€80,000.50"
  const s = String(v).replace(/[€\s]/g, '').replace(/\./g, '').replace(',', '.');
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

export function calcSavings(oldPrice: unknown, price: unknown) {
  const op = toNumberStrict(oldPrice);
  const p  = toNumberStrict(price);
  if (!Number.isFinite(op) || !Number.isFinite(p) || op <= p) return { amount: 0, percent: 0 };
  const amount = Math.round(op - p);
  const percent = Math.round(((op - p) / op) * 100);
  return { amount, percent };
}