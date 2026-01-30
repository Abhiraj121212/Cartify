import { Router } from "express";
import * as productController from "../controllers/productController";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/my", requireAuth(), productController.getMyProducts as any);
router.get("/:id", productController.getProductById as any);
router.post("/", requireAuth(), productController.createProduct);
router.put("/:id", requireAuth(), productController.updateProduct as any);
router.delete("/:id", requireAuth(), productController.deleteProduct as any);

export default router;