import { supabaseAdmin } from './_supabase.mjs';

// CAR_COLUMNS constant with all necessary columns
const CAR_COLUMNS = 'id, brand, model, year, price, old_price, km, fuel, transmission, power_cv, savings, image_url, description, badges, features, specs, equipment, status';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') return res.status(405).end();

  try {
    const { id, status } = req.body || {};
    if (!id || !status) return res.status(400).json({ error: 'id y status requeridos' });

    const { data, error } = await supabaseAdmin
      .from('cars')
      .update({ status })
      .eq('id', id)
      .select(CAR_COLUMNS)
      .single();

    if (error) throw error;
    res.json({ ok: true, car: data });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Server error' });
  }
}
