import express from "express";
import multer from "multer";
import ScoreController from "../controllers/score.js";
//import asyncWrapper from "../middleware/asyncWrapper.js";

const router = express.Router();
// Multer 설정
const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 파일 크기 제한
  });
  
  // 업로드 라우트
  router.post("/upload", upload.single("file"), (req, res, next) => {
    // 텍스트 필드 포함하여 ScoreController 호출
    ScoreController.calculateScore(req, res, next);
  });

export default router;
