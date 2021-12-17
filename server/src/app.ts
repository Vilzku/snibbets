import dotenv from "dotenv";
dotenv.config();

import path from "path";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import UserRouter from "./routes/users";
import SnippetRouter from "./routes/snippets";
import CommentRouter from "./routes/comments";
import VoteRouter from "./routes/votes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(helmet());

app.use("/api/users", UserRouter);
app.use("/api/snippets", SnippetRouter);
app.use("/api/snippets/", CommentRouter);
app.use("/api/votes", VoteRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

if (process.env.NODE_ENV === "production") {
  console.log("production");
  app.use(express.static(path.resolve("..", "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("..", "client", "build", "index.html"));
  });
} else if (process.env.NODE_ENV === "development") {
  console.log("development");
  const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
}
