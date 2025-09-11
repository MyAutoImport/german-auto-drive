// api/cars-list.mjs
import { supabaseAdmin } from './_supabase.mjs';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    // Excluir archivados (normalizamos por si hay "Archivado"/"archivado")
    const { data, error } = await supabaseAdmin
      .from('cars')
      .select('*')
      // quitamos cualquiera de estos valores
      .not('status', 'in', '("archived","Archivado","archivado")')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data || []);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
