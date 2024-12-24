import mongoose from "mongoose";

// User Schema 정의
const schema = new mongoose.Schema({
  username: {
    type: String, // 데이터 타입: 문자열
    required: true, // 필수 항목
    unique: true, // 고유 값
  },
  password: {
    type: String, // 데이터 타입: 문자열
    required: true, // 필수 항목
  },
});

// User Model 생성
const User = mongoose.model("User", schema);

export default User;
