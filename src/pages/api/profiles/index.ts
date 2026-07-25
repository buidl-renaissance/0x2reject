import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromRequest } from '@/lib/authHelpers';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { ProfilesClient } from '@/data/profiles';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user, error } = await getUserFromRequest(req);
  if (error || !user) {
    return res.status(401).json({ error: error || 'Unauthorized' });
  }

  const admin = getSupabaseAdmin();
  const profiles = new ProfilesClient(admin);

  try {
    if (req.method === 'GET') {
      const profile = await profiles.getProfile(user.id);
      return res.status(200).json(profile);
    }

    if (req.method === 'PUT') {
      const body = req.body as {
        full_name?: string;
        username?: string;
        vibe?: string;
        slug?: string;
        activities?: string[];
        is_public?: boolean;
        photo_url?: string;
        avatar_url?: string;
        bio?: string;
      };

      if (body.slug) {
        const slug = body.slug
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        if (slug.length < 2) {
          return res.status(400).json({ error: 'Slug must be at least 2 characters' });
        }
        body.slug = slug;

        const { data: conflict } = await admin
          .from('profiles')
          .select('id')
          .eq('slug', slug)
          .neq('id', user.id)
          .maybeSingle();

        if (conflict) {
          return res.status(409).json({ error: 'Slug already taken' });
        }
      }

      const updated = await profiles.upsertProfile(user.id, body);
      return res.status(200).json(updated);
    }

    res.setHeader('Allow', ['GET', 'PUT']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (err) {
    console.error('Profile API Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
