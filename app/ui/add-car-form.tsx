"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { carSchema } from '@/zodSchemas/car';
import { Button, Checkbox, Label, TextInput, Datepicker } from "flowbite-react";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { createCar } from '../lib/actions';

type FormData = z.infer<typeof carSchema>;

export default function AddCarForm() {
  const [errorResponse, setErrorResponse] = useState('');

  const router = useRouter();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(carSchema),
  });

  async function onSubmit(data: FormData) {
    const result = await createCar(data);

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
          <Label htmlFor="brand" value="Car brand" />
        </div>
        <TextInput
          {...register("brand", { required: true })}
          id="brand"
          type="text"
          placeholder="Dacia"
        />
        {errors?.brand && (
          <p className="text-red-600 text-sm">
            {errors?.brand?.message}
          </p>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="model" value="Car model" />
        </div>
        <TextInput
          {...register("model", { required: true })}
          id="model"
          type="text"
          name='model'
          placeholder='Logan'
        />
        {errors?.model && (
          <p className="text-red-600 text-sm">
            {errors?.model?.message}
          </p>
        )}
      </div>
      {/* <div>
        <div className="mb-2 block">
          <Label htmlFor="production" value="Production date" />
        </div>
        <Datepicker
          {...register("production", { required: true })}
          id="production"
          name='production'
        />
        {errors?.production && (
          <p className="text-red-600 text-sm">
            {errors?.production?.message}
          </p>
        )}
      </div> */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" />
        </div>
        <TextInput
          {...register("description", { required: false })}
          id="description"
          type="text"
          name='description'
          placeholder='e.g. Love <3'
        />
        {errors?.description && (
          <p className="text-red-600 text-sm">
            {errors?.description?.message}
          </p>
        )}
      </div>
      {/* <div>
        <div className="mb-2 block">
          <Label htmlFor="cost" value="Cost" />
        </div>
        <TextInput
          {...register("cost", { required: true })}
          id="cost"
          type="number"
          name='cost'
          placeholder='30'
        />
        {errors?.cost && (
          <p className="text-red-600 text-sm">
            {errors?.cost?.message}
          </p>
        )}
      </div> */}
      <Button
        type="submit"
        disabled={!isDirty || isSubmitting}
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
          'Add'
        )}
      </Button>
    </form>
  )
}