import { NextApiRequest } from 'next';
import { createClient, User } from '@supabase/supabase-js';
import { getSupabaseAdmin } from './supabaseAdmin';

export async function getUserFromRequest(
  req: NextApiRequest
): Promise<{ user: User | null; error: string | null }> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return { user: null, error: 'Missing or invalid authorization token' };
  }

  const token = authHeader.split(' ')[1];
  const admin = getSupabaseAdmin();
  const {
    data: { user },
    error,
  } = await admin.auth.getUser(token);

  if (error || !user) {
    return { user: null, error: 'Invalid authorization token' };
  }

  return { user, error: null };
}

/** Optional auth — returns user if Bearer present, else null without error */
export async function getOptionalUser(req: NextApiRequest): Promise<User | null> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.split(' ')[1];
  try {
    const admin = getSupabaseAdmin();
    const {
      data: { user },
    } = await admin.auth.getUser(token);
    return user ?? null;
  } catch {
    return null;
  }
}

export function createAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
