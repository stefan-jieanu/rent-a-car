'use server'

import { revalidatePath } from 'next/cache';
import prisma from './db';
import { Prisma } from '@prisma/client';
import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import * as z from "zod";
import { loginSchema } from '@/zodSchemas/login';
import { registerSchema } from '@/zodSchemas/register';
import { DateTime } from 'next-auth/providers/kakao';
import { carSchema } from '@/zodSchemas/car';

type LoginSchema = z.infer<typeof loginSchema>;
type RegisterSchema = z.infer<typeof registerSchema>;

export async function authenticate(
  formData: LoginSchema,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          // return 'Invalid credentials.';
          return {
            error_msg: 'Invalid credentials'
          }
        default:
          return {
            error_msg: 'Something went wrong'
          }
      }
    }
    throw error;
  }
}

export async function createAccount(
  formData: RegisterSchema,
): Promise<any | null> {
  const parsedCredentials = registerSchema.safeParse(formData);

  if (parsedCredentials.success) {
    const { email, name, password } = parsedCredentials.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await prisma.user.create({
        data: {
          email: email,
          name: name,
          hashedPassword: hashedPassword
        }
      });

      // Login the user directly after creating the account
      await authenticate(formData);
    } catch (error) {
      return {
        error_msg: 'Something went wrong ' + error
      }
    }
  }

}

type FormData = z.infer<typeof carSchema>;

export async function createCar(
  formData: FormData
): Promise<any | null> {
  // TODO: Field validation

  // Check auth
  const session = await auth();

  try {
    await prisma.car.create({
      data: {
        slug: formData.brand + '-' + formData.model,
        brand: formData.brand,
        model: formData.model,
        // Hardcoded for now because zod doesn't work well with flowbite date field
        production: new Date(),
        description: formData.description,
        // Same here
        cost: 30,
        owner: {
          connect: {
            email: session?.user?.email!
          }
        }
      }
    })
  } catch (error) {
    console.log(error)
  }

  revalidatePath('/dashboard')
}

export async function updatePost(formData: FormData, id: string) {
  // Add validation here

  // await prisma.post.update({
  //   where: {
  //     id
  //   },
  //   data: {
  //     title: formData.get('title') as string,
  //     slug: (formData.get('title') as string).replace(/\s+/g, "-").toLowerCase(),
  //     content: formData.get('content') as string
  //   }
  // })
}

export async function deletePost(id: string) {
  // await prisma.post.delete({ where: { id } })
}