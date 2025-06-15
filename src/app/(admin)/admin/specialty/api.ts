export async function addSpecialty(name: string) {
    const response = await fetch('/api/specialty/creat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name}),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка при создании специальности');
    }

    return await response.json();
}

export async function fetchSpecialties() {
  const res = await fetch('/api/specialty/get');
  if (!res.ok) throw new Error('Ошибка загрузки специальностей');
  return res.json();
}