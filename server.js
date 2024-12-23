import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";

import testRouter from "./src/routes/test.js";
import mongoose from "mongoose";

const app = express();
const port = 8080;

app.use(json());

app.use("/api/test", testRouter);

mongoose.connect(process.env.MONGODB_URL).then(() => console.log("db 연결 됨"));

app.listen(port, () => {
  console.log(`${port} 번 서버 킴`);
});
