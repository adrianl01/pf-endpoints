import { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware } from "../../../lib/corsMiddleware";
import { changePassword, findOrCreateAuth, UserData } from "@/controllers/auth";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res);
    const { email } = req.body;
    if (!email) {
        res
            .status(400)
            .json({ message: "Debes ingresar un email para poder ingresar." });
    }
    if (req.method === "POST") {
        console.log("auth POST method")
        const { email, fullName, location, password } = req.body;
        const data: UserData = {
            email, fullName, location, password
        }
        const result = await findOrCreateAuth(data)
        res.send(result)
    } else if (req.method === "PATCH") {
        const { newPassword } = req.body
        const res = await changePassword(newPassword)
        return res
    } else {
        res.send({ message: "Method Not Allowed" })
    }
}

// CONCEPTOS MVC
// los endpoints sólo reciben y checkean las req y querys
// siempre la salida del endpoint tiene que ser predecible
// no tiene que hacer nada mas que recibir userId

// delegar el resto a un controller que es la siguiente capa
// los controllers son un montón de funciones o una clase con funciones
// la mayoría de los endpoints deberían delegar todo a los controllers

// la última capa son los models
// son o clases o funciones, mejor es una clase
// porque se representa como un registro de la db
// es más fácil de manipular la data
// se puede usar fireorm
// nos deja hacer abstracciones mucho mas facilmente
// sólo esta es la capa que se comunica con la db
// el controller no tiene que saber sobre el db
// el controller tiene que decir "dame un user", "dame un producto",
// "compará esto", "guardá este user", "modificá esto"
// si se respetan las capas, es mas fácil detectar errores
// lib no pertenece al sistema de capas


// si puedo escribir hasta donde llegan las responsabilidades
// de cada capa, y día a día ir agregando detalles sobre cada capa
// vamos a ir ejercitando y mejorando nuestras habilidades de arquitectura
