import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

import { User } from "../types";
import { pool } from "../db";
import { isEmailTaken, isUsernameTaken } from "../db/helpers";
import validateToken, { createToken } from "../misc/validation";
import validatePassword from "../misc/passwordValidator";
import { send } from "process";

const router = express.Router();

/**
 * @api {post} /api/users/register Register a new user
 */
router.post(
  "/register",

  body("email").isEmail().withMessage("Email is invalid").normalizeEmail(),
  body("username")
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage("Username is invalid"),
  body("password").custom(validatePassword),

  async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      if (await isEmailTaken(email))
        return res.status(403).send("Email already exists");
      if (await isUsernameTaken(username))
        return res.status(403).send("Username already exists");

      const hash = bcrypt.hash(password, 10);
      const result = await pool.query(
        "INSERT INTO users (id, email, password, username) VALUES ($1, $2, $3, $4) RETURNING *",
        [uuidv4(), email, hash, username]
      );
      const user: User = result.rows[0];

      const token = createToken(user.id);
      res.send(token);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }
);

/**
 * @api {post} /api/users/login Login user
 */
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.sendStatus(400);
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user: User = result.rows[0];

    const isMatch = await bcrypt.compare(password, user?.password || "");
    if (!isMatch) return res.status(401).send("Invalid credentials");

    res.cookie("auth_token", createToken(user.id), {
      httpOnly: true,
    });
    return res.status(200).send({ id: user.id, username: user.username });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

/**
 * @api {patch} /api/users/ Edit user profile
 */
router.patch("/", validateToken, async (req: Request, res: Response) => {
  // TODO: impelement edit user
  return res.status(404).send("Not implemented");
});

/**
 * @api {delete} /api/users/ Delete user profile
 */
router.delete("/", validateToken, async (req: Request, res: Response) => {
  const { userId } = req;
  const { password } = req.body;
  if (!password) return res.sendStatus(400);

  try {
    const hash = bcrypt.hash(password, 10);

    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND password = $2",
      [userId, hash]
    );
    if (result.rowCount === 0) return res.sendStatus(401);

    await pool.query("DELETE FROM users WHERE id = $1 AND password = $2", [
      userId,
      hash,
    ]);
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

export default router;
