-- Migration to add slug column and populate it
-- Run this in your Supabase SQL editor

-- Add slug column to cars table
ALTER TABLE cars ADD COLUMN IF NOT EXISTS slug TEXT;

-- Create function to generate slug from brand and model
CREATE OR REPLACE FUNCTION generate_car_slug(brand_text TEXT, model_text TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN LOWER(
    REGEXP_REPLACE(
      REGEXP_REPLACE(
        UNACCENT(COALESCE(brand_text, '') || '_' || COALESCE(model_text, '')),
        '[^a-zA-Z0-9_]', '_', 'g'
      ),
      '_+', '_', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Populate existing rows with slugs
UPDATE cars 
SET slug = generate_car_slug(brand, model)
WHERE slug IS NULL;

-- Create unique index on slug (handles duplicates by adding suffix)
DO $$
DECLARE
    r RECORD;
    new_slug TEXT;
    counter INT;
BEGIN
    -- Handle duplicates by adding numeric suffix
    FOR r IN SELECT id, slug FROM cars WHERE slug IN (
        SELECT slug FROM cars GROUP BY slug HAVING COUNT(*) > 1
    ) ORDER BY id LOOP
        counter := 1;
        new_slug := r.slug || '_' || counter;
        
        WHILE EXISTS (SELECT 1 FROM cars WHERE slug = new_slug AND id != r.id) LOOP
            counter := counter + 1;
            new_slug := r.slug || '_' || counter;
        END LOOP;
        
        UPDATE cars SET slug = new_slug WHERE id = r.id;
    END LOOP;
END $$;

-- Create unique index
CREATE UNIQUE INDEX IF NOT EXISTS idx_cars_slug ON cars(slug);

-- Add constraint to ensure slug is always populated for new records
ALTER TABLE cars ADD CONSTRAINT cars_slug_not_null CHECK (slug IS NOT NULL);

-- Drop the helper function as it's no longer needed
DROP FUNCTION generate_car_slug(TEXT, TEXT);

-- Verify the migration
SELECT COUNT(*) as total_cars, COUNT(DISTINCT slug) as unique_slugs FROM cars;