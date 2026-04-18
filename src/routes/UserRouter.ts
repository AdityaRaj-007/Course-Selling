import { Router } from "express";
import { getAllPurchases } from "../controllers/UserController";

const router = Router();

router.get("/:id/purchases", getAllPurchases);

export default router;
