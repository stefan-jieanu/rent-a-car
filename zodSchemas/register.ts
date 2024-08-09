// src/zodSchema/register.ts

import z from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
});

export type User = z.infer<typeof registerSchema>;