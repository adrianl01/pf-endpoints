import jwt from 'jsonwebtoken';

export function generate(email: string) {
  return jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
}

export function decode(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };
  } catch (error) {
    throw new Error('Invalid token');
  }
}
