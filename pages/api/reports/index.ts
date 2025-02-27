import { findAuthByUserId } from "@/controllers/auth";
import { createReport, ReportData } from "@/controllers/report";
import { runMiddleware } from "@/lib/corsMiddleware";
import { decode } from "@/lib/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";
import { BelongsTo } from "sequelize";

export default async function reports(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res);
    const token = parseBearerToken(req)
    if (req.method === "GET") {
        // OBTENER REPORTES DE PETS BASADA EN LAS COORDENADAS
        const { coords } = req.body;

        // BUSQUEDA DIRECTA A LA DB DE ALGOLIA

        // res.send(lista de reports)
    } else if (req.method === "POST") {
        console.log("POST Method")
        // CREAR UN REPORTE CON SEQUALIZE USANDO POSTGRESQL
        console.log(req.body)
        const { petName, location, long, lat, petImg, email } = req.body;
        const decodedToken = await decode(token as string);
        const parsedToken = JSON.parse(decodedToken as any)
        const auth = await findAuthByUserId(parsedToken)
        if (auth?.dataValues.email === email) {
            const data: ReportData = { petName, location, long, lat, petImg, email };
            const result = await createReport(data);
            res.send(result)
        } else {
            res.send({ message: "Method Not Allowed" })
        }
    }
}

