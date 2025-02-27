import { NextApiRequest, NextApiResponse } from "next";
import { sequelize } from "@/lib/sequelize";
import "@/models"
import type { NextRequest } from "next/server";
import { Report } from "@/models";

// export function middleware(req: NextRequest) {
//     console.log("middleware de apx")
//     if (req.method == "OPTIONS") {
//         return new Response(null, {
//             status: 204,
//             headers: {
//                 "Access-Control-Allow-Credentials": "true",
//                 "Access-Control-Allow-Origin": "*",
//                 "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//                 "Access-Control-Allow-Headers":
//                     req.headers.get("Access-Control-Request-Headers") || "",
//                 Vary: "Access-Control-Request-Headers",
//                 "Content-Length": "0",
//             },
//         });
//     }
// }
// export const config = {
//     matcher: ["/:path*"],
// };
export default async function (req: NextApiRequest, res: NextApiResponse) {
    console.log("sync")
    // models.Report.create()
    // models.User.create()
    // models.Auth.create()
    const result = await sequelize.sync({ alter: true })
    console.log(result.models)
    console.log(sequelize.models)
    // const authRes = await Auth.sync({ alter: true });
    // const userRes = await User.sync({ alter: true });
    // const reportRes = await Report.sync();

    // console.log("tabla auth creada:", authRes.dataValues);
    // console.log("tabla user creada:", userRes.dataValues);
    // console.log("tabla report creada:", reportRes.dataValues);

    // console.log(result)
    res.send({ message: "ok" })
}