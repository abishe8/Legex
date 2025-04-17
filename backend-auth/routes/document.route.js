import express from "express";
import { generateDocument } from "../controllers/document.controller.js";

const router = express.Router();

// POST route to generate a document
router.post("/generate", generateDocument);

export default router;