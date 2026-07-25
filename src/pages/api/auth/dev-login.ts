import type { NextApiRequest, NextApiResponse } from 'next';
import { getOrCreateUserByRenaissanceId, toAppUser } from '@/db/user';
import { sessionCookie } from '@/lib/session';

/**
 * Local/dev login without Renaissance WebView.
 * POST { username?: string, displayName?: string }
 * Only enabled when USE_LOCAL=true.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (process.env.USE_LOCAL !== 'true') {
    return res.status(403).json({ error: 'Dev login only available when USE_LOCAL=true' });
  }

  try {
    const { username, displayName } = (req.body || {}) as {
      username?: string;
      displayName?: string;
    };

    const name = (username || displayName || 'drifter').replace(/[^a-zA-Z0-9_-]/g, '') || 'drifter';
    const renaissanceUserId = `local-${name.toLowerCase()}`;

    const user = await getOrCreateUserByRenaissanceId(renaissanceUserId, {
      renaissanceId: renaissanceUserId,
      username: name,
      displayName: displayName || name,
    });

    res.setHeader('Set-Cookie', sessionCookie(user.id));
    return res.status(200).json({ success: true, user: toAppUser(user) });
  } catch (error) {
    console.error('dev-login error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
