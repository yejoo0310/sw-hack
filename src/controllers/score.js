import ScoreService from "../services/score.js";

const uploadScore = async (req, res) => {
  const filePath = req.file.path;
  const target = req.body.target;

  try {
    const savedScore = await ScoreService.processCsvAndSaveToDB(
      filePath,
      target
    );
    res.status(200).json({
      message: "점수 계산 및 저장 성공",
      data: savedScore,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { uploadScore };
