import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  return res.status(410).json({ error: 'Projects API removed — use Drifter profile activities' });
}
