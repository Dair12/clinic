'use client'

import React, {useState} from 'react'
import { register } from './api';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const response = await register(name, email, password);
        alert("Успешная регистрация!");
        router.push('/login');
        } catch (error: any) {
        alert(error.message);
        }
    };

  return (
    <div>
        <h1>Регистрация</h1>
        <input type="text" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSubmit}>Зарегистрироваться</button>
    </div>
  )
}
