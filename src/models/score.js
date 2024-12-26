import mongoose from "mongoose";

// User Schema 정의
const schema = new mongoose.Schema({
  target: {
    type: String, // 데이터 타입: 문자열
  },
  actual: {
    type: String, // 데이터 타입: 문자열
  },
  rcScore: {
    type: Number, // RC 점수
  },
  lcScore: {
    type: Number, // LC 점수
  },
  overallErrorRate: {
    type: Number, // 전체 오답률 (소수점 포함 숫자)
  },
  partAccuracy: {
    type: [Number], // 각 파트의 오답률 배열 (7개의 값)
  },
  questions: {
    type: [Number], // 200문항 데이터 (각 문항의 정답 여부)
  },
  solve_time: {
    type: String,
  },
  accuracy: {
    type: Number,
  },
});

// User Model 생성
const Score = mongoose.model("Score", schema);

export default Score;
