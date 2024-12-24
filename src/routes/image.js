import express from "express";
import ImageController from "../controllers/image.js";
import upload from "../middleware/upload.js";
import asyncWrapper from "../middleware/asyncWrapper.js";

const router = express.Router();

// 이미지 처리 라우트
router.post(
  "/",
  upload.single("image"),
  asyncWrapper(ImageController.processImage)
);

router.post(
  "/test",
  upload.single("image"),
  asyncWrapper(ImageController.test)
);

export default router;
