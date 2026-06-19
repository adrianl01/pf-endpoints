import { createReport, getNearbyReports } from '@/controllers/report';
import { getUserInfo } from '@/controllers/user';
import { runMiddleware } from '@/lib/corsMiddleware';
import { decode } from '@/lib/jwt';
import { ReportPayload } from '@/types/report';

import { NextApiRequest, NextApiResponse } from 'next';
import parseBearerToken from 'parse-bearer-token';

export default async function reports(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res);

  try {
    if (req.method === 'GET') {
      // GET /api/reports/nearby?latitude=-27.367&longitude=-55.896&radius=10 -> para obtener reportes cercanos, radio regulable en km
      const latitude = Number(req.query.latitude);
      const longitude = Number(req.query.longitude);
      const radius = Math.min(Number(req.query.radius || 10), 50);

      if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({
          message: 'Invalid coordinates'
        });
      }

      const reports = await getNearbyReports(latitude, longitude, radius);

      return res.status(200).json(reports);
    }

    if (req.method === 'POST') {
      const token = parseBearerToken(req);

      if (!token) {
        return res.status(401).json({
          message: 'No token provided'
        });
      }

      const decoded = decode(token);

      const user = await getUserInfo(decoded.email);

      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        });
      }

      const { name, species, breed, status, imageUrl, location } = req.body;

      const report = await createReport({
        ownerId: user.id,
        name,
        species,
        breed,
        status,
        imageUrl,
        location
      } as ReportPayload);

      return res.status(201).json(report);
    }

    return res.status(405).json({
      message: 'Method Not Allowed'
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: error?.message || 'Internal Server Error'
    });
  }
}
