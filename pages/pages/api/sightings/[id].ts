import { getSightingById, deleteSighting } from "@/controllers/sighting";

import { runMiddleware } from "@/lib/corsMiddleware";
import { NextApiRequest, NextApiResponse } from "next";

export default async function sightingById( req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res);

  try {
    const id = Number(req.query.id);

    if (!id) {
      return res.status(400).json({
        message: "Invalid id",
      });
    }

    if (req.method === "GET") {
      const sighting =
        await getSightingById(id.toString());

      return res.status(200).json(sighting);
    }

    if (req.method === "DELETE") {
      await deleteSighting(id.toString());

      return res.status(200).json({
        success: true,
      });
    }

    return res.status(405).json({
      message: "Method Not Allowed",
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message:
        error?.message ||
        "Internal Server Error",
    });
  }
}