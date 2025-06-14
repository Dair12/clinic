'use client'

import React, { useState } from 'react'
import { login } from './api';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response = await login(email, password);
      alert("Успешный вход!");
      router.push('/');
    }catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <div>
      <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type='password' placeholder='Пароль' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Войти</button>
    </div>
  )
}
