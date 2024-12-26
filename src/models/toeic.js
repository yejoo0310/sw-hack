import mongoose from "mongoose";

const toeicSchema = new mongoose.Schema({
  rcScore: { type: Number, required: true },
  lcScore: { type: Number, required: true },
  totalScore: { type: Number, required: true },
  correctAnswers: { type: [Number], required: true }, // 유저가 맞춘 문제 배열
});

const Toeic = mongoose.model("Toeic", toeicSchema);

export default Toeic;
