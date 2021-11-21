import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { pool } from "../db";
import { isEmailTaken, isUsernameTaken } from "../db/helpers";
import { User } from "../types";
import validatePassword from "../misc/passwordValidator";
import validateToken from "../misc/validateToken";

const router = express.Router();

// TODO: what should this return
// router.get("/", async (req: Request, res: Response) => {
//   const userId = req.query.user_id;

//   if (!userId) {
//     return res.status(400).send("failed");
//   }

//   const result = await pool.query("SELECT * FROM users WHERE id = $1", [
//     userId,
//   ]);
//   const user: User = result.rows[0];
//   res.send(user);
// });

router.post(
  "/register",

  body("email").isEmail().withMessage("Email is invalid").normalizeEmail(),
  body("username")
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage("Username is invalid"),
  body("password").custom(validatePassword),

  async (req: Request, res: Response) => {
    // Body validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, username, password } = req.body;

      // Check if email and username are available
      if (await isEmailTaken(email))
        return res.status(403).send("Email already exists");
      if (await isUsernameTaken(username))
        return res.status(403).send("Username already exists");

      // Create user
      const hash = bcrypt.hash(password, 10);
      const result = await pool.query(
        "INSERT INTO users (id, email, password, username) VALUES ($1, $2, $3, $4) RETURNING *",
        [uuidv4(), email, hash, username]
      );
      const user: User = result.rows[0];

      // TODO: return only necessary data

      return res.send(user);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }
);

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Invalid request");
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user: User = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Invalid credentials");

    if (!process.env.JWT_SECRET)
      throw "Missing JWT_SECRET environment variable";
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.send(token);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

export default router;
