import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || "sdfgdsfgdsfgsdfgs";

export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET, { expiresIn: '1d' });
}