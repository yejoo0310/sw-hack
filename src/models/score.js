import mongoose from "mongoose";

// User Schema 정의
const schema = new mongoose.Schema({
  target: {
    type: String, // 데이터 타입: 문자열
    required: true, // 필수 항목
  },
  actual: {
    type: String, // 데이터 타입: 문자열
    required: true, // 필수 항목
  },
  rcScore: {
    type: Number, // RC 점수
    required: true,
  },
  lcScore: {
    type: Number, // LC 점수
    required: true,
  },
  overallErrorRate: {
    type: Number, // 전체 오답률 (소수점 포함 숫자)
    required: true, // 필수 항목
  },
  partErrorRates: {
    type: [Number], // 각 파트의 오답률 배열 (7개의 값)
    required: true, // 필수 항목
    validate: {
      validator: (array) => array.length === 7, // 반드시 7개의 값이 있어야 함
      //message: "파트별 오답률은 정확히 7개의 값이어야 합니다.",
    },
  },
  questions: {
    type: [Number], // 200문항 데이터 (각 문항의 정답 여부)
    required: true, // 필수 항목
    validate: {
      validator: (array) => array.length === 200, // 반드시 200개의 값이어야 함
      message: "questions 필드는 정확히 200개의 값이어야 합니다.",
    },
  },
});

// User Model 생성
const Score = mongoose.model("Score", schema);

export default Score;
