import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserById, getUserByRenaissanceId, toAppUser } from '@/db/user';
import { clearSessionCookie, getSessionUserId } from '@/lib/session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ user: null });
  }

  try {
    let user = null;

    if (req.query.renaissanceUserId && typeof req.query.renaissanceUserId === 'string') {
      user = await getUserByRenaissanceId(req.query.renaissanceUserId);
    }

    if (!user && req.query.userId && typeof req.query.userId === 'string') {
      user = await getUserById(req.query.userId);
    }

    if (!user) {
      const sessionId = getSessionUserId(req);
      if (sessionId) user = await getUserById(sessionId);
    }

    if (!user) {
      res.setHeader('Set-Cookie', clearSessionCookie());
      return res.status(200).json({ user: null });
    }

    return res.status(200).json({ user: toAppUser(user) });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ user: null });
  }
}
