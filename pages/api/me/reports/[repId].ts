import { deleteOldRepImg, deleteReport, getMyReportById, ReportData, updateReport } from "@/controllers/report";
import { getUserInfo } from "@/controllers/user";
import { runMiddleware } from "@/lib/corsMiddleware";
import { decode } from "@/lib/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";

export default async function reports(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res);
    const token = parseBearerToken(req)
    const repId = req.query.repId as any
    if (!token) { res.status(404).send("No token was found on the request") }
    const decodedToken = await decode(token as string)
    if (req.method === "GET") {
        const userInfoRes = await getUserInfo(decodedToken as any)
        const resEmail = userInfoRes?.dataValues.email
        // // OBTENER UN REPORTE POR ID
        const result = await getMyReportById(resEmail, repId)
        res.send(result)
    } else if (req.method === "PATCH") {
        const { petName, location, long, lat, petImg, email, oldImg } = req.body;
        const resEmail = await getUserInfo(decodedToken as any);
        if (oldImg) { await deleteOldRepImg(oldImg as any); }
        if (resEmail?.dataValues.email === email) {
            try {
                const data: ReportData = { petName, location, long, lat, petImg, email };
                const result = await updateReport(data, repId);
                res.send(result);
            } catch (e) { res.send(console.error(e)) }
        } else { res.send(console.error({ message: "Email missmatch" })) };
    } else if (req.method === "DELETE") {
        const resEmail = await getUserInfo(decodedToken as any);
        const email = resEmail?.dataValues.email
        if (email) {
            try {
                const result = await deleteReport(email, repId);
                res.send(result);
            } catch (e) { res.send(console.error(e)) }
        } else { res.send(console.error({ message: "Email missmatch" })) };
    }
    else {
        res.send({ message: "Method Not Allowed" })
    }
}