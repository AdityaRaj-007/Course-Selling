import { Router } from "express";
import { validate } from "../middleware/validationMiddleware";
import { PurchaseCourseSchema } from "../validators/PurchaseSchema";
import { purchaseCourse } from "../controllers/PurchaseController";

const router = Router();

router.post("/", validate({ body: PurchaseCourseSchema }), purchaseCourse);

export default router;
