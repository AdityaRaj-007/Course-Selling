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
  getCourseLessons,
} from "../controllers/CourseController";

const router = Router();

router.post("/", validate({ body: CreateCourseSchema }), createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseDetails);
router.patch("/:id", validate({ body: UpdateCourseSchema }), editCourseDetails);
router.delete("/:id", deleteCourse);
router.get("/:courseId/lessons", getCourseLessons);

export default router;
