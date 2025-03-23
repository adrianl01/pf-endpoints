import { findAuthByUserId } from "@/controllers/auth";
import { getMyReportById, ReportData, updateReport } from "@/controllers/report";
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
        const repId = req.query.repId as any
        const userInfoRes = await getUserInfo(decodedToken as any)
        const resEmail = userInfoRes?.dataValues.email
        // // OBTENER UN REPORTE POR ID
        const result = await getMyReportById(resEmail, repId)
        res.send(result)
    } if (req.method === "PATCH") {
        const { petName, location, long, lat, petImg, email } = req.body;
        const decodedToken = await decode(token as string);
        const repId = req.query.repId as any;
        const parsedToken = JSON.parse(decodedToken as any);
        const auth = await findAuthByUserId(parsedToken);
        if (auth?.dataValues.email === email) {
            try {
                const data: ReportData = { petName, location, long, lat, petImg, email };
                const result = await updateReport(data, repId);
                res.send(result);
            }
            catch (e) {
                res.send(console.error(e))
            }
        } else { res.send(console.error({ message: "Email missmatch" })) };
    } else {
        res.send({ message: "Method Not Allowed" })
    }
}