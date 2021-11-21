import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import UserRouter from "./routes/users";

const app = express();

app.use(express.json());
app.use(helmet());

app.use("/api/users", UserRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
