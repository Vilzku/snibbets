import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { pool } from "../db";
import validateToken from "../misc/token";
import { Snippet, User } from "../types";

const router = express.Router();

/**
 * @api {post} /api/snippets/:id Get a snippet
 */
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM snippets WHERE id = $1", [
      id,
    ]);
    const snippet: Snippet = result.rows[0];
    if (!snippet) res.sendStatus(404);

    res.json(snippet);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

/**
 * @api {post} /api/snippets/ Create a new snippet
 */
router.post("/", validateToken, async (req: Request, res: Response) => {
  const { userId } = req;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.sendStatus(400);
  }

  try {
    const result = await pool.query(
      "INSERT INTO snippets (id, user_id, title, content) VALUES ($1, $2, $3, $4) RETURNING *",
      [uuidv4(), userId, title, content]
    );
    const snippet: Snippet = result.rows[0];

    res.json(snippet);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

/**
 * @api {patch} /api/snippets/:id Edit a snippet
 */
router.put("/:id", validateToken, async (req: Request, res: Response) => {
  const { userId } = req;
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.sendStatus(400);
  }

  try {
    const result = await pool.query(
      "UPDATE snippets SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, content, id, userId]
    );
    const snippet: Snippet = result.rows[0];

    if (!snippet) return res.sendStatus(404);
    return res.json(snippet);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});
export default router;
