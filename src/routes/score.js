import express from "express";
import multer from "multer";
import ScoreController from '../controllers/score.js';
import asyncWrapper from "../middleware/asyncWrapper.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), asyncWrapper(ScoreController.uploadScore));

export default router;
