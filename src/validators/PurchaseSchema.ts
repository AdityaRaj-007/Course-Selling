import z from "zod";

export const PurchaseCourseSchema = z.object({
  courseId: z.string(),
});
