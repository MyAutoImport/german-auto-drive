// api/cars-list.mjs
import { supabaseAdmin } from './_supabase.mjs';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  // Permite limitar resultados para el preview de la Home: /api/cars-list?limit=3
  const limit = Number(req.query.limit ?? 0) || null;

  try {
    // Mostrar solo coches visibles:
    // - status NULL (compatibilidad)
    // - available / reserved (inglés)
    // - Disponible / Reservado (español)
    // Usamos .or con un .in() para estados + .is.null para null
    let query = supabaseAdmin
      .from('cars')
      .select('*')
      .or('status.is.null,status.in.(available,reserved,Disponible,Reservado)')
      .order('created_at', { ascending: false });

    if (limit) query = query.limit(limit);

    const { data, error } = await query;

    if (error) {
      // Devuelve el detalle del error para ver en Network de DevTools
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data || []);
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Unknown error' });
  }
}
