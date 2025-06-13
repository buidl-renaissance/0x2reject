import { NextApiRequest, NextApiResponse } from 'next';
import { ProfilesClient } from '@/data/profiles';
import { getAuthorizedClient } from '@/lib/authorizedSupabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {  
  try {
    const { client, user, error } = await getAuthorizedClient(req);
    const profilesClient = new ProfilesClient(client);
    const { id } = req.query;
  
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    if (error) {
      return res.status(401).json({ error: error });
    }

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    switch (req.method) {
      case 'PUT':
        const updatedProject = await profilesClient.updateProject(id, req.body);
        return res.status(200).json(updatedProject);

      case 'DELETE':
        await profilesClient.deleteProject(id);
        return res.status(204).end();

      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Project API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 