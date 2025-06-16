import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import {db} from "@/lib/db";

const SECRET = process.env.JWT_SECRET || 'sdfgdsfgdsfgsdfgs';

export async function getUserRole() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET) as { userId: string };
    const user = await db.user.findUnique({
      where: { id: decoded.userId },
      select: { role: true },
    });
    return (user as any).role;
  } catch (error) {
    console.error("Ошибка при расшифровке токена:", error);
    return null;
  }
}