"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { loginSchema } from '@/zodSchemas/login';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { authenticate } from '../lib/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [errorResponse, setErrorResponse] = useState('');

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: FormData) {
    const result = await authenticate(data);

    if (result === undefined) {
      setErrorResponse('');
      router.push('/dashboard');
    } else if (result.error_msg) {
      setErrorResponse(result.error_msg);
    }
  }

  return (
    <form method='POST' onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput
          {...register("email", { required: true })}
          id="email"
          type="email"
          placeholder="name@flowbite.com"
        />
        {errors?.email && (
          <p className="text-red-600 text-sm">
            {errors?.email?.message}
          </p>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput
          {...register("password", { required: true })}
          id="password"
          type="password"
          name='password'
        />
        {errors?.password && (
          <p className="text-red-600 text-sm">
            {errors?.password?.message}
          </p>
        )}
      </div>
      {errorResponse && (
        <p className='text-red-500 text-sm'>{errorResponse}</p>
      )}
      <Button
        type="submit"
        disabled={!isDirty || !isValid || isSubmitting}
      >
        {isSubmitting ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-6 h-6 mr-2 text-white animate-spin fill-rose-600 opacity-100"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG for Spinner Animation */}
            </svg>
          </div>
        ) : (
          'Sign In'
        )}
      </Button>
    </form>
  )
}