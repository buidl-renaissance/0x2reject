import { NextApiRequest, NextApiResponse } from 'next';
import { ProfilesClient } from '@/data/profiles';
import { getAuthorizedClient } from '@/lib/authorizedSupabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { client, user, error } = await getAuthorizedClient(req);

  if (error) {
    return res.status(401).json({ error: error });
  }

  const profilesClient = new ProfilesClient(client);

  try {

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    switch (req.method) {
      case 'GET':
        const profile = await profilesClient.getProfile(user.id);
        return res.status(200).json(profile);

      case 'PUT':
        const updates = req.body;
        const updatedProfile = await profilesClient.updateProfile(user.id, updates);
        return res.status(200).json(updatedProfile);

      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Profile API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 