import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { pool } from "../db";
import { sortList } from "../misc/helpers";
import validateToken from "../misc/validation";
import { Snippet } from "../types";

const router = express.Router();

/**
 * @api {get} /api/snippets Get multiple snippets
 * @param {number} [page=1] Page number
 * @param {number} [limit=10] Number of snippets per page
 * @param {string} [sortBy=created_at] Sort by field
 * @param {string} [order=desc] Sort order
 */
router.get("/", async (req: Request, res: Response) => {
  const sortBy = (req.query.sortBy as string) || "created_at";
  const order = (req.query.order as string) || "desc";
  const amount = req.query.amount ? parseInt(req.query.amount as string) : 10;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const offset = (page - 1) * amount;
  if (page <= 0 || amount <= 0) return res.sendStatus(400);

  try {
    const result = await pool.query(
      "SELECT * FROM snippets ORDER BY $1 FETCH NEXT $2 ROWS ONLY OFFSET $3",
      [`${sortBy} ${order}`, amount, offset]
    );
    const snippets: Snippet[] = sortList(result.rows, sortBy, order);

    return res.send(snippets);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

/**
 * @api {post} /api/snippets/:id Get a single snippet
 */
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM snippets WHERE id = $1", [
      id,
    ]);
    const snippet: Snippet = result.rows[0];

    if (!snippet) res.sendStatus(404);
    return res.send(snippet);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

/**
 * @api {post} /api/snippets/ Create a new snippet
 * @param {string} [title] the title of the snippet
 * @param {string} [content] the content of the snippet
 */
router.post("/", validateToken, async (req: Request, res: Response) => {
  const { userId } = req;
  const { title, content } = req.body;

  if (!title || title.length === 0 || !content || content.length === 0) {
    return res.sendStatus(400);
  }

  try {
    const result = await pool.query(
      "INSERT INTO snippets (id, user_id, title, content) VALUES ($1, $2, $3, $4) RETURNING *",
      [uuidv4(), userId, title, content]
    );
    const snippet: Snippet = result.rows[0];

    return res.send(snippet);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

/**
 * @api {patch} /api/snippets/:id Edit a snippet
 * @param {string} [title] New title
 * @param {string} [content] New content
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
    return res.send(snippet);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

/**
 * @api {delete} /api/snippets/:id Delete a snippet
 */
router.delete("/:id", validateToken, async (req: Request, res: Response) => {
  const { userId } = req;
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM snippets WHERE id = $1 AND user_id = $2",
      [id, userId]
    );
    if (result.rowCount === 0) return res.sendStatus(401);

    await pool.query("DELETE FROM snippets WHERE id = $1 AND user_id = $2", [
      id,
      userId,
    ]);
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

export default router;
