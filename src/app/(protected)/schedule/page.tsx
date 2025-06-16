"use client"

import React from 'react'
import type {Specialty} from '@/app/(admin)/admin/specialty/dto.ts';
import type {Specialist} from '@/app/(admin)/admin/specialist/dto';
import { fetchSpecialties } from '@/app/(admin)/admin/specialty/api';
import { fetchSpecialistsBySpecialty,addAppointment } from './api';

export default function schedule() {
  const [specialistId, setSpecialistId] = React.useState('');
  const [specialtyId, setSpecialtyId] = React.useState("");
  const [specialties, setSpecialties] = React.useState<Specialty[]>([]);
  const [specialists, setSpecialists] = React.useState<Specialist[]>([]);
  const [dateTime, setDateTime] = React.useState('');

  React.useEffect(() => {  
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

    async function loadSpecialtiesBySpecialty(specialtyId:string){
      try {
        const data = await fetchSpecialistsBySpecialty(specialtyId);
        setSpecialists(data);
      } catch (error) {
        console.error("Ошибка загрузки специалистов:", error);
      }
    }

  async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      try {
        const response = await addAppointment(specialistId, dateTime);
        console.log("Запись успешно создана:", response);
      } catch (error) {
        console.error("Ошибка при создании записи:", error);
      }
    }

  return (
    <div>
      <select
          value={specialtyId}
          onChange={async (e) => {setSpecialtyId(e.target.value); await loadSpecialtiesBySpecialty(e.target.value)}}
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

        <select
          value={specialistId}
          onChange={(e) => setSpecialistId(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Выберите специальность</option>
          {specialists.map((s: any) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">Записатся</button>
    </div>
  )
}
