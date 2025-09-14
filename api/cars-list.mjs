// /api/cars-list.ts  (Vercel Node functions)
// TS/JS común. No necesita Next types.

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const SUPABASE_URL   = process.env.SUPABASE_URL;
    const SUPABASE_ANON  = process.env.SUPABASE_ANON_KEY; // clave pública
    const PUBLIC_BUCKET  = process.env.PUBLIC_BUCKET || 'fotos_cars';

    if (!SUPABASE_URL || !SUPABASE_ANON) {
      return res.status(500).json({ error: 'Missing Supabase env vars' });
    }

    // ESM -> import dinámico para evitar errores en runtime CJS
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
      auth: { persistSession: false },
    });

    const toPublicUrl = (pathOrUrl?: string | null) => {
      if (!pathOrUrl) return null;
      const s = String(pathOrUrl).trim();
      if (/^https?:\/\//i.test(s)) return s; // ya es URL completa
      return `${SUPABASE_URL}/storage/v1/object/public/${PUBLIC_BUCKET}/${encodeURI(s)}`;
    };

    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // Devuelve mensaje claro para depurar en prod
      return res.status(500).json({ error: `Supabase: ${error.message}` });
    }

    const cars = (data || []).map((c: any) => ({
      ...c,
      image_url: toPublicUrl(c.image_url),
    }));

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json({ cars });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'Internal error' });
  }
}
