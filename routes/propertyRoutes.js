import express from "express";
import { createProperty, getProperties } from "../controllers/propertyController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, createProperty);
router.get("/", getProperties);

export default router;
