import { getReportById, updateReport, deleteReport } from '@/controllers/report';

import { getUserInfo } from '@/controllers/user';
import { runMiddleware } from '@/lib/corsMiddleware';
import { decode } from '@/lib/jwt';

import { NextApiRequest, NextApiResponse } from 'next';
import parseBearerToken from 'parse-bearer-token';

export default async function reportById(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res);

  try {
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

    const ownerId = user.id;

    const reportId = Number(req.query.repId);

    if (!reportId) {
      return res.status(400).json({
        message: 'Invalid report id'
      });
    }

    if (req.method === 'GET') {
      const report = await getReportById(reportId);

      return res.status(200).json(report);
    }

    if (req.method === 'PATCH') {
      const report = await updateReport(reportId, ownerId, req.body);

      return res.status(200).json(report);
    }

    if (req.method === 'DELETE') {
      await deleteReport(reportId, ownerId);

      return res.status(200).json({
        success: true
      });
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
