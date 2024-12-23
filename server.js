import express, { json } from "express";

import testRouter from "./src/routes/test.js";

const app = express();
const port = 8080;

app.use(json());

app.use("/api/test", testRouter);

app.listen(port, () => {
  console.log(`${port} 번 서버 킴`);
});
