import ImageService from "../services/image.js";

const processImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "이미지 업로드 실패" });
  }

  const simulatedFile = new Blob([req.file.buffer], {
    type: req.file.mimetype,
  });

  const fileWithName = new File([simulatedFile], req.file.originalname, {
    type: req.file.mimetype,
  });

  const fileInfo = await ImageService.processImage(fileWithName);

  // 예시: 이미지 정보를 반환
  res.status(200).json({
    fileInfo,
  });
};

const test = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "이미지 업로드 실패" });
  }

  res.status(200).json({
    fileInfo: {
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
    },
  });
};

export default { processImage, test };
