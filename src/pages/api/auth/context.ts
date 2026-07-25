import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getSupabaseAdmin,
  ssoEmailForRenaissanceId,
  ssoPasswordForRenaissanceId,
} from '@/lib/supabaseAdmin';
import { createAnonClient } from '@/lib/authHelpers';
import { ProfilesClient } from '@/data/profiles';

/**
 * Authenticate user from Renaissance app context injection
 * POST /api/auth/context
 * Body: { renaissanceUserId, user: { username, displayName, pfpUrl, publicAddress } }
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

    const renaissanceId = String(renaissanceUserId);
    const email = ssoEmailForRenaissanceId(renaissanceId);
    const password = ssoPasswordForRenaissanceId(renaissanceId);
    const admin = getSupabaseAdmin();
    const profiles = new ProfilesClient(admin);

    console.log('🔐 [AUTH-CONTEXT] Authenticating from context:', {
      renaissanceUserId: renaissanceId,
      username: userData?.username,
    });

    const existing = await profiles.getProfileByRenaissanceId(renaissanceId);
    let userId = existing?.id;

    if (!userId) {
      const { data: created, error: createError } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          renaissance_id: renaissanceId,
          username: userData?.username,
          display_name: userData?.displayName,
          pfp_url: userData?.pfpUrl,
          public_address: userData?.publicAddress,
        },
      });

      if (createError) {
        // User may already exist — sign in to recover id, then ensure password
        const anonProbe = createAnonClient();
        const { data: existingSession, error: probeError } =
          await anonProbe.auth.signInWithPassword({ email, password });

        if (existingSession?.user) {
          userId = existingSession.user.id;
        } else {
          // Password may be stale — search by email metadata via list (paginated)
          let foundId: string | undefined;
          for (let page = 1; page <= 5 && !foundId; page++) {
            const { data: list } = await admin.auth.admin.listUsers({ page, perPage: 200 });
            const found = list?.users?.find((u) => u.email === email);
            if (found) foundId = found.id;
            if (!list?.users?.length || list.users.length < 200) break;
          }
          if (!foundId) {
            console.error('❌ createUser failed:', createError, probeError);
            return res.status(500).json({ error: createError.message });
          }
          userId = foundId;
          await admin.auth.admin.updateUserById(userId, { password });
        }
      } else {
        userId = created.user!.id;
      }
    } else {
      await admin.auth.admin.updateUserById(userId, { password });
    }

    const displayName = userData?.displayName || userData?.username || existing?.full_name || null;
    const username = userData?.username || existing?.username || null;
    const pfp = userData?.pfpUrl || existing?.avatar_url || existing?.photo_url || null;

    const profile = await profiles.upsertProfile(userId!, {
      renaissance_id: renaissanceId,
      full_name: displayName,
      username,
      avatar_url: pfp,
      photo_url: existing?.photo_url || pfp,
    });

    const anon = createAnonClient();
    const { data: sessionData, error: signInError } = await anon.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !sessionData.session) {
      console.error('❌ signIn failed:', signInError);
      return res.status(500).json({ error: signInError?.message || 'Failed to mint session' });
    }

    const { access_token, refresh_token } = sessionData.session;

    console.log('✅ [AUTH-CONTEXT] User authenticated:', {
      userId,
      renaissanceUserId: renaissanceId,
      username: profile.username,
    });

    return res.status(200).json({
      success: true,
      access_token,
      refresh_token,
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
        profileComplete: Boolean(
          (profile.full_name || profile.username) &&
            (profile.photo_url || profile.avatar_url) &&
            profile.vibe &&
            profile.slug
        ),
      },
    });
  } catch (error) {
    console.error('❌ [AUTH-CONTEXT] Error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
