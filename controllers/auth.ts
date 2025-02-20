import { Auth } from "@/models/auth";
import { User } from "@/models/user";
import * as crypto from "crypto"
import { generate } from "@/lib/jwt";

export type UserData = {
    email: string,
    password: string,
    fullName: string,
    location: string
}
export type AuthData = {
    email: string,
    password: string
}
function getSHA256ofString(text: string) {
    return crypto.createHash('sha256').update(text).digest("hex")
}
// para usar con el endpoint auth, crear controller. 27/12/24
export async function findOrCreateAuth(data: UserData) {
    const { email, fullName, location, password } = data
    // al  registrarse se crea un Auth con la contraseña hasheada 
    // para eso se busca con la contraseña o se crea, si ya existe, se devuelve y se inicia sesión
    // con el user_id también se busca y se crea un User

    const [user, userCreated] = await User.findOrCreate({
        where: { email },
        defaults: {
            fullName,
            location,
        },
    });
    console.log(user.get("id"))
    const [auth, authCreated] = await Auth.findOrCreate({
        where: { password: getSHA256ofString(password) },
        defaults: {
            email,
            password: getSHA256ofString(password),
            user_id: user.get("id")
        },
    });
    return {
        auth: {
            auth, authCreated
        },
        user: {
            user, userCreated
        }
    }
}

// para usar en el endpoint auth/token, crear controller 27/12/24
export async function logInAuthToken(data: AuthData) {
    const { email, password } = data
    const auth = await Auth.findOne({
        where: {
            email,
            password: getSHA256ofString(password)
        }
    })
    console.log(auth)
    const jwtRes = await generate(auth?.get("user_id") as string)
    if (auth) {
        return { jwtRes }
    } else {
        return console.error("user not found")
    }
}

export async function findAuthByUserId(user_id: number) {
    const auth = await Auth.findOne({ where: { user_id } });
    return auth;
}