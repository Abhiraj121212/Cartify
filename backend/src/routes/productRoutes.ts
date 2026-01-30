import { Router } from "express";
import * as productController from "../controllers/productController";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/", productController.getAllProducts);

export default router;
