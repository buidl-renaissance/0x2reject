import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
import { getSessionUser } from '@/lib/session';
import { updateProfile } from '@/db/user';

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

  const user = await getSessionUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const form = formidable({ maxFileSize: 5 * 1024 * 1024 });
    const [, files] = await form.parse(req);
    const file = files.photo?.[0] || files.file?.[0];

    if (!file) {
      return res.status(400).json({ error: 'No photo file provided' });
    }

    const buffer = await fs.readFile(file.filepath);
    const mime = file.mimetype || 'image/jpeg';

    // Prefer writing to public/uploads for local/dev; fall back to data URL
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    let photoUrl: string;

    try {
      await fs.mkdir(uploadsDir, { recursive: true });
      const ext = (file.originalFilename || 'jpg').split('.').pop() || 'jpg';
      const filename = `${user.id}-${Date.now()}.${ext}`;
      await fs.writeFile(path.join(uploadsDir, filename), buffer);
      photoUrl = `/uploads/${filename}`;
    } catch {
      photoUrl = `data:${mime};base64,${buffer.toString('base64')}`;
    }

    await updateProfile(user.id, { photoUrl });

    return res.status(200).json({ photoUrl });
  } catch (err) {
    console.error('Photo Upload Error:', err);
    return res.status(500).json({
      error: err instanceof Error ? err.message : 'Internal Server Error',
    });
  }
}
