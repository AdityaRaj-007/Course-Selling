import { Router } from "express";
import { validate } from "../middleware/validationMiddleware";
import {
  CreateCourseSchema,
  UpdateCourseSchema,
} from "../validators/CourseSchema";
import {
  createCourse,
  deleteCourse,
  editCourseDetails,
  getAllCourses,
  getCourseDetails,
} from "../controllers/CourseController";

const router = Router();

router.post("/", validate({ body: CreateCourseSchema }), createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseDetails);
router.patch("/:id", validate({ body: UpdateCourseSchema }), editCourseDetails);
router.delete("/:id", deleteCourse);

export default router;
