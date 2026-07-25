import type { NextApiRequest, NextApiResponse } from 'next';
import { getOrCreateUserByRenaissanceId, toAppUser } from '@/db/user';
import { sessionCookie } from '@/lib/session';

/**
 * Authenticate from Renaissance WebView context injection
 * POST /api/auth/context
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { renaissanceUserId, user: userData } = req.body as {
      renaissanceUserId?: number | string;
      user?: {
        username?: string;
        displayName?: string;
        pfpUrl?: string;
        publicAddress?: string;
      };
    };

    if (!renaissanceUserId) {
      return res.status(400).json({ error: 'renaissanceUserId is required' });
    }

    const user = await getOrCreateUserByRenaissanceId(String(renaissanceUserId), {
      renaissanceId: String(renaissanceUserId),
      username: userData?.username,
      displayName: userData?.displayName,
      pfpUrl: userData?.pfpUrl,
      publicAddress: userData?.publicAddress,
    });

    res.setHeader('Set-Cookie', sessionCookie(user.id));

    return res.status(200).json({
      success: true,
      user: toAppUser(user),
    });
  } catch (error) {
    console.error('❌ [AUTH-CONTEXT] Error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
