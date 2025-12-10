import express from "express";
import { validateJWT } from "../middlewares/auth.js";
import { createCategory, getCategories, deleteCategory } from "../controllers/CategoryController.js";

const router = express.Router();

router.get("/", validateJWT, getCategories);
router.post("/", validateJWT, createCategory);
router.delete("/:id", validateJWT, deleteCategory);

export default router;
