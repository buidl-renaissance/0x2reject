import type { NextApiRequest, NextApiResponse } from 'next';
import { getSessionUser } from '@/lib/session';
import { createLead, getUserById } from '@/db/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { profileId, phone, source } = req.body as {
    profileId?: string;
    phone?: string;
    source?: 'deck' | 'share';
  };

  if (!profileId) {
    return res.status(400).json({ error: 'profileId required' });
  }

  const cleaned = (phone || '').replace(/[^\d+]/g, '');
  if (!cleaned || cleaned.length < 7) {
    return res.status(400).json({ error: 'Valid phone number required' });
  }

  try {
    const profile = await getUserById(profileId);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const visitor = await getSessionUser(req);
    const lead = await createLead({
      profileId,
      phone: cleaned,
      visitorUserId: visitor?.id || null,
      source: source === 'deck' ? 'deck' : 'share',
    });

    return res.status(200).json({ lead });
  } catch (err) {
    console.error('POST /api/leads error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
