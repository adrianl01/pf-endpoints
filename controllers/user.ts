import { Auth } from "@/models";
import { User } from "@/models";

export type UserData = {
    fullName: string,
    location: string
}

export async function getUserInfo(user_id: number) {
    const auth = await Auth.findOne({ where: { user_id } })
    const email = auth?.get("email")
    const user = await User.findOne({ where: { email } })
    if (user) { return user }
}

export async function updateUser(data: UserData, user_id: number) {
    const { fullName, location } = data
    const user = await getUserInfo(user_id)
    const res = await user?.set({
        fullName,
        location
    })
    const saved = await res?.save()
    return saved
}
