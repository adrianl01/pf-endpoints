import { findAuthByUserId } from "@/controllers/auth";
import { createReport, getReportsByCoords, ReportData, updateReport } from "@/controllers/report";
import { runMiddleware } from "@/lib/corsMiddleware";
import { decode } from "@/lib/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";

export default async function reports(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res);
    const token = parseBearerToken(req)
    if (req.method === "GET") {
        // OBTENER REPORTES DE PETS BASADA EN LAS COORDENADAS
        const { lat, long, radius } = req.query as any
        const strngLat = JSON.parse(lat);
        const strngLong = JSON.parse(long);
        const strngRadius = JSON.parse(radius);
        const coords = {
            strngLat,
            strngLong,
            strngRadius
        }
        if (coords) {
            const searchRes = await getReportsByCoords(coords)
            res.send(searchRes)
        } else {
            res.status(404).send("No hay coordenadas")
        }
    } else if (req.method === "POST") {
        // CREAR UN REPORTE CON SEQUALIZE USANDO POSTGRESQL
        const { petName, location, long, lat, petImg, email } = req.body;
        const decodedToken = await decode(token as string);
        const parsedToken = JSON.parse(decodedToken as any)
        const auth = await findAuthByUserId(parsedToken)
        if (auth?.dataValues.email === email) {
            try {
                const data: ReportData = { petName, location, long, lat, petImg, email };
                const result = await createReport(data);
                res.send(result)
            }
            catch (e) {
                console.error(e)
            }
        } else {
            res.send({ message: "Token Error" })
        }
    } else { return { message: "Method Not Allowed" } }
}

