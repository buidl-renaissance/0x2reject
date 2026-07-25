import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromRequest } from '@/lib/authHelpers';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { isProfileComplete, ProfilesClient } from '@/data/profiles';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user, error } = await getUserFromRequest(req);
    if (error || !user) {
      return res.status(401).json({ error: error || 'Unauthorized' });
    }

    const profiles = new ProfilesClient(getSupabaseAdmin());
    const profile = await profiles.getProfile(user.id);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    return res.status(200).json({
      user: {
        id: profile.id,
        renaissanceId: profile.renaissance_id,
        username: profile.username,
        displayName: profile.full_name,
        pfpUrl: profile.photo_url || profile.avatar_url,
        slug: profile.slug,
        vibe: profile.vibe,
        activities: profile.activities,
        isPublic: profile.is_public,
        photoUrl: profile.photo_url || profile.avatar_url,
        profileComplete: isProfileComplete(profile),
      },
    });
  } catch (err) {
    console.error('❌ /api/user/me error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
