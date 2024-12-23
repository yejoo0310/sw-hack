import express, { json } from "express";

import testRouter from "#routes/test";

const app = express();
const port = 8080;

app.use(json());

app.use("/test", testRouter);

app.listen(port, () => {
  console.log(`${port} 번 서버 킴`);
});
