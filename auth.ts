import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import prisma from './app/lib/db';
import bcrypt from 'bcrypt';
import { loginSchema } from './zodSchemas/login';
import { Prisma } from '@prisma/client';
import * as z from "zod";

type LoginSchema = z.infer<typeof loginSchema>;

interface UserInfo {
  id: string;
  email: string;
  name: string;
  hashedPassword: string;
}

// default path for auth
export const BASE_PATH = '/api/auth';

async function getUser(email: string): Promise<UserInfo | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        email: true,
        name: true,
        hashedPassword: true
      }
    });
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}


export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // const parsedCredentials = z
        //   .object({ email: z.string().email(), password: z.string().min(6) })
        //   .safeParse(credentials);
        const parsedCredentials = loginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
});