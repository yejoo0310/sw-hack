import Toeic from "../models/toeic.js";
import fs from "fs/promises";
import path from "path";

// 점수 환산표
const scoreTable = {
  RC: [
    [100, 495], [99, 495], [98, 495], [97, 495], [96, 495],
    [95, 495], [94, 490], [93, 485], [92, 480], [91, 475],
    [90, 470], [89, 465], [88, 460], [87, 455], [86, 450],
    [85, 440], [84, 435], [83, 430], [82, 425], [81, 420],
    [80, 415], [79, 410], [78, 405], [77, 400], [76, 395],
    [75, 385], [74, 380], [73, 375], [72, 370], [71, 365],
    [70, 360], [69, 355], [68, 350], [67, 345],
  ],
  LC: [
    [100, 495], [99, 490], [98, 485], [97, 480], [96, 470],
    [95, 460], [94, 455], [93, 445], [92, 440], [91, 435],
    [90, 425], [89, 420], [88, 415], [87, 410], [86, 405],
    [85, 395], [84, 385], [83, 375], [82, 365], [81, 355],
    [80, 345], [79, 335], [78, 330], [77, 320], [76, 315],
    [75, 305], [74, 295], [73, 285], [72, 275], [71, 265],
    [70, 260], [69, 250], [68, 240], [67, 230],
  ],
};

// 점수 환산 함수
const getScore = (correctCount, section) => {
  const table = scoreTable[section];
  for (const [answers, score] of table) {
    if (correctCount >= answers) return score;
  }
  return 0;
};

// 점수 계산 서비스
const calculateScore = async (userAnswers) => {
  // 정답 배열 불러오기
  const answerFilePath = path.join(process.cwd(), "src", "answer.json");
  const answerData = await fs.readFile(answerFilePath, "utf-8");
  const correctAnswers = JSON.parse(answerData);

  // RC와 LC 채점
  const rcUserAnswers = userAnswers.slice(0, 100);
  const lcUserAnswers = userAnswers.slice(100, 200);

  const rcCorrectCount = rcUserAnswers.reduce(
    (sum, answer, index) => sum + (answer === correctAnswers[index] ? 1 : 0),
    0
  );
  const lcCorrectCount = lcUserAnswers.reduce(
    (sum, answer, index) => sum + (answer === correctAnswers[100 + index] ? 1 : 0),
    0
  );

  const rcScore = getScore(rcCorrectCount, "RC");
  const lcScore = getScore(lcCorrectCount, "LC");
  const totalScore = rcScore + lcScore;

  // 결과 저장
  const score = new Score({
    rcScore,
    lcScore,
    totalScore,
    correctAnswers: userAnswers,
  });

  await score.save();

  return score;
};

export default { calculateScore };
