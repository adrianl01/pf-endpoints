import jwt from "jsonwebtoken"

export function generate(obj: string) {
    return jwt.sign(obj, process.env.JWT_SECRET as jwt.Secret);
}

export async function decode(token: string) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
    } catch (e) {
        return console.error("token incorrecto")
    }
}

