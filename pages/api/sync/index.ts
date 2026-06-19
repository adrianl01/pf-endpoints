import { NextApiRequest, NextApiResponse } from 'next';
import { sequelize } from '@/lib/sequelize';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  console.log(process.env.SEQUELIZE_URI)
  try {
    await sequelize.sync({
      force: true
    });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error
    });
  }
}
