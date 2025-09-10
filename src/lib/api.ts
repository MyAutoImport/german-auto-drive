// src/lib/api.ts
export async function getCars() {
  const r = await fetch('/api/cars-list');
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

export async function createCar(brand: string, model: string, year: number) {
  const r = await fetch('/api/cars-create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ brand, model, year }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

