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

    if (error) {
      return res.status(401).json({ error: error });
    }

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    switch (req.method) {
      case 'GET':
        const projects = await profilesClient.getProjects(user.id);
        return res.status(200).json(projects);

      case 'POST':
        const newProject = await profilesClient.createProject(user.id, req.body);
        return res.status(201).json(newProject);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Projects API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 