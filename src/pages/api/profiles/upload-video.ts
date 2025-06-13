import { NextApiRequest, NextApiResponse } from 'next';
import { ProfilesClient } from '../../../data/profiles';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import { getAuthorizedClient } from '@/lib/authorizedSupabase';

export const config = { 
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { client, user, error } = await getAuthorizedClient(req);
  const profilesClient = new ProfilesClient(client);

  try {

    if (error) {
      return res.status(401).json({ error: error });
    }

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const form = formidable();
    const [, files] = await form.parse(req);
    const file = files.video?.[0];

    if (!file) {
      return res.status(400).json({ error: 'No video file provided' });
    }

    const fileBuffer = await fs.readFile(file.filepath);
    const videoFile = new File([fileBuffer], file.originalFilename || 'video', {
      type: file.mimetype || 'video/mp4',
    });

    const videoUrl = await profilesClient.uploadVideo(user.id, videoFile);
    return res.status(200).json({ videoUrl });
  } catch (error) {
    console.error('Video Upload Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 