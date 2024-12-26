import ToeicService from "../services/toeicService.js";

const calculateScore = async (req, res) => {
  try {
    const { answers } = req.body; // 프론트로부터 받은 사용자 답안
    if (!Array.isArray(answers) || answers.length !== 200) {
      return res.status(400).json({ error: "크기 200의 숫자 배열이 필요합니다." });
    }

    const result = await ToeicService.calculateScore(answers);
    res.status(200).json({
      message: "점수가 성공적으로 계산되었습니다.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { calculateScore };
