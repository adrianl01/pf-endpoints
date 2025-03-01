import { findAuthByUserId } from "@/controllers/auth";
import { createReport, getReportsByCoords, ReportData } from "@/controllers/report";
import { uploadImage } from "@/lib/cloudinary";
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
        if (coords) {
            const searchRes = await getReportsByCoords(coords)
            res.send(searchRes)
        } else {
            res.status(404).send("No hay coordenadas")
        }
        // BUSQUEDA DIRECTA A LA DB DE ALGOLIA

        // res.send(lista de reports)
    } else if (req.method === "POST") {
        // CREAR UN REPORTE CON SEQUALIZE USANDO POSTGRESQL
        const { petName, location, long, lat, petImg, email } = req.body;
        const decodedToken = await decode(token as string);
        const parsedToken = JSON.parse(decodedToken as any)
        const auth = await findAuthByUserId(parsedToken)
        if (auth?.dataValues.email === email) {
            const resCloudinaryImgUrl = await uploadImage(petImg) as string
            const data: ReportData = { petName, location, long, lat, petImg: resCloudinaryImgUrl, email };
            const result = await createReport(data);
            res.send(result)
        } else {
            res.send({ message: "Method Not Allowed" })
        }
    }
}

