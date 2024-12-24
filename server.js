import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express, { json } from "express";

import testRouter from "./src/routes/test.js";
import authRouter from "./src/routes/auth.js";
import mongoose from "mongoose";

const app = express();
const port = 8080;

app.use(
  cors({
    origin: "http://localhost:3000", // 허용할 도메인
    methods: ["GET", "POST", "PUT", "DELETE"], // 허용할 HTTP 메서드
    credentials: true, // 쿠키를 허용하려면 true로 설정
  })
);

app.use(json());

app.use("/api/test", testRouter);
app.use("/api/auth", authRouter);

mongoose.connect(process.env.MONGODB_URL).then(() => console.log("db 연결 됨"));

app.listen(port, () => {
  console.log(`${port} 번 서버 킴`);
});