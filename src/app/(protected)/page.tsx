import React from 'react'


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1>Добропожаловать в нашу клинику</h1>
      <p>Выберите то что вас интересует:</p>
      <a href="/schedule" className="text-blue-500 hover:underline">Записатся на обследование</a>
      <a href="/about" className="text-blue-500 hover:underline">посмотреть информацию о нашй клинике</a>
    </div>
  )
}
