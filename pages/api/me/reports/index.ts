import { createReport, getMyReports, ReportData } from "@/controllers/report";
import { runMiddleware } from "@/lib/corsMiddleware";
import { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";

export default async function reports(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res);
    const token = parseBearerToken(req)
    if (!token) { console.error("No token was found on the request") }
    if (req.method === "GET") {
        const { email } = req.body
        // OBTENER TODOS MIS REPORTES
        const result = await getMyReports(email)
        res.send(result)
    } else {
        res.send({ message: "Method Not Allowed" })
    }
}

