import ScoreModel from "../models/score.js";
import fs from "fs";
import csv from "csv-parser";

// 점수 환산표 (이미지 참고)
const scoreTable = {
  RC: [
    [100, 495],
    [99, 495],
    [98, 495],
    [97, 495],
    [96, 495],
    [95, 495],
    [94, 490],
    [93, 485],
    [92, 480],
    [91, 475],
    [90, 470],
    [89, 465],
    [88, 460],
    [87, 455],
    [86, 450],
    [85, 440],
    [84, 435],
    [83, 430],
    [82, 425],
    [81, 420],
    [80, 415],
    [79, 410],
    [78, 405],
    [77, 400],
    [76, 395],
    [75, 385],
    [74, 380],
    [73, 375],
    [72, 370],
    [71, 365],
    [70, 360],
    [69, 355],
    [68, 350],
    [67, 345],
  ],
  LC: [
    [100, 495],
    [99, 490],
    [98, 485],
    [97, 480],
    [96, 470],
    [95, 460],
    [94, 455],
    [93, 445],
    [92, 440],
    [91, 435],
    [90, 425],
    [89, 420],
    [88, 415],
    [87, 410],
    [86, 405],
    [85, 395],
    [84, 385],
    [83, 375],
    [82, 365],
    [81, 355],
    [80, 345],
    [79, 335],
    [78, 330],
    [77, 320],
    [76, 315],
    [75, 305],
    [74, 295],
    [73, 285],
    [72, 275],
    [71, 265],
    [70, 260],
    [69, 250],
    [68, 240],
    [67, 230],
  ],
};

// 점수 환산 함수
const getScore = (correctCount, section) => {
  const table = scoreTable[section];
  for (const [answers, score] of table) {
    if (correctCount >= answers) {
      return score;
    }
  }
  return 0;
};

// CSV 데이터를 읽고 가공하여 Score 모델에 저장
const processCsvAndSaveToDB = async (filePath, target) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", async (row) => {
        const questions = Object.values(row).slice(1).map(Number);

        if (questions.length > 200) {
          console.error(`문항 수: ${questions.length}`); // 디버깅용 로그 추가
          reject(new Error("CSV 파일의 문항 수는 정확히 200개여야 합니다."));
          return;
        }

        // 파트별 문항 수
        const partLengths = [6, 25, 39, 30, 30, 16, 54];
        const partErrorRates = [];
        let startIdx = 0;

        // 각 파트별 오답률 계산
        for (const length of partLengths) {
          const partQuestions = questions.slice(startIdx, startIdx + length);
          const partTotal = partQuestions.length;
          const partCorrect = partQuestions.reduce((sum, q) => sum + q, 0);
          const partErrorRate = ((partTotal - partCorrect) / partTotal) * 100;
          partErrorRates.push(partErrorRate);
          startIdx += length;
        }

        // RC와 LC 점수 계산
        const rcQuestions = questions.slice(0, 100);
        const lcQuestions = questions.slice(100);
        const rcCorrect = rcQuestions.reduce((sum, q) => sum + q, 0);
        const lcCorrect = lcQuestions.reduce((sum, q) => sum + q, 0);
        const rcScore = getScore(rcCorrect, "RC");
        const lcScore = getScore(lcCorrect, "LC");

        // 전체 점수 및 오답률 계산
        const totalScore = rcScore + lcScore;
        const overallErrorRate = ((200 - rcCorrect - lcCorrect) / 200) * 100;

        // Score 저장
        const score = new ScoreModel({
          target,
          actual: totalScore,
          rcScore,
          lcScore,
          overallErrorRate,
          partErrorRates,
          questions,
        });

        try {
          await score.save();
          resolve(score);
        } catch (error) {
          reject(error);
        }
      })
      .on("end", () => console.log("CSV 데이터 처리 완료"))
      .on("error", (error) => reject(error));
  });
};

export default { processCsvAndSaveToDB };
