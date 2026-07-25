import type { NextApiRequest, NextApiResponse } from 'next';
import { getSessionUser } from '@/lib/session';
import { toAppUser, toPublicCard, updateProfile } from '@/db/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await getSessionUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    if (req.method === 'GET') {
      return res.status(200).json({
        ...toPublicCard(user),
        is_public: user.isPublic,
        full_name: user.displayName || user.name,
        photo_url: user.photoUrl || user.pfpUrl,
        avatar_url: user.pfpUrl,
        profileComplete: toAppUser(user).profileComplete,
      });
    }

    if (req.method === 'PUT') {
      const body = req.body as {
        full_name?: string;
        username?: string;
        vibe?: string;
        age?: number | null;
        slug?: string;
        activities?: string[];
        is_public?: boolean;
        photo_url?: string;
      };

      let slug = body.slug;
      if (slug) {
        slug = slug
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        if (slug.length < 2) {
          return res.status(400).json({ error: 'Slug must be at least 2 characters' });
        }
      }

      try {
        const updated = await updateProfile(user.id, {
          displayName: body.full_name,
          username: body.username,
          vibe: body.vibe,
          age: body.age,
          slug,
          activities: body.activities,
          isPublic: body.is_public,
          photoUrl: body.photo_url,
        });

        if (!updated) {
          return res.status(404).json({ error: 'Profile not found' });
        }

        return res.status(200).json({
          ...toPublicCard(updated),
          is_public: updated.isPublic,
          slug: updated.slug,
        });
      } catch (err) {
        if (err instanceof Error && err.message === 'Slug already taken') {
          return res.status(409).json({ error: 'Slug already taken' });
        }
        throw err;
      }
    }

    res.setHeader('Allow', ['GET', 'PUT']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (err) {
    console.error('Profile API Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
