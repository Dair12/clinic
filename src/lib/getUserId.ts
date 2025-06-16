import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'sdfgdsfgdsfgsdfgs';

export async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET) as { userId: string };
    return (decoded as any).userId;
  } catch (error) {
    console.error("Ошибка при расшифровке токена:", error);
    return null;
  }
}