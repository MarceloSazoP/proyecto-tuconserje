import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export function generateToken(user: User): string {
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

export function verifyToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
}

export async function getUserFromToken(token: string): Promise<User | null> {
  try {
    const decoded = verifyToken(token);
    return await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
  } catch (error) {
    return null;
  }
}