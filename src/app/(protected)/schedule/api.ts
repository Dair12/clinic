export async function fetchSpecialistsBySpecialty(specialtyId: string) {
  const res = await fetch('/api/specialist/get_by_specialty?specialtyId=' + specialtyId);
  if (!res.ok) throw new Error('Ошибка загрузки специалистов');
  return res.json();
}