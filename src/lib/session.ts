import type { NextApiRequest } from 'next';
import { getUserById, User } from '@/db/user';

export function getSessionUserId(req: NextApiRequest): string | null {
  const cookies = req.headers.cookie || '';
  const sessionMatch = cookies.match(/user_session=([^;]+)/);
  return sessionMatch?.[1] || null;
}

export async function getSessionUser(req: NextApiRequest): Promise<User | null> {
  const userId = getSessionUserId(req);
  if (!userId) return null;
  return getUserById(userId);
}

export function sessionCookie(userId: string): string {
  return `user_session=${userId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`;
}

export function clearSessionCookie(): string {
  return 'user_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
}
