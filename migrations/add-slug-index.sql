-- Migration: Add unique index for car slugs
-- Run this in your Supabase SQL editor

-- Create unique index for slugs (if it doesn't exist)
CREATE UNIQUE INDEX IF NOT EXISTS cars_slug_key ON public.cars(slug);

-- Optional: Add constraint to ensure slug is not null for new records
-- (Only add if you want to enforce this at database level)
-- ALTER TABLE public.cars ADD CONSTRAINT cars_slug_not_null CHECK (slug IS NOT NULL AND slug != '');

-- Verify the index was created
SELECT 
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes 
WHERE tablename = 'cars' AND indexname = 'cars_slug_key';

-- Check current slug status
SELECT 
  COUNT(*) as total_cars,
  COUNT(slug) as cars_with_slug,
  COUNT(*) - COUNT(slug) as cars_missing_slug
FROM public.cars;