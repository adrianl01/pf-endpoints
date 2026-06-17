import { getUserReports } from '@/controllers/report';
import { getUserInfo } from '@/controllers/user';
import { runMiddleware } from '@/lib/corsMiddleware';
import { decode } from '@/lib/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import parseBearerToken from 'parse-bearer-token';

export default async function reports(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res);

  try {
    if (req.method !== 'GET') {
      return res.status(405).json({
        message: 'Method Not Allowed'
      });
    }

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

    const reports = await getUserReports(user.id);

    return res.status(200).json(reports);
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: error?.message || 'Internal Server Error'
    });
  }
}
