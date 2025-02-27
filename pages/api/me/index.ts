import { createReport, getMyReports, ReportData } from "@/controllers/report";
import { getUserInfo, updateUser, UserData } from "@/controllers/user";
import { runMiddleware } from "@/lib/corsMiddleware";
import { decode } from "@/lib/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";

export default async function reports(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res);
    const token = parseBearerToken(req)
    if (!token) { res.status(404).send({ message: "No token was found" }) }
    if (req.method === "GET") {
        // OBTENER MI INFO DE USUARIO
        try {
            const decodedToken = await decode(token as string)
            const userInfoRes = await getUserInfo(decodedToken as any)
            res.send(userInfoRes)
        } catch (e) { return console.log(e) }
    } else if (req.method === "PATCH") {
        const { fullName, location } = req.body
        // ACTUALIZAR INFO DE USUARIO
        try {
            const decodedToken = await decode(token as string)
            const data: UserData = {
                fullName, location
            }
            const updatedUserRes = await updateUser(data, decodedToken as any)
            res.send(updatedUserRes)
        } catch (e) { return console.log(e) }
    } else {
        res.send({ message: "Method Not Allowed" })
    }
}
