import multer from "multer";

// 메모리 저장소 설정
const storage = multer.memoryStorage();

// 파일 필터링 설정 (이미지 파일만 허용)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("이미지 파일만 업로드 가능합니다."), false);
  }
};

// 업로드 미들웨어 생성
const upload = multer({ storage, fileFilter });

export default upload;
