import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { body, validationResult } from "express-validator";

import { pool } from "../db";
import { User } from "../misc/types";
import validatePassword from "../misc/passwordValidator";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.user_id;

  // TODO: validation

  if (!userId) {
    return res.status(400).send("failed");
  }

  const result = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);
  const user: User = result.rows[0];
  res.send(user);
});

router.post(
  "/register",
  body("email").isEmail().withMessage("Email is invalid").normalizeEmail(),
  body("username")
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage("Username is invalid"),
  body("password").custom(validatePassword),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, username, password } = req.body;

    // TODO check if user, email already exists, status code

    // TODO: create authentication

    try {
      const result = await pool.query(
        "INSERT INTO users (id, email, password, username) VALUES ($1, $2, $3, $4) RETURNING *",
        [uuidv4(), email, password, username]
      );
      const user: User = result.rows[0];
      return res.send(user);
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
);

export default router;
