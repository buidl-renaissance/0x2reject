import type { NextApiRequest, NextApiResponse } from 'next';
import { getOptionalUser } from '@/lib/authHelpers';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { profileId, phone, source } = req.body as {
    profileId?: string;
    phone?: string;
    source?: 'deck' | 'share';
  };

  if (!profileId) {
    return res.status(400).json({ error: 'profileId required' });
  }

  const cleaned = (phone || '').replace(/[^\d+]/g, '');
  if (!cleaned || cleaned.length < 7) {
    return res.status(400).json({ error: 'Valid phone number required' });
  }

  try {
    const visitor = await getOptionalUser(req);
    const admin = getSupabaseAdmin();

    const { data: profile } = await admin
      .from('profiles')
      .select('id')
      .eq('id', profileId)
      .maybeSingle();

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const { data, error } = await admin
      .from('leads')
      .insert({
        profile_id: profileId,
        phone: cleaned,
        visitor_user_id: visitor?.id || null,
        source: source === 'deck' ? 'deck' : 'share',
      })
      .select()
      .single();

    if (error) throw error;
    return res.status(200).json({ lead: data });
  } catch (err) {
    console.error('POST /api/leads error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
