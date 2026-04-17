import { Router } from "express";
import { validate } from "../middleware/validationMiddleware";
import { SignupSchema } from "../validators/AuthSchema";
import { SignUp } from "../controllers/AuthController";

const router = Router();

router.post("/signup", validate({ body: SignupSchema }), SignUp);

export default router;
