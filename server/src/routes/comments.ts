import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { pool } from "../db";
import { createCommentObject, sortList } from "../misc/helpers";
import validateToken from "../misc/validation";
import { Comment } from "../types";

const router = express.Router();

/**
 * @api {get} /api/snippets/:id/comments Get comments for a snippet
 */
router.get("/:snippetId/comments", async (req: Request, res: Response) => {
  const { snippetId } = req.params;

  // TODO: Maybe paginate this?

  try {
    const result = await pool.query(
      "SELECT * FROM comments WHERE snippet_id = $1",
      [snippetId]
    );
    // TODO: Maybe different sorts?
    const comments: Comment[] = sortList(result.rows, "created_at", "desc");

    return res.send(comments.map((comment) => createCommentObject(comment)));
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

/**
 * @api {post} /api/snippets/:id/comments Create a comment
 * @param {String} [content] The content of the comment
 */
router.post(
  "/:snippetId/comments/",
  validateToken,
  async (req: Request, res: Response) => {
    const { userId } = req;
    const { snippetId } = req.params;
    const { content } = req.body;

    if (!content || content.length === 0) return res.sendStatus(400);

    try {
      const result = await pool.query(
        "INSERT INTO comments (id, snippet_id, user_id, content) VALUES ($1, $2, $3, $4) returning *",
        [uuidv4(), snippetId, userId, content]
      );
      const comment: Comment = result.rows[0];

      return res.send(createCommentObject(comment));
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }
);

/**
 * @api {put} /api/snippets/:id/comments/:id Update a comment
 * @param {String} [content] The content of the comment
 */
router.put(
  "/:snippetId/comments/:id",
  validateToken,
  async (req: Request, res: Response) => {
    const { userId } = req;
    const { snippetId, id } = req.params;
    const { content } = req.body;

    if (!content || content.length === 0) return res.sendStatus(400);

    try {
      const result = await pool.query(
        "UPDATE comments SET content = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND user_id = $3 AND snippet_id = $4 returning *",
        [content, id, userId, snippetId]
      );
      if (result.rowCount === 0) return res.sendStatus(404);
      const comment: Comment = result.rows[0];

      return res.send(createCommentObject(comment));
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }
);

/**
 * @api {delete} /api/snippets/:id/comments/:id Delete a comment
 */
router.delete(
  "/:snippetId/comments/:id",
  validateToken,
  async (req: Request, res: Response) => {
    const { userId } = req;
    const { snippetId, id } = req.params;

    try {
      const result = await pool.query(
        "SELECT * FROM comments WHERE id = $1 AND user_id = $2 AND snippet_id = $3",
        [id, userId, snippetId]
      );
      if (result.rowCount === 0) return res.sendStatus(401);

      await pool.query(
        "DELETE FROM comments WHERE id = $1 AND user_id = $2 AND snippet_id = $3",
        [id, userId, snippetId]
      );
      return res.sendStatus(204);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }
);

export default router;
