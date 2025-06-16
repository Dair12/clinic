'use client'

import React from 'react'
import { fetchSpecialties } from '@/app/(admin)/admin/specialty/api';
import { fetchSpecialists,addSpecialist } from './api';
import type {Specialty} from '@/app/(admin)/admin/specialty/dto.ts';
import type {Specialist} from './dto';

export default function Specialty() {
  const [specialist, setSpecialist] = React.useState('');
  const [specialtyId, setSpecialtyId] = React.useState("");
  const [specialties, setSpecialties] = React.useState<Specialty[]>([]);
  const [specialists, setSpecialists] = React.useState<Specialist[]>([]);

  React.useEffect(() => {
    const loadSpecialists = async () => {
      try {
        const data = await fetchSpecialists();
        setSpecialists(data);
      } catch (err: any) {
        console.error('Ошибка загрузки:', err.message);
      }
    };
    loadSpecialists();

    async function loadSpecialties() {
      try {
        const data = await fetchSpecialties();
        setSpecialties(data);
      } catch (error) {
        console.error("Ошибка загрузки специальностей:", error);
      }
    }
    loadSpecialties();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await addSpecialist(specialist, specialtyId);
        setSpecialist("");
        setSpecialtyId("");
        const updated = await fetchSpecialists();
        setSpecialists(updated);
      } catch (error: any) {
        alert(error.message);
      }
  }
  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">Специалисты</h1>
        <input type="text" placeholder="Имя специалиста" value={specialist} onChange={(e) => setSpecialist(e.target.value)} />
        <select
          value={specialtyId}
          onChange={(e) => setSpecialtyId(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Выберите специальность</option>
          {specialties.map((s: any) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 mb-4" onClick={handleSubmit}>Добавить специальноста</button>

        <ul className="list-disc pl-5">
          {specialists.map((s) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
    </div>
  )
}
