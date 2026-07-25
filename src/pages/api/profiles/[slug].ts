import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { ProfilesClient } from '@/data/profiles';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const slug = req.query.slug as string;
  if (!slug) {
    return res.status(400).json({ error: 'slug required' });
  }

  try {
    const profiles = new ProfilesClient(getSupabaseAdmin());
    const profile = await profiles.getProfileBySlug(slug);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    return res.status(200).json({
      id: profile.id,
      full_name: profile.full_name,
      username: profile.username,
      slug: profile.slug,
      vibe: profile.vibe,
      photo_url: profile.photo_url || profile.avatar_url,
      activities: profile.activities,
    });
  } catch (err) {
    console.error('GET profile by slug error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
