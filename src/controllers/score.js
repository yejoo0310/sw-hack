import ScoreService from "../services/score.js";

const calculateScore = async (req, res) => {
  const { target, solve_time } = req.body; // form-data에서 target 값 추출
  const filePath = req.file?.path;

  try {
    const result = await ScoreService.calcUserScore(
      filePath,
      target,
      solve_time
    );
    res.status(200).json({
      score: result.score,
      review: result.review,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { calculateScore };
