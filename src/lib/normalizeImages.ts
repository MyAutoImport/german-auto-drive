export function normalizeImages(
  image_url: string | string[] | null | undefined
): string[] {
  if (!image_url) return [];
  if (Array.isArray(image_url)) return image_url.filter(Boolean);
  const s = String(image_url).trim();
  if (!s) return [];
  if (s.startsWith("[")) {
    try {
      const arr = JSON.parse(s);
      return Array.isArray(arr) ? arr.filter(Boolean) : [];
    } catch {
      // cae abajo y trata como única URL
    }
  }
  return [s];
}