import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { UserPayload } from "../types/express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }
  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret);

    req.user = decoded as UserPayload;
    next();
  } catch (err) {
    return res.status(400).json({ error: "" });
  }
};
