import type { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware } from "@/lib/corsMiddleware";
import {
  login,
  LoginData,
} from "@/controllers/auth";

export default async function token(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res);

  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        message: "Method Not Allowed",
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const data: LoginData = {
      email,
      password,
    };

    const result = await login(data);

    return res.status(200).json(result);
  } catch (error: any) {
    console.error(error);

    return res.status(401).json({
      message:
        error?.message ||
        "Invalid credentials",
    });
  }
}