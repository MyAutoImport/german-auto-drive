// api/cars-create.mjs
import { supabaseAdmin } from './_supabase.mjs';

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
  const payload = {
    brand: String(brand),
    model: String(model),
    year: Number(year),
    status, // <- NUEVO

    // opcionales habituales (añade/borra según tu tabla)
    price: num(body.price),
    old_price: num(body.old_price),
    km: num(body.km),
    power: num(body.power),

    fuel: body.fuel?.toString(),
    transmission: body.transmission?.toString(),
    description: body.description?.toString(),
    image_url: body.image_url?.toString(),

    // arrays de strings
    features: Array.isArray(body.features)
      ? body.features.map(String)
      : undefined,
    tags: Array.isArray(body.tags)
      ? body.tags.map(String)
      : undefined,
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
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
