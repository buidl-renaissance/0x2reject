import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
import { db } from '@/db/drizzle';
import { travelMedia, travelExperiences } from '@/db/schema';
import { getSessionUser } from '@/lib/session';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export const config = {
  api: {
    bodyParser: false,
  },
};

const VIDEO_EXTENSIONS = ['mp4', 'mov', 'webm', 'avi', 'mkv'];
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic'];

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
    const form = formidable({ 
      maxFileSize: 100 * 1024 * 1024,
      maxFiles: 20,
    });
    
    const [fields, files] = await form.parse(req);
    const experienceId = fields.experienceId?.[0];
    const captions = fields.captions?.[0];

    if (!experienceId) {
      return res.status(400).json({ error: 'Experience ID is required' });
    }

    const experience = await db
      .select()
      .from(travelExperiences)
      .where(eq(travelExperiences.id, experienceId))
      .limit(1);

    if (!experience.length) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    const uploadedFiles = files.files || files.file || [];
    const fileArray = Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles];
    
    let captionsArray: string[] = [];
    try {
      captionsArray = captions ? JSON.parse(captions) : [];
    } catch {
      captionsArray = [];
    }

    // Local/dev: write under public/travel. On Vercel the FS is ephemeral and
    // tracing must not pull the whole media folder into the function bundle.
    const uploadsDir = process.env.VERCEL
      ? path.join('/tmp', 'travel-uploads')
      : path.join(process.cwd(), 'public', 'travel');
    await fs.mkdir(uploadsDir, { recursive: true });

    const uploadedMedia = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      if (!file) continue;

      const buffer = await fs.readFile(file.filepath);
      const ext = (file.originalFilename || 'jpg').split('.').pop()?.toLowerCase() || 'jpg';
      const isVideo = VIDEO_EXTENSIONS.includes(ext);
      const isImage = IMAGE_EXTENSIONS.includes(ext);

      if (!isVideo && !isImage) {
        continue;
      }

      const filename = `${experienceId}-${Date.now()}-${i}.${ext}`;
      await fs.writeFile(path.join(uploadsDir, filename), buffer);
      const url = `/travel/${filename}`;

      const mediaId = randomUUID();
      const now = new Date();

      await db.insert(travelMedia).values({
        id: mediaId,
        experienceId,
        url,
        type: isVideo ? 'video' : 'photo',
        caption: captionsArray[i] || null,
        sortOrder: i,
        createdAt: now,
      });

      uploadedMedia.push({
        id: mediaId,
        url,
        type: isVideo ? 'video' : 'photo',
        caption: captionsArray[i] || null,
      });
    }

    return res.status(200).json({ media: uploadedMedia });
  } catch (err) {
    console.error('Travel Upload Error:', err);
    return res.status(500).json({
      error: err instanceof Error ? err.message : 'Internal Server Error',
    });
  }
}
