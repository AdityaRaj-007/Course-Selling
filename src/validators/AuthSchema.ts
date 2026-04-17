import { z } from "zod";
import { Role } from "../generated/prisma/enums";

export const SignupSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  name: z.string(),
  role: z.enum(Role),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
