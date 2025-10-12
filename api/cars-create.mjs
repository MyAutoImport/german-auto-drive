// api/cars-create.mjs
import { supabaseAdmin } from './_supabase.mjs';

// Simple slug generation function
function toCarSlug(brand, model) {
  return (brand + '_' + model)
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/[^a-z0-9_]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

// CAR_COLUMNS constant with all necessary columns including slug
const CAR_COLUMNS = 'id, slug, brand, model, year, price, old_price, km, fuel, transmission, power_cv, savings, image_url, description, badges, features, specs, equipment, status';

/**
 * POST /api/cars-create
 * Body JSON mínimo: { brand, model, year }
 * Campos opcionales soportados:
 *  - status: 'available' | 'reserved' | 'archived'   (por defecto: 'available')
 *  - price, old_price, km, power: number
 *  - fuel, transmission, description, image_url: string
 *  - features, tags: string[]
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // --- 1) Parseo + validación ligera ---
  const body = req.body || {};
  const { brand, model, year } = body;

  if (!brand || !model || !Number.isInteger(Number(year))) {
    return res
      .status(400)
      .json({ error: 'Invalid payload: required brand, model, year (integer).' });
  }

  // status permitido
  const allowedStatus = new Set(['available', 'reserved', 'archived']);
  let status = (body.status || 'available').toString().toLowerCase();
  if (!allowedStatus.has(status)) status = 'available';

  // Util para castear números si vienen como string
  const num = (v) => (v === undefined || v === null || v === '' ? undefined : Number(v));

  // --- 2) Construimos el payload permitiendo sólo campos conocidos ---
  const slug = toCarSlug(String(brand), String(model));
  
  const payload = {
    brand: String(brand),
    model: String(model),
    slug: slug,
    year: Number(year),
    status, // <- NUEVO

    // opcionales habituales (ajusta según tu tabla)
    price: num(body.price),
    old_price: num(body.old_price),
    km: num(body.km),
    power_cv: num(body.power_cv || body.power), // support both power_cv and power for compatibility
    savings: num(body.savings),

    fuel: body.fuel?.toString(),
    transmission: body.transmission?.toString(),
    description: body.description?.toString(),
    image_url: body.image_url?.toString(),

    // arrays de strings
    features: Array.isArray(body.features)
      ? body.features.map(String)
      : undefined,
    badges: Array.isArray(body.badges)
      ? body.badges.map(String)
      : undefined,
    equipment: Array.isArray(body.equipment)
      ? body.equipment.map(String)
      : undefined,
    
    // specs as jsonb
    specs: body.specs && typeof body.specs === 'object' ? body.specs : undefined,
  };

  // eliminamos las claves que quedaron undefined para no romper columnas que no existan
  for (const k of Object.keys(payload)) {
    if (payload[k] === undefined) delete payload[k];
  }

  try {
    // --- 3) Insert en Supabase ---
    const { data, error } = await supabaseAdmin
      .from('cars')
      .insert([payload])
      .select(CAR_COLUMNS)
      .single();

    if (error) return res.status(500).json({ error: error.message });

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
