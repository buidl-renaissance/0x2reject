import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromRequest } from '@/lib/authHelpers';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user, error } = await getUserFromRequest(req);
  if (error || !user) {
    return res.status(401).json({ error: error || 'Unauthorized' });
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
    const admin = getSupabaseAdmin();
    const { data, error: insertError } = await admin
      .from('swipes')
      .upsert(
        {
          swiper_id: user.id,
          profile_id: profileId,
          direction,
        },
        { onConflict: 'swiper_id,profile_id' }
      )
      .select()
      .single();

    if (insertError) throw insertError;
    return res.status(200).json({ swipe: data });
  } catch (err) {
    console.error('POST /api/swipes error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
