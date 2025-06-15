import React from 'react'

export default function Admin() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Админ панель</h1>
        <a href="/admin/specialty" className="text-blue-500 hover:underline">Специальности</a>
        <a href="/admin/specialist" className="text-blue-500 hover:underline">Специалисты</a>
    </div>
  )
}
