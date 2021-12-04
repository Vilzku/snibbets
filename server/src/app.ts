import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import UserRouter from "./routes/users";
import SnippetRouter from "./routes/snippets";
import CommentRouter from "./routes/comments";
import VoteRouter from "./routes/votes";

const app = express();

app.use(express.json());
app.use(helmet());

app.use("/api/users", UserRouter);
app.use("/api/snippets", SnippetRouter);
app.use("/api/snippets/", CommentRouter);
app.use("/api/votes", VoteRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
