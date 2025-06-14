import React from 'react'


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1>Добропожаловать в нашу клинику</h1>
      <p>Выберите то то вас интересует:</p>
      <a href="/login" className="text-blue-500 hover:underline">Войти</a>
      <a href="/register" className="text-blue-500 hover:underline">Зарегистрироваться</a>
    </div>
  )
}
