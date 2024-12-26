import express from "express";
import ToeicController from "../controllers/toeicController.js";

const router = express.Router();

// 점수 계산 API
router.post("/calculate", ToeicController.calculateToeic);

export default router;
