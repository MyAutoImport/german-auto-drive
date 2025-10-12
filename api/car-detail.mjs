// /api/car-detail.mjs
import { supabaseAdmin } from "./_supabase.mjs";

const SUPABASE_URL = process.env.SUPABASE_URL;
const PUBLIC_BUCKET = process.env.PUBLIC_BUCKET || "fotos_cars";

function pickFirst(val) {
  if (val == null) return null;
  if (Array.isArray(val)) return val[0] ?? null;
  if (typeof val === "object") {
    if (val.url) return val.url;
    try { const o = JSON.parse(val); return pickFirst(o); } catch { /* noop */ }
  }
  const s = String(val).trim();
  if (s.startsWith("[") || s.startsWith("{")) {
    try { const parsed = JSON.parse(s); return pickFirst(parsed); } catch { /* noop */ }
  }
  return s;
}

function toPublicUrl(pathOrUrl) {
  const first = pickFirst(pathOrUrl);
  if (!first) return null;
  if (/^https?:\/\//i.test(first)) return first;
  return `${SUPABASE_URL}/storage/v1/object/public/${PUBLIC_BUCKET}/${encodeURI(first)}`;
}

const CAR_COLUMNS = 'id, slug, brand, model, year, price, old_price, km, fuel, transmission, power_cv, savings, image_url, description, badges, features, specs, equipment, status';

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  
  const { idOrSlug } = req.query;
  if (!idOrSlug) return res.status(400).json({ error: "Missing idOrSlug parameter" });

  try {
    const key = String(idOrSlug);
    const isId = /^\d+$/.test(key);
    
    let car = null;
    
    if (isId) {
      // Look up by ID
      const { data, error } = await supabaseAdmin
        .from("cars")
        .select(CAR_COLUMNS)
        .eq("id", Number(key))
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 = not found
        return res.status(500).json({ error: error.message });
      }
      
      car = data;
      
      // If found by ID and has slug, return redirect response
      if (car?.slug) {
        return res.status(301).json({ 
          redirect: `/coche/${car.slug}`,
          car: {
            ...car,
            image_url: toPublicUrl(car.image_url)
          }
        });
      }
    } else {
      // Look up by slug
      const { data, error } = await supabaseAdmin
        .from("cars")
        .select(CAR_COLUMNS)
        .eq("slug", key)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        return res.status(500).json({ error: error.message });
      }
      
      car = data;
    }
    
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    
    // Return car with processed image URL
    const result = {
      ...car,
      image_url: toPublicUrl(car.image_url)
    };
    
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    res.json(result);
    
  } catch (error) {
    console.error("Error in car-detail:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}