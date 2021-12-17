import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import fs from "fs";

import { User } from "../types";
import { pool } from "../db";
import validateToken, { createToken } from "../misc/validation";
import {
  checkEmailAvailability,
  checkUsernameAvailability,
  validatePassword,
} from "../misc/registerValidator";
import { createUserObject } from "../misc/helpers";
import upload from "../misc/multerConfig";

const router = express.Router();

/**
 * @api {post} /api/users/register Register a new user
 * @apiParam {String} username The username of the user
 * @apiParam {String} email The email of the user
 * @apiParam {String} password The password of the user
 */
router.post(
  "/register",

  body("email").isEmail().withMessage("Email is invalid").normalizeEmail(),
  body("email").custom(checkEmailAvailability),
  body("username")
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage("Username is invalid"),
  body("username").custom(checkUsernameAvailability),
  body("password").custom(validatePassword),

  async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    try {
      const hash = await bcrypt.hash(password, 10);
      const result = await pool.query(
        "INSERT INTO users (id, email, password, username) VALUES ($1, $2, $3, $4) RETURNING *",
        [uuidv4(), email, hash, username.toLowerCase()]
      );
      const user: User = result.rows[0];
      res.cookie("auth_token", createToken(user.id), {
        httpOnly: true,
      });

      res.send({ id: user.id, username: user.username });
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
 * @api {get} /api/users/logout Logout user
 */
router.get("/logout", async (req: Request, res: Response) => {
  res.clearCookie("auth_token");
  return res.sendStatus(200);
});

/**
 * @api {get} /api/users/:id Fetch user info
 */
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.sendStatus(400);
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user: User = result.rows[0];
    if (!user) {
      return res.sendStatus(404);
    }
    return res.send(createUserObject(user));
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

/**
 * @api {patch} /api/users/ Edit user profile
 * @apiParam {String} [username] The username of the user
 * @apiParam {String} [email] The login email of the user
 * @apiParam {String} [bio] The bio of the user
 */
router.patch("/", validateToken, async (req: Request, res: Response) => {
  const { userId } = req;
  const { username, email, bio } = req.body;

  try {
    const result = await pool.query(
      "UPDATE users SET username = $1, email = $2, bio = $3 WHERE id = $4 RETURNING *",
      [username, email, bio, userId]
    );
    const user: User = result.rows[0];
    return res.send(createUserObject(user));
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
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

/**
 * @api {post} /api/users/image Upload a profile picture
 */
router.post(
  "/image",
  validateToken,
  upload.single("image"),
  async (req: Request, res: Response) => {
    const { userId } = req;
    const path = `./data/images/${userId}`;
    try {
      fs.access(path, fs.constants.F_OK, async (err) => {
        if (err) {
          console.error(err);
          return res.sendStatus(400);
        }
        return res.sendStatus(200);
      });
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }
);

/**
 * @api {get} /api/users/image/:id Fetch a profile picture
 */
router.get("/image/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const path = `./data/images/${id}`;
  try {
    return res.sendFile(path, {
      root: __dirname + "/../../",
    });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

export default router;
