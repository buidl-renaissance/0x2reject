import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserBySlug, toPublicCard } from '@/db/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const slug = req.query.slug as string;
  if (!slug) {
    return res.status(400).json({ error: 'slug required' });
  }

  try {
    const profile = await getUserBySlug(slug);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    return res.status(200).json(toPublicCard(profile));
  } catch (err) {
    console.error('GET profile by slug error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
