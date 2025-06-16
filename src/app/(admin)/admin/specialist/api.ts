export async function addSpecialist(name: string,specialtyId:string) {
    const response = await fetch('/api/specialist/creat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name,specialtyId}),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка при создании специальноста');
    }

    return await response.json();
}

export async function fetchSpecialists() {
  const res = await fetch('/api/specialist/get');
  if (!res.ok) throw new Error('Ошибка загрузки специалистов');
  return res.json();
}