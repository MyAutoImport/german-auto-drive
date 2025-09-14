// /api/cars-list.mjs
import { supabaseAdmin } from './_supabase.mjs';

const PUBLIC_BUCKET = process.env.PUBLIC_BUCKET || 'fotos_cars';
const SUPABASE_URL  = process.env.SUPABASE_URL; // p.ej. https://xxxx.supabase.co

function toPublicUrl(pathOrUrl) {
  if (!pathOrUrl) return null;
  const s = String(pathOrUrl).trim();
  if (/^https?:\/\//i.test(s)) return s; // ya es URL completa
  return `${SUPABASE_URL}/storage/v1/object/public/${PUBLIC_BUCKET}/${encodeURI(s)}`;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const { data, error } = await supabaseAdmin
      .from('cars')
      .select('*')
      .neq('status', 'Archivado')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });

    // ⬇️ normaliza SOLO la URL de imagen, mantiene mismo shape (array)
    const out = (data || []).map(c => ({
      ...c,
      image_url: toPublicUrl(c.image_url),
    }));

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json(out);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
