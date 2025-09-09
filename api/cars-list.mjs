import { supabaseAdmin } from './_supabase.mjs';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const { data, error } = await supabaseAdmin.from('cars').select('*').limit(50);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}
