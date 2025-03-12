import type { NextApiRequest, NextApiResponse } from "next";
import { generate } from "../../../lib/jwt";
import { Auth } from "../../../models/auth";
import { runMiddleware } from "../../../lib/corsMiddleware";
import { AuthData, logInAuthToken } from "@/controllers/auth";

export default async function token(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res);
    console.log(req.body)
    const { email } = req.body;
    if (!email) {
        res
            .status(400)
            .json({ message: "Debes ingresar un email para poder ingresar." });
    }
    if (req.method === "POST") {
        const { email, password } = req.body;
        const data: AuthData = { email, password }
        const authTokenRes = await logInAuthToken(data)
        res.send(authTokenRes)
    } else {
        res.send({ message: "Method Not Allowed" })
    }
}
