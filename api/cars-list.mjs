// api/cars-list.mjs
import { supabaseAdmin } from './_supabase.mjs';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    // Mostrar solo coches visibles en la web:
    // - status NULL (por compatibilidad)
    // - 'available' / 'reserved' (en inglés)
    // - 'Disponible' / 'Reservado' (en español)
    const { data, error } = await supabaseAdmin
      .from('cars')
      .select('*')
      .or('status.is.null,status.eq.available,status.eq.reserved,status.eq.Disponible,status.eq.Reservado')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data || []);
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Unknown error' });
  }
}
