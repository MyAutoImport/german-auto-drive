// scripts/backfill-slugs.js
const { createClient } = require('@supabase/supabase-js');

// Simple slug generator (copied from src/lib/slug.ts)
function toCarSlug(brand, model) {
  return (brand + '_' + model)
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/[^a-z0-9_]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY; // service role

if (!url || !key) {
  console.error('❌ Missing SUPABASE envs. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'); 
  process.exit(1);
}

const sb = createClient(url, key);

async function main() {
  console.log('🚀 Starting slug backfill process...');
  
  // 1) lee los que no tienen slug
  const { data: cars, error } = await sb
    .from('cars')
    .select('id,brand,model,slug')
    .or('slug.is.null,slug.eq.')
    .order('id', { ascending: true });

  if (error) throw error;
  if (!cars?.length) { 
    console.log('✅ No missing slugs found'); 
    return; 
  }

  console.log(`📋 Found ${cars.length} cars without slugs`);

  // 2) mapa para evitar colisiones
  const taken = new Set();
  {
    const { data } = await sb.from('cars').select('slug').not('slug', 'is', null);
    data?.forEach(r => r.slug && taken.add(r.slug));
  }

  console.log(`📋 ${taken.size} existing slugs found`);

  for (const c of cars) {
    let slug = toCarSlug(c.brand || '', c.model || '');
    if (!slug) slug = `car_${c.id}`;
    
    // si choca, añade _{id}
    if (taken.has(slug)) {
      slug = `${slug}_${c.id}`;
    }
    taken.add(slug);

    const { error: upErr } = await sb
      .from('cars')
      .update({ slug })
      .eq('id', c.id);
      
    if (upErr) {
      console.error(`❌ Update error for car ${c.id}:`, upErr.message);
    } else {
      console.log(`✅ Updated car ${c.id}: ${c.brand} ${c.model} → ${slug}`);
    }
  }

  console.log('🎉 Backfill done! All cars now have slugs.');
}

main().catch(e => { 
  console.error('❌ Backfill failed:', e); 
  process.exit(1); 
});