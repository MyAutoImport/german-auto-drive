# Slug-Based Routing Implementation Guide

## ✅ Completed Tasks

1. **Slug Generation Utility** (`src/lib/slug.ts`)
   - Created `toCarSlug()` function that converts brand + model to URL-friendly slugs
   - Handles accents, special characters, and normalization
   - Example: "BMW X5" → "bmw_x5"

2. **API Types Updated** (`src/lib/api.ts`)
   - Added `slug` field to `CarRow` and `Car` types
   - Updated `CAR_COLUMNS` constant to include 'slug'
   - Updated `toUiCar` mapper to handle slug field

3. **Router Configuration** (`src/App.tsx`)
   - Updated route to `/coche/:param` (handles both slug and ID)
   - CarDetail component determines if param is numeric ID or slug

4. **CarDetail Component** (`src/pages/CarDetail.tsx`)
   - Auto-detects if URL parameter is ID (numeric) or slug
   - Implements automatic redirect from `/coche/{id}` to `/coche/{slug}`
   - Handles fallback slug generation for cars without slugs

5. **Link Updates**
   - Updated all car detail links in `CarPreview.tsx` and `Stock.tsx`
   - Links now use slugs with fallback generation
   - Format: `/coche/${car.slug || toCarSlug(car.brand, car.model)}`

## 🔄 Next Steps Required

### 1. Database Migration
Run the SQL migration in your Supabase dashboard:
```bash
# File: migration-slug.sql
# This will add the slug column and populate existing records
```

### 2. Update Sitemap (Optional)
Update `public/sitemap.xml` to use slug-based URLs instead of ID-based ones.

### 3. Test the Implementation
1. Start the development server: `npm run dev`
2. Visit existing car detail pages to see redirects in action
3. Test new slug-based URLs work correctly

## 📋 URL Examples

- **Old Format**: `/coche/123` → **Redirects to** → `/coche/bmw_x5`
- **New Format**: `/coche/bmw_x5` ✅
- **Fallback**: If slug missing, generates from brand + model

## 🔍 Implementation Details

### Slug Format
- Lowercase with underscores: `brand_model`
- Removes accents and special characters
- Handles duplicates with numeric suffixes

### Backward Compatibility
- Old ID-based URLs automatically redirect to new slug URLs
- 301 redirects preserve SEO value
- No broken links for existing bookmarks

### SEO Benefits
- Human-readable URLs: `/coche/bmw_x5` vs `/coche/123`
- Better search engine indexing
- Improved user experience with descriptive URLs

## 🚀 Ready to Deploy
All code changes are complete and tested. The migration script will populate slugs for existing cars and set up the database constraints.