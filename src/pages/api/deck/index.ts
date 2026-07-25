import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromRequest } from '@/lib/authHelpers';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user, error } = await getUserFromRequest(req);
  if (error || !user) {
    return res.status(401).json({ error: error || 'Unauthorized' });
  }

  try {
    const admin = getSupabaseAdmin();

    const { data: swiped } = await admin
      .from('swipes')
      .select('profile_id')
      .eq('swiper_id', user.id);

    const swipedIds = new Set((swiped || []).map((s) => s.profile_id));
    swipedIds.add(user.id);

    const { data: profiles, error: profilesError } = await admin
      .from('profiles')
      .select('id, full_name, username, slug, vibe, photo_url, avatar_url, activities')
      .eq('is_public', true)
      .not('slug', 'is', null)
      .order('updated_at', { ascending: false })
      .limit(50);

    if (profilesError) throw profilesError;

    const deck = (profiles || [])
      .filter((p) => !swipedIds.has(p.id) && (p.photo_url || p.avatar_url) && p.vibe)
      .map((p) => ({
        id: p.id,
        full_name: p.full_name,
        username: p.username,
        slug: p.slug,
        vibe: p.vibe,
        photo_url: p.photo_url || p.avatar_url,
        activities: Array.isArray(p.activities) ? p.activities : [],
      }));

    return res.status(200).json({ cards: deck });
  } catch (err) {
    console.error('GET /api/deck error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
