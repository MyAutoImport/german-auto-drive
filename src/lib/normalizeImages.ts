export function normalizeImages(image_url: string | string[] | null | undefined): string[] {
  if (!image_url) return [];
  if (Array.isArray(image_url)) return image_url.filter(Boolean);
  
  // es string; puede venir como JSON '["...","..."]' o una sola URL
  const trimmed = image_url.trim();
  if (trimmed.startsWith('[')) {
    try {
      const arr = JSON.parse(trimmed);
      return Array.isArray(arr) ? arr.filter(Boolean) : [];
    } catch { 
      /* ignore */ 
    }
  }
  return [trimmed];
}