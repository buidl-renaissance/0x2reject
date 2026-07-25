import type { NextApiRequest, NextApiResponse } from 'next';
import { getSessionUser } from '@/lib/session';
import { recordSwipe } from '@/db/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const user = await getSessionUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { profileId, direction } = req.body as {
    profileId?: string;
    direction?: 'left' | 'right';
  };

  if (!profileId || !direction || !['left', 'right'].includes(direction)) {
    return res.status(400).json({ error: 'profileId and direction (left|right) required' });
  }

  if (profileId === user.id) {
    return res.status(400).json({ error: 'Cannot swipe yourself' });
  }

  try {
    const swipe = await recordSwipe(user.id, profileId, direction);
    return res.status(200).json({ swipe });
  } catch (err) {
    console.error('POST /api/swipes error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
