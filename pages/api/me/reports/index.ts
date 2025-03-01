import { createReport, getMyReports, ReportData } from "@/controllers/report";
import { getUserInfo } from "@/controllers/user";
import { runMiddleware } from "@/lib/corsMiddleware";
import { decode } from "@/lib/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";


export default async function reports(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res);
    const token = parseBearerToken(req)

    if (req.method === "GET") {
        if (!token) { res.status(404).send("No token was found on the request") }
        const decodedToken = await decode(token as string)
        const userInfoRes = await getUserInfo(decodedToken as any)
        const resEmail = userInfoRes?.dataValues.email
        // // OBTENER TODOS MIS REPORTES
        const result = await getMyReports(resEmail)
        res.send(result)
    } else {
        res.send({ message: "Method Not Allowed" })
    }
}

