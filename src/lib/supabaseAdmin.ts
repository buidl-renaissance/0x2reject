import { createClient, SupabaseClient } from '@supabase/supabase-js';
import crypto from 'crypto';

let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (adminClient) return adminClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  adminClient = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return adminClient;
}

export function ssoPasswordForRenaissanceId(renaissanceUserId: string): string {
  const secret = process.env.RENAISSANCE_SSO_SECRET;
  if (!secret) {
    throw new Error('Missing RENAISSANCE_SSO_SECRET');
  }
  return crypto
    .createHmac('sha256', secret)
    .update(String(renaissanceUserId))
    .digest('hex');
}

export function ssoEmailForRenaissanceId(renaissanceUserId: string): string {
  return `ren_${renaissanceUserId}@0x2reject.internal`;
}
