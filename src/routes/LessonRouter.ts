import { Router } from "express";
import { addLessons } from "../controllers/LessonController";
import { validate } from "../middleware/validationMiddleware";
import { CreateLessonSchema } from "../validators/LessonSchema";

const router = Router();

router.post("/", validate({ body: CreateLessonSchema }), addLessons);

export default router;
