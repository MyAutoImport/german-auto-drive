import { supabaseAdmin } from './_supabase.mjs';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') return res.status(405).end();

  try {
    const { id, status } = req.body || {};
    if (!id || !status) return res.status(400).json({ error: 'id y status requeridos' });

    const { data, error } = await supabaseAdmin
      .from('cars')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json({ ok: true, car: data });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Server error' });
  }
}
