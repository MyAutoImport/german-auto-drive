// /api/cars-list.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY!; // basta, el bucket es público
const PUBLIC_BUCKET = process.env.PUBLIC_BUCKET || 'fotos_cars';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, { auth: { persistSession: false } });

const toPublicUrl = (pathOrUrl?: string | null) => {
  if (!pathOrUrl) return null;
  const s = pathOrUrl.trim();
  if (/^https?:\/\//i.test(s)) return s; // ya es URL completa
  return `${SUPABASE_URL}/storage/v1/object/public/${PUBLIC_BUCKET}/${encodeURI(s)}`;
};

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  const cars = (data || []).map(c => ({
    ...c,
    image_url: toPublicUrl(c.image_url),
  }));

  res.status(200).json({ cars });
}
