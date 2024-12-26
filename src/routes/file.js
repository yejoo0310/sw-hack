import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// /uploads 디렉토리가 없으면 생성
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // 파일 저장 경로 설정
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`); // 고유한 파일 이름 생성
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv") {
    cb(null, true); // CSV 파일만 허용
  } else {
    cb(new Error("CSV 파일만 업로드할 수 있습니다."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 이하 파일만 허용
});

// 파일 업로드 라우트
router.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json({
      message: "파일 업로드 성공",
      filePath: req.file.path, // 업로드된 파일 경로 반환
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
