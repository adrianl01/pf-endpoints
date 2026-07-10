import { Auth, User } from '@/models';
import * as crypto from 'crypto';
import { generate } from '@/lib/jwt';

export type RegisterData = { email: string; password: string; fullName: string };

export type LoginData = { email: string; password: string };

function hashPassword(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function register(data: RegisterData) {
  const { email, password, fullName } = data;

  const existingAuth = await Auth.findOne({ where: { email } });

  if (existingAuth) {
    throw new Error('User already exists');
  }

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new Error('Email already registered');
  }

  const user = await User.create({ email, fullName });

  const auth = await Auth.create({ email, passwordHash: hashPassword(password) });

  return { user, auth };
}

export async function login(data: LoginData) {
  const { email, password } = data;

  const auth = await Auth.findOne({
    where: { email, passwordHash: hashPassword(password) }
  });

  if (!auth) {
    throw new Error('Invalid credentials');
  }

  const token = await generate(email);

  return { token };
}

export async function findAuthByEmail(email: string) {
  return await Auth.findOne({ where: { email } });
}

export async function changePassword(email: string, newPassword: string) {
  const auth = await Auth.findOne({ where: { email } });

  if (!auth) {
    throw new Error('User not found');
  }

  auth.set({ passwordHash: hashPassword(newPassword) });

  await auth.save();

  return auth;
}
