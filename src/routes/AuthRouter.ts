import { Router } from "express";
import { validate } from "../middleware/validationMiddleware";
import { LoginSchema, SignupSchema } from "../validators/AuthSchema";
import { LogIn, SignUp } from "../controllers/AuthController";

const router = Router();

router.post("/signup", validate({ body: SignupSchema }), SignUp);
router.post("/login", validate({ body: LoginSchema }), LogIn);

export default router;
