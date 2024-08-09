// src/zodSchema/car.ts

import z from "zod";

export const carSchema = z.object({
  brand: z.string(),
  model: z.string(),
  description: z.string(),
});

export type Car = z.infer<typeof carSchema>;