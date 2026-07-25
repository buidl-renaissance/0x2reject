import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db/drizzle';
import { travelExperiences, travelMedia } from '@/db/schema';
import { getSessionUser } from '@/lib/session';
import { eq, desc } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const experiences = await db
        .select()
        .from(travelExperiences)
        .orderBy(desc(travelExperiences.sortOrder), desc(travelExperiences.createdAt));

      const experiencesWithMedia = await Promise.all(
        experiences.map(async (exp) => {
          const media = await db
            .select()
            .from(travelMedia)
            .where(eq(travelMedia.experienceId, exp.id))
            .orderBy(travelMedia.sortOrder);
          return { ...exp, media };
        })
      );

      return res.status(200).json({ experiences: experiencesWithMedia });
    } catch (err) {
      console.error('Error fetching travel experiences:', err);
      return res.status(500).json({ error: 'Failed to fetch experiences' });
    }
  }

  if (req.method === 'POST') {
    const user = await getSessionUser(req);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const { title, description, location, date } = req.body;

      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const id = randomUUID();
      const now = new Date();

      await db.insert(travelExperiences).values({
        id,
        userId: user.id,
        title,
        description: description || null,
        location: location || null,
        date: date || null,
        sortOrder: Date.now(),
        createdAt: now,
        updatedAt: now,
      });

      const experience = await db
        .select()
        .from(travelExperiences)
        .where(eq(travelExperiences.id, id))
        .limit(1);

      return res.status(201).json({ experience: experience[0] });
    } catch (err) {
      console.error('Error creating travel experience:', err);
      return res.status(500).json({ error: 'Failed to create experience' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
