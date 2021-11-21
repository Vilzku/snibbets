import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader) {
      if (!process.env.JWT_SECRET)
        throw "Missing JWT_SECRET environment variable";
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
        if (err) res.sendStatus(401);
        req.email = result?.email;
        return next();
      });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export default validateToken;
