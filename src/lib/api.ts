// src/lib/api.ts
export async function getCars() {
  const r = await fetch('/api/cars-list');
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}
