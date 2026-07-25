import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import { getUserFromRequest } from '@/lib/authHelpers';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { ProfilesClient } from '@/data/profiles';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { user, error } = await getUserFromRequest(req);
  if (error || !user) {
    return res.status(401).json({ error: error || 'Unauthorized' });
  }

  try {
    const form = formidable();
    const [, files] = await form.parse(req);
    const file = files.photo?.[0] || files.file?.[0];

    if (!file) {
      return res.status(400).json({ error: 'No photo file provided' });
    }

    const fileBuffer = await fs.readFile(file.filepath);
    const profiles = new ProfilesClient(getSupabaseAdmin());
    const photoUrl = await profiles.uploadPhoto(
      user.id,
      fileBuffer,
      file.originalFilename || 'photo.jpg',
      file.mimetype || 'image/jpeg'
    );

    return res.status(200).json({ photoUrl });
  } catch (err) {
    console.error('Photo Upload Error:', err);
    return res.status(500).json({
      error: err instanceof Error ? err.message : 'Internal Server Error',
    });
  }
}
