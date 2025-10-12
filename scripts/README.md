# Slug Backfill Process

## Prerequisites

1. Set environment variables:
   ```bash
   export NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   ```

## Option 1: Run JavaScript version (Recommended)

```bash
cd scripts
node backfill-slugs.js
```

## Option 2: Run TypeScript version

Install dependencies if needed:
```bash
npm install -g ts-node
```

Then run:
```bash
cd scripts
ts-node backfill-slugs.ts
```

## What the script does:

1. **Finds cars without slugs**: Selects cars where `slug IS NULL OR slug = ''`
2. **Gets existing slugs**: Builds a set to avoid collisions
3. **Generates new slugs**: Uses `toCarSlug(brand, model)` function
4. **Handles collisions**: Adds `_${id}` suffix if slug already exists
5. **Updates database**: Sets slug for each car missing one

## Expected output:

```
🚀 Starting slug backfill process...
📋 Found 10 cars without slugs
📋 25 existing slugs found
✅ Updated car 1: BMW X5 → bmw_x5
✅ Updated car 2: Porsche GT3 → porsche_gt3
✅ Updated car 3: Mercedes C-Class → mercedes_c_class
...
🎉 Backfill done! All cars now have slugs.
```

## After running:

1. **Verify completion**: 
   ```sql
   SELECT COUNT(*) FROM public.cars WHERE slug IS NULL OR slug = '';
   ```
   Should return 0.

2. **Create unique index** (run in Supabase SQL editor):
   ```sql
   CREATE UNIQUE INDEX IF NOT EXISTS cars_slug_key ON public.cars(slug);
   ```

3. **Test the application**:
   - All stock links should use `/coche/{slug}`
   - Car detail pages should load by slug
   - Old ID links should redirect to slug URLs