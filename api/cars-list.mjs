// /api/cars-list.mjs
import { supabaseAdmin } from "./_supabase.mjs";

const SUPABASE_URL = process.env.SUPABASE_URL;           // https://xxx.supabase.co
const PUBLIC_BUCKET = process.env.PUBLIC_BUCKET || "fotos_cars";

function pickFirst(val) {
  if (val == null) return null;
  if (Array.isArray(val)) return val[0] ?? null;
  if (typeof val === "object") {
    if (val.url) return val.url;
    // si viene como JSON stringizado de objeto
    try { const o = JSON.parse(val); return pickFirst(o); } catch { /* noop */ }
  }
  // string normal o string JSON de array
  const s = String(val).trim();
  if (s.startsWith("[") || s.startsWith("{")) {
    try { const parsed = JSON.parse(s); return pickFirst(parsed); } catch { /* noop */ }
  }
  return s;
}

function toPublicUrl(pathOrUrl) {
  const first = pickFirst(pathOrUrl);
  if (!first) return null;
  if (/^https?:\/\//i.test(first)) return first; // ya es URL completa
  // es un path dentro del bucket
  return `${SUPABASE_URL}/storage/v1/object/public/${PUBLIC_BUCKET}/${encodeURI(first)}`;
}

// CAR_COLUMNS constant with all necessary columns including slug
const CAR_COLUMNS = 'id, slug, brand, model, year, price, old_price, km, fuel, transmission, power_cv, savings, image_url, description, badges, features, specs, equipment, status';

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  try {
    const { data, error } = await supabaseAdmin
      .from("cars")
      .select(CAR_COLUMNS)
      .neq("status", "Archivado")
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });

    const out = (data || []).map((c) => ({
      ...c,
      image_url: toPublicUrl(c.image_url),
    }));

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json(out);
  } catch (err) {
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
}
