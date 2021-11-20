import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { pool } from "./db";

const app = express();

app.get("/", async (req, res) => {
  const test = await pool.query("SELECT * FROM test");
  res.send(test.rows);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
