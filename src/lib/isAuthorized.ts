import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function isAuthorized() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }
}