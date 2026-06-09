import { getUserInfo, updateUser } from '@/controllers/user';
import { runMiddleware } from '@/lib/corsMiddleware';
import { decode } from '@/lib/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import parseBearerToken from 'parse-bearer-token';

export default async function me(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res);

  try {
    const token = parseBearerToken(req);

    if (!token) {
      return res.status(401).json({
        message: 'No token provided'
      });
    }

    const decoded = decode(token);

    const email = decoded.email;

    if (req.method === 'GET') {
      const user = await getUserInfo(email);

      return res.status(200).json(user);
    }

    if (req.method === 'PATCH') {
      const { fullName, location } = req.body;

      const updatedUser = await updateUser(email, {
        fullName,
        location
      });

      return res.status(200).json(updatedUser);
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
