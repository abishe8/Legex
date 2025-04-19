import express from "express";
import { generateDocument,getRoadmap,getDocx, getPdf, getSummary } from "../controllers/document.controller.js";

const router = express.Router();

// POST route to generate a document
router.post("/generate", generateDocument);

// // GET routes to serve the generated files
// router.get("/get-docx", getDocx);
// router.get("/get-pdf", getPdf);
// router.get("/get-summary", getSummary);

// // GET route to fetch the roadmap
// router.get("/roadmap/:documentType", getRoadmap);
export default router;