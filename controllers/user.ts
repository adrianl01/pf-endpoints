import { User } from "@/models";

export type UserUpdateData = {
  fullName?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
};

export async function getUserInfo(email: string) {
  return User.findOne({
    where: { email },
  });
}

export async function updateUser(
  email: string,
  data: UserUpdateData
) {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  user.set(data);

  await user.save();

  return user;
}