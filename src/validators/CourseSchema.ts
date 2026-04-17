import { z } from "zod";

export const CreateCourseSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
});
