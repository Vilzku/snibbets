import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { pool } from "../db";
import { sortList } from "../misc/helpers";
import validateToken from "../misc/token";
import { Vote } from "../types";

const router = express.Router();

/**
 * @api {get} /votes/:id Get votes for snippet or comment
 */
router.get("/:postId", async (req: Request, res: Response) => {
  const { postId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM votes WHERE snippet_id = $1 OR comment_id = $1`,
      [postId]
    );
    const votes: Vote[] = sortList(result.rows, "created_at", "desc");

    return res.send(votes);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

/**
 * @api {post} /votes/:id Create vote for snippet or comment
 * @param {string?} snippetId ID of a snippet
 * @param {string?} commentId ID of a comment
 * @param {boolean} positive Whether the vote is positive or negative
 */
router.post("/", validateToken, async (req: Request, res: Response) => {
  const { snippetId, commentId, positive } = req.body;
  const { userId } = req;

  if ((!snippetId && !commentId) || (snippetId && commentId))
    return res.sendStatus(400);

  try {
    const result = await pool.query(
      "INSERT INTO votes (id, snippet_id, comment_id, user_id, positive) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [uuidv4(), snippetId, commentId, userId, positive ? true : false]
    );
    const vote: Vote = result.rows[0];

    return res.send(vote);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

/**
 * @api {delete} /votes/:id Update a vote to be positive or negative
 * @param {boolean} positive Whether the vote is positive or negative
 */
router.patch("/:id", validateToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req;
  const { positive } = req.body;

  try {
    const result = await pool.query(
      "UPDATE votes SET positive = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
      [positive ? true : false, id, userId]
    );
    const vote: Vote = result.rows[0];

    return res.send(vote);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

/**
 * @api {delete} /votes/:id Delete a vote
 */
router.delete("/:id", validateToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    const result = await pool.query(
      "SELECT * FROM votes WHERE id = $1 AND user_id = $2",
      [id, userId]
    );
    if (result.rowCount === 0) return res.sendStatus(401);

    await pool.query("DELETE FROM votes WHERE id = $1 AND user_id = $2", [
      id,
      userId,
    ]);

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
export default router;
