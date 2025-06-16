export async function fetchSpecialistsBySpecialty(specialtyId: string) {
  const res = await fetch('/api/specialist/get_by_specialty?specialtyId=' + specialtyId);
  if (!res.ok) throw new Error('Ошибка загрузки специалистов');
  return res.json();
}

export async function addAppointment(specialistId: string, date: string) {
  const response = await fetch('/api/appointment/creat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({specialistId,date}),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка при создании записи');
    }

    return await response.json();
}