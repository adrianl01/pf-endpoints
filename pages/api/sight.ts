import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/mailjet";
import { runMiddleware } from "@/lib/corsMiddleware";
export type ReportInfo = {
    email: string,
    name: string,
    phoneNumber: number,
    location: string
}

export default async function reportSight(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res);
    if (req.method === "POST") {
        const { email, name, phoneNumber, location } = req.body;
        const data: ReportInfo = {
            email, name, phoneNumber, location
        }
        await sendEmail(data)
        res.send({ message: "Email sent!" })
    } else {
        res.send({ message: "Method Not Allowed" })
    }
}
