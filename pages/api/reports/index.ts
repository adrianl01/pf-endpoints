import { findAuthByUserId } from "@/controllers/auth";
import { createReport, ReportData } from "@/controllers/report";
import { runMiddleware } from "@/lib/corsMiddleware";
import { decode } from "@/lib/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";

export default async function reports(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res);
    const token = parseBearerToken(req)
    if (req.method === "GET") {
        // OBTENER REPORTES DE PETS BASADA EN LAS COORDENADAS
        const { coords } = req.body;

        // BUSQUEDA DIRECTA A LA DB DE ALGOLIA

        // res.send(lista de reports)
    } else if (req.method === "POST") {
        // CREAR UN REPORTE CON SEQUALIZE USANDO POSTGRESQL
        const { petName, location, locationCoords, petImg, email } = req.body;
        const decodedToken = await decode(token as string);
        const auth = await findAuthByUserId(JSON.parse(decodedToken as any))
        console.log(auth?.dataValues.email)
        // if(auth?.dataValues.email === email){}
        // const data: ReportData = { petName, location, locationCoords, petImg, email };
        // const result = createReport(data);
        // res.send(result)
        res.send("ok")
    } else {
        res.send({ message: "Method Not Allowed" })
    }
}

