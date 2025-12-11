import express from "express";
import { validateJWT } from "../middlewares/auth.js";
import { createCategory, getCategories, deleteCategory, getCategory, updateCategory } from "../controllers/CategoryController.js";

const router = express.Router();

router.get("/", validateJWT, getCategories);
router.get("/:id", validateJWT, getCategory);
router.post("/", validateJWT, createCategory);
router.put("/:id", validateJWT, updateCategory);
router.delete("/:id", validateJWT, deleteCategory);

export default router;
