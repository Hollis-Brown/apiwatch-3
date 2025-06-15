import bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(plain: string, hashed: string) {
  return bcrypt.compare(plain, hashed);
} 