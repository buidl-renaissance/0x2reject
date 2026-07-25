import type { NextApiRequest, NextApiResponse } from 'next';
import { getSessionUser } from '@/lib/session';
import { getDeckCards, toPublicCard } from '@/db/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const user = await getSessionUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const cards = await getDeckCards(user.id);
    return res.status(200).json({ cards: cards.map(toPublicCard) });
  } catch (err) {
    console.error('GET /api/deck error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
