import { createSighting, getSightingsByReport } from '@/controllers/sighting';

import { runMiddleware } from '@/lib/corsMiddleware';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function sightings(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res);

  try {
    if (req.method === 'GET') {
      const reportId = Number(req.query.reportId);

      if (!reportId) {
        return res.status(400).json({
          message: 'reportId is required'
        });
      }

      const sightings = await getSightingsByReport(reportId.toString());

      return res.status(200).json(sightings);
    }

    if (req.method === 'POST') {
      const { reportId, description, location } = req.body;

      if (!reportId) {
        return res.status(400).json({
          message: 'reportId is required'
        });
      }

      const sighting = await createSighting({ reportId, description, location });

      return res.status(201).json(sighting);
    }

    return res.status(405).json({
      message: 'Method Not Allowed'
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({ message: error?.message || 'Internal Server Error' });
  }
}
