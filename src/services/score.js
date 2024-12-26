import fs from "fs";
import csv from "csv-parser";
import ScoreModel from "../models/score.js";

// 점수 환산표 (예제 참고)
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

// CSV 파일에서 점수를 계산하는 서비스
const calcUserScore = async (filePath, target, solve_time) => {
  if (!target) {
    throw new Error("target 값은 필수입니다.");
  }

  try {
    const questions = await parseCsvFile(filePath);

    // 파트별 오답률 계산
    const partLengths = [6, 25, 39, 30, 30, 16, 54];
    const partAccuracy = [];
    let startIdx = 0;

    for (const length of partLengths) {
      if (startIdx >= questions.length) break; // 데이터가 부족하면 종료
      const partQuestions = questions.slice(startIdx, startIdx + length);
      const partTotal = partQuestions.length;
      const partCorrect = partQuestions.reduce((sum, q) => sum + q, 0);
      const partErrorRate = 100 - ((partTotal - partCorrect) / partTotal) * 100;
      partAccuracy.push(partErrorRate);
      startIdx += length;
    }

    // RC와 LC 점수 계산
    const rcQuestions = questions.slice(0, Math.min(100, questions.length));
    const lcQuestions = questions.slice(100, questions.length);
    const rcCorrect = rcQuestions.reduce((sum, q) => sum + q, 0);
    const lcCorrect = lcQuestions.reduce((sum, q) => sum + q, 0);
    const rcScore = getScore(rcCorrect, "RC");
    const lcScore = getScore(lcCorrect, "LC");

    const totalScore = rcScore + lcScore;
    const overallErrorRate =
      ((questions.length - rcCorrect - lcCorrect) / questions.length) * 100;
    const accuracy = 100 - overallErrorRate;

    const response = await fetch(
      `http://172.16.25.130:8000/check_student_type?solve_time=${solve_time}&accuracy=${accuracy}`,
      {
        method: "post",
      }
    );

    let review = "";
    if (response.ok) {
      review = await response.json();
    }

    // MongoDB에 저장
    const score = new ScoreModel({
      target,
      actual: totalScore,
      rcScore,
      lcScore,
      overallErrorRate,
      partAccuracy,
      questions,
      solve_time,
      accuracy,
    });

    await score.save();

    return { score, review: review?.past_data }; // 저장된 Score 객체 반환
  } catch (error) {
    console.error("CSV 처리 중 오류:", error.message);
    throw error;
  }
};

// CSV 파일 파싱 함수
const parseCsvFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const questionsData = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        try {
          const rawData = Object.values(row)[0];
          const questions = rawData
            .trim()
            .split(/\s+/)
            .filter((value) => value !== "")
            .map(Number);

          //   if (questions.length !== 200) {
          //     // 데이터 길이가 200개가 아닌 경우 에러 반환
          //     reject(new Error("CSV 파일의 문항 수는 정확히 200개여야 합니다."));
          //   }

          questionsData.push(questions);
        } catch (error) {
          reject(error);
        }
      })
      .on("end", () => {
        if (questionsData.length === 0) {
          reject(new Error("CSV 파일에 유효한 데이터가 없습니다."));
        } else {
          resolve(questionsData[0]); // 첫 번째 데이터만 반환
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

export default { calcUserScore };
