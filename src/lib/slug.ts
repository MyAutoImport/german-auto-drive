export function toCarSlug(brand: string, model: string) {
  return (brand + '_' + model)
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/[^a-z0-9_]+/gi, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}