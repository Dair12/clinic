'use client'

import React from 'react'
import { addSpecialty,fetchSpecialties } from './api';
import type {Specialty} from './dto';

export default function Specialty() {
  const [specialty, setSpecialty] = React.useState('');
  const [specialties, setSpecialties] = React.useState<Specialty[]>([]);

  React.useEffect(() => {
    const loadSpecialties = async () => {
      try {
        const data = await fetchSpecialties();
        setSpecialties(data);
      } catch (err: any) {
        console.error('Ошибка загрузки:', err.message);
      }
    };
    loadSpecialties();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await addSpecialty(specialty);
        setSpecialty('');
        const updated = await fetchSpecialties();
        setSpecialties(updated);
      } catch (error: any) {
        alert(error.message);
      }
  }
  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">Специальности</h1>
        <input type="text" placeholder="Название специальности" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 mb-4" onClick={handleSubmit}>Добавить специальность</button>

        <ul className="list-disc pl-5">
          {specialties.map((s) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
    </div>
  )
}
