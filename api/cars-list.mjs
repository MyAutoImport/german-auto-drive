// api/cars-list.mjs
import { supabaseAdmin } from './_supabase.mjs';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    // Pedimos SOLO estados visibles (o NULL) para evitar 500 por not-in con NULL
    const { data, error } = await supabaseAdmin
      .from('cars')
      .select('*')
      .or(
        [
          'status.is.null',
          'status.eq.available',
          'status.eq.reserved',
          'status.eq.Disponible',
          'status.eq.Reservado'
        ].join(',')
      )
      .order('created_at', { ascending: false });

    if (error) {
      console.error('cars-list error:', error);
      return res.status(500).json({ error: error.message });
    }

    // Filtro de seguridad por si hay valores raros
    const filtered = (data || []).filter(c => {
      const s = (c.status || '').trim().toLowerCase();
      return s === '' || s === 'available' || s === 'reserved' || s === 'disponible' || s === 'reservado';
    });

    return res.json(filtered);
  } catch (err) {
    console.error('cars-list catch:', err);
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
