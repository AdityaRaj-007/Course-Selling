import z from "zod";

export const CreateLessonSchema = z.object({
  title: z.string(),
  content: z.string(),
  courseId: z.string(),
});
