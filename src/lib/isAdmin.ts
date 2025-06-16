import { redirect } from 'next/navigation';

export async function isAdmin() {
    const response = await fetch('http://localhost:3000/api/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка при получении роли');
    }
    const data = await response.json();
    if( data.role!== 'ADMIN') {
        redirect('/login');
    }
}