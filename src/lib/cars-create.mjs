import { supabaseAdmin } from './_supabase.mjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { brand, model, year } = req.body || {};
  if (!brand || !model || !Number.isInteger(year))
    return res.status(400).json({ error: 'Invalid payload' });

  const { data, error } = await supabaseAdmin
    .from('cars')
    .insert([{ brand, model, year }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

