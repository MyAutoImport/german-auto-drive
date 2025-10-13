// src/lib/api.ts

// Constant with all necessary Supabase columns
export const CAR_COLUMNS = 
  'id, brand, model, year, price, old_price, km, fuel, transmission, power_cv, savings, image_url, description, badges, features, specs, equipment, status, slug';

// Types for database row (snake_case)
export type CarRow = {
  id: number; 
  brand: string; 
  model: string; 
  year: number | null;
  price: number | null; 
  old_price: number | null; 
  km: number | null;
  fuel: string | null; 
  transmission: string | null; 
  power_cv: number | null;
  savings: number | null; 
  image_url: string | null; 
  description: string | null;
  badges: string[] | null; 
  features: string[] | null; 
  specs: Record<string, any> | null;
  equipment: string[] | null; 
  status: string | null;
  slug: string | null;
};

// Types for UI (camelCase)
export type Car = {
  id: number; 
  brand: string; 
  model: string; 
  year?: number;
  price?: number; 
  oldPrice?: number; 
  km?: number; 
  fuel?: string; 
  transmission?: string;
  powerCv?: number; 
  savings?: number; 
  imageUrl?: string | string[]; 
  images?: string[];
  description?: string;
  badges: string[]; 
  features: string[]; 
  specs: Record<string, any>; 
  equipment: string[]; 
  status?: string;
  slug?: string;
};

// Mapper from snake_case to camelCase
export function toUiCar(r: CarRow): Car {
  return {
    id: r.id, 
    brand: r.brand, 
    model: r.model,
    year: r.year ?? undefined,
    price: r.price ?? undefined,
    oldPrice: r.old_price ?? undefined,
    km: r.km ?? undefined,
    fuel: r.fuel ?? undefined,
    transmission: r.transmission ?? undefined,
    powerCv: r.power_cv ?? undefined,
    // Calculate savings if not available: old_price - price
    savings: r.savings ?? ((r.old_price != null && r.price != null && r.old_price > r.price) ? (Number(r.old_price) - Number(r.price)) : undefined),
    imageUrl: r.image_url ?? undefined,
    images: (r as any).images ?? undefined,
    description: r.description ?? undefined,
    badges: r.badges ?? [],
    features: r.features ?? [],
    specs: r.specs ?? {},
    equipment: r.equipment ?? [],
    status: r.status ?? undefined,
    slug: r.slug ?? undefined,
  };
}

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

